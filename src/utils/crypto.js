var CryptoJS = require('crypto-js');

const blobToString = (b) => {
  var u, x;
  u = URL.createObjectURL(b);
  x = new XMLHttpRequest();
  x.open('GET', u, false);
  x.send();
  URL.revokeObjectURL(u);
  return x.responseText;
};

function byteArrayToWordArray(ba) {
  var wa = [],
    i;
  for (i = 0; i < ba.length; i++) {
    wa[(i / 4) | 0] |= ba[i] << (24 - 8 * i);
  }

  return CryptoJS.lib.WordArray.create(wa, ba.length);
}

function wordToByteArray(word, length) {
  var ba = [],
    i,
    xFF = 0xff;
  if (length > 0) ba.push(word >>> 24);
  if (length > 1) ba.push((word >>> 16) & xFF);
  if (length > 2) ba.push((word >>> 8) & xFF);
  if (length > 3) ba.push(word & xFF);

  return ba;
}

function wordArrayToByteArray(wordArray, length) {
  if (
    wordArray.hasOwnProperty('sigBytes') &&
    wordArray.hasOwnProperty('words')
  ) {
    length = wordArray.sigBytes;
    wordArray = wordArray.words;
  }

  var result = [],
    bytes,
    i = 0;
  while (length > 0) {
    bytes = wordToByteArray(wordArray[i], Math.min(4, length));
    length -= bytes.length;
    result.push(bytes);
    i++;
  }
  return [].concat.apply([], result);
}

const decryptPrivateMap = (result, key) => {
  try {
    const blob = new Blob([result]);
    const data = blobToString(blob);

    const decodedKey = wordArrayToByteArray(CryptoJS.enc.Base64.parse(key));
    const decodedResult = CryptoJS.enc.Base64.parse(data);

    const iv = byteArrayToWordArray(decodedKey.slice(0, 8));
    const secret = byteArrayToWordArray(decodedKey.slice(8, 24));

    const decrypted = CryptoJS.TripleDES.decrypt(
      {
        ciphertext: decodedResult,
      },
      secret,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.NoPadding,
      }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export { decryptPrivateMap };
