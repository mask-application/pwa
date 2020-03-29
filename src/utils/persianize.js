const engToPerMap = '۰۱۲۳۴۵۶۷۸۹';
export function engToPerDigits(str) {
  try {
    return str
      .toString()
      .replace(/[0-9]/g, (match) => engToPerMap[parseInt(match)]);
  } catch (e) {
    return str;
  }
}

const perToEngMap = {
  '۰': '0',
  '٠': '0',
  '۱': '1',
  '١': '1',
  '۲': '2',
  '٢': '2',
  '۳': '3',
  '٣': '3',
  '۴': '4',
  '٤': '4',
  '۵': '5',
  '٥': '5',
  '۶': '6',
  '٦': '6',
  '۷': '7',
  '٧': '7',
  '۸': '8',
  '٨': '8',
  '۹': '9',
  '٩': '9',
};
export function perToEngDigits(str) {
  try {
    return str
      .toString()
      .replace(/[\u0660-\u0669\u06F0-\u06F9]/g, (match) => perToEngMap[match]);
  } catch (e) {
    return str;
  }
}
