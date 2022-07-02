function telephoneCheck(str) {
  let regex = "";

  // ( ) are not used correctly
  if (str.indexOf('(') >= 0 || str.indexOf(')') >= 0 ) {
    regex = /\(\d{3}\)/;
    if (!regex.test(str)) {
      return false;
    }
  }

  // general
  regex = /^1?\s?\(?\d{3}\)?\s?\-?\d{3}\s?\-?\d{4}$/;
  console.log('test ==>',regex.test(str));

  if (regex.test(str)) {
    return true;
  } else {
    return false;
  }
}


// console.log(telephoneCheck("555-555-5555"));
