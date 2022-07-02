
function palindrome(str) {
  const tempStr = str.replace(/\s|\W|_/g, '').toLowerCase();

  for (let i = 0 ; i < tempStr.length / 2 ; i ++) {
    if (tempStr[i] !== tempStr[tempStr.length - 1 - i])
      return false;
  }
  return true;
}
