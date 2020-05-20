var CryptoJS = require('crypto-js');

function pack(bytes) {
  var chars = [];
  for (var i = 0, n = bytes.length; i < n; ) {
    chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
  }
  return String.fromCharCode.apply(null, chars);
}

function unpack(str) {
  var bytes = [];
  for (var i = 0, n = str.length; i < n; i++) {
    var char = str.charCodeAt(i);
    bytes.push(char >>> 8, char & 0xff);
  }
  return bytes;
}

const decryptPrivateMap = (result, key) => {
  try {
    const decodedKey = CryptoJS.enc.Base64.parse(key).toString(
      CryptoJS.enc.Utf8
    );
    const decodedResult = CryptoJS.enc.Base64.parse(result);

    var secret = unpack(decodedKey).slice(0, 8);
    var iv = unpack(decodedKey).slice(9, 24);

    var decrypted = CryptoJS.AES.decrypt(
      { ciphertext: decodedResult },
      secret,
      { iv: iv }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export { decryptPrivateMap };
