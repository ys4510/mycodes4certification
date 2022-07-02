function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let tempChange = change * 100;
 
  // avoiding inaccurate calculated result by using integer
  // currency set of name : amount (x 100)
  const CURRENCY100X = {
    "PENNY": 1, "NICKEL": 5, "DIME": 10, "QUARTER": 25, "ONE": 100, 
    "FIVE": 500, "TEN": 1000, "TWENTY": 2000, "ONE HUNDRED": 10000
  }

  const CID100X = {} // object to store cid x 100
  // calcurate total balance in the cash register 
  // and creaate CID100X object without decimal
  let intBal = 0;
  for (let i = 0 ; i < cid.length ; i++) {
    if (cid[i][1].toString().includes('.')) {
      // decimal x 100
      let cents = cid[i][1].toFixed(2).replace('.', '').toString();
      intBal += parseInt(cents);
      CID100X[cid[i][0]] = parseInt(cents);
    } else {
      // integer x 100
      intBal += cid[i][1] * 100;
      CID100X[cid[i][0]] = cid[i][1] * 100;
    }
  }

  // balance (decimal)
  let balance = intBal / 100;

  if (change === balance) {
    // CLOSED
    return {status: "CLOSED", change: cid};
  } else if (change > balance) {
    // INSUFFICIENT_FUNDS
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } 

  // prepare changes
  // tempChange = change * 100;
  let added = 0;
  const changeArr = [];
  for (let i = Object.keys(CURRENCY100X).length - 1 ; i >= 0 ; i--) {
    let curObjKey = Object.keys(CURRENCY100X)[i];
    added = 0;

    if (CID100X[curObjKey]=== 0) {
      continue;
    }
    while(tempChange >= CURRENCY100X[Object.keys(CURRENCY100X)[i]]) {
      tempChange -= CURRENCY100X[curObjKey];
      added += CURRENCY100X[curObjKey];
      if (CID100X[curObjKey] - added < CURRENCY100X[curObjKey]) {
        break;
      }
    }
    if (added > 0 ) {
      // add a set of currency name and its amount
      let setArr = [];
      setArr.push(Object.keys(CURRENCY100X)[i]);
      setArr.push(added/100);
      changeArr.push(setArr);
    }
    if (tempChange === 0) {
      // count finished
      break;
    }
  }

  // INSUFFICIENT_FUNDS : cannot give exact changes
  if (tempChange > 0) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }

  // CLOSED : balance is zero
 if (balance <= 0) {
    return {status: "CLOSED", change: []};
  }
  
  return {status: "OPEN", change: changeArr};
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) );
