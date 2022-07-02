function rot13(str) {

  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let msg = "";

  for (let i = 0 ; i < str.length ; i++) {
    if (abc.includes(str[i])) {
      let pos = abc.indexOf(str[i]);
      let newPos = pos + 13;
      if (newPos >= 26) {
        newPos = newPos - 26;
      }
      msg += abc[newPos];
    } else {
      msg += str[i];
    }
  }

  return msg;
}

// console.log(rot13("SERR PBQR PNZC")); //FREE CODE CAMP
// console.log(rot13("SERR CVMMN!")); // FREE PIZZA!
