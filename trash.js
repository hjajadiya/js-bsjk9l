function loadPayout() {
  appDiv.innerHTML = payoutPage;
}

function sorderdelete() {
  // let value = await readResult();

  if (pageName == 'Skip') {
    var arr = value.skipOrder;
    allOrders = arr;
    setOrdersListData(arr);
    updateOrders.addEventListener('click', function () {
      saveOrders(pageName, allOrders).then(() => {
        appDiv.innerHTML = dashboard;
      });
    });
    backButton.addEventListener('click', function () {
      saveOrders(pageName, allOrders);
      appDiv.innerHTML = dashboard;
    });
  }
  if (pageName == 'Uber') {
    var arr = value.uberOrders;
    allOrders = arr;

    setOrdersListData(arr);
    updateOrders.addEventListener('click', function () {
      saveOrders(pageName, allOrders);
    });
    backButton.addEventListener('click', function () {
      saveOrders(pageName, allOrders);
      appDiv.innerHTML = dashboard;
    });
  }
  if (pageName == 'Doordash') {
    var arr = value.doordashOrders;
    allOrders = arr;
    setOrdersListData(arr);
    updateOrders.addEventListener('click', function () {
      saveOrders(pageName, allOrders);
    });
    backButton.addEventListener('click', function () {
      saveOrders(pageName, allOrders);
      appDiv.innerHTML = dashboard;
    });
  }
}
function saveOrders(p, data) {
  if (p == 'Skip') {
    var skipOrders = { skipOrder: data };

    updateFields('cashCount', todayDate(), skipOrders);
  }
  if (p == 'Uber') {
    var uberOrders = { uberOrders: data };
    updateFields('cashCount', todayDate(), uberOrders);
  }
  if (p == 'Doordash') {
    var doordashOrders = { doordashOrders: data };
    updateFields('cashCount', todayDate(), doordashOrders);
  }
}
function cashCount() {
  appDiv.innerHTML = cashCountPage;

  const i100 = document.getElementById('m-100');
  const i50 = document.getElementById('m-50');
  const i20 = document.getElementById('m-20');
  const i10 = document.getElementById('m-10');
  const i5 = document.getElementById('m-5');
  const i2 = document.getElementById('m-2');
  const i1 = document.getElementById('m-1');
  const i25c = document.getElementById('m-25c');
  const i10c = document.getElementById('m-10c');
  const i5c = document.getElementById('m-5c');
  const ir2 = document.getElementById('mr-2');
  const ir1 = document.getElementById('mr-1');
  const ir25c = document.getElementById('mr-25c');
  const ir10c = document.getElementById('mr-10c');
  const ir5c = document.getElementById('mr-5c');
  const totalBills = document.getElementById('total-bills');
  const totalCoins = document.getElementById('total-coins');
  const totalRolls = document.getElementById('total-rolls');
  const totalAll = document.getElementById('total-all');
  const sData = document.getElementById('save-data');
  const billsTable = document.getElementById('bills-table');
  const coinTable = document.getElementById('coin-table');
  readData('cashCount', todayDate()).then((value) => {
    if (value != null) {
      if ('counts' in value) {
        if (value['counts'].length != 0) {
          const arr = value['counts'];
          const rarr = convCount(arr);
          myArr = arr;
          i100.value = rarr[0];
          i50.value = rarr[1];
          i20.value = rarr[2];
          i10.value = rarr[3];
          i5.value = rarr[4];
          i2.value = rarr[5];
          i1.value = rarr[6];
          i25c.value = rarr[7];
          i10c.value = rarr[8];
          i5c.value = rarr[9];
          ir2.value = rarr[10];
          ir1.value = rarr[11];
          ir25c.value = rarr[12];
          ir10c.value = rarr[13];
          ir5c.value = rarr[14];

          i100.parentElement.nextElementSibling.textContent = '$' + arr[0];
          i50.parentElement.nextElementSibling.textContent = '$' + arr[1];
          i20.parentElement.nextElementSibling.textContent = '$' + arr[2];
          i10.parentElement.nextElementSibling.textContent = '$' + arr[3];
          i5.parentElement.nextElementSibling.textContent = '$' + arr[4];
          i2.parentElement.nextElementSibling.textContent = '$' + arr[5];
          i1.parentElement.nextElementSibling.textContent = '$' + arr[6];
          i25c.parentElement.nextElementSibling.textContent = '$' + arr[7];
          i10c.parentElement.nextElementSibling.textContent = '$' + arr[8];
          i5c.parentElement.nextElementSibling.textContent = '$' + arr[9];
          ir2.parentElement.nextElementSibling.textContent = '$' + arr[10];
          ir1.parentElement.nextElementSibling.textContent = '$' + arr[11];
          ir25c.parentElement.nextElementSibling.textContent = '$' + arr[12];
          ir10c.parentElement.nextElementSibling.textContent = '$' + arr[13];
          ir5c.parentElement.nextElementSibling.textContent = '$' + arr[14];
          var tbValue = arr[1] + arr[2] + arr[3] + arr[4] + arr[0];
          var tcValue = arr[5] + arr[6] + arr[7] + arr[8] + arr[9];
          var trValue = arr[10] + arr[11] + arr[12] + arr[13] + arr[14];

          totalBills.textContent = tbValue;
          totalBills.textContent = '$' + totalBills.textContent;

          totalCoins.textContent = tcValue;
          totalCoins.textContent = '$' + totalCoins.textContent;

          totalRolls.textContent = trValue;
          totalRolls.textContent = '$' + totalRolls.textContent;
          var taValue = tbValue + tcValue + trValue;

          totalAll.textContent = taValue;
          totalAll.textContent = totalAll.textContent =
            '$' + totalAll.textContent;
        } else {
          console.log('nund');
        }
      } else {
        console.log('nfound');
      }
    } else {
      console.log('notfound');
    }
  });

  billsTable.addEventListener('input', cashData);
  sData.addEventListener('click', cashData);
}
function cashData(e) {
  if (e.target.matches('#m-100')) {
    myArr[0] = e.target.value * 100;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[0];
  }
  if (e.target.matches('#m-50')) {
    myArr[1] = e.target.value * 50;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[1];
  }
  if (e.target.matches('#m-20')) {
    myArr[2] = e.target.value * 20;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[2];
  }
  if (e.target.matches('#m-10')) {
    myArr[3] = e.target.value * 10;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[3];
  }
  if (e.target.matches('#m-5')) {
    myArr[4] = e.target.value * 5;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[4];
  }
  if (e.target.matches('#m-2')) {
    console.log(e.target.value);
    myArr[5] = e.target.value * 2;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[5];
  }
  if (e.target.matches('#m-1')) {
    myArr[6] = e.target.value * 1;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[6];
  }
  if (e.target.matches('#m-25c')) {
    myArr[7] = e.target.value * 0.25;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[7];
  }
  if (e.target.matches('#m-10c')) {
    myArr[8] = e.target.value * 0.1;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[8];
  }
  if (e.target.matches('#m-5c')) {
    myArr[9] = e.target.value * 0.05;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[9];
  }

  if (e.target.matches('#mr-2')) {
    myArr[10] = e.target.value * 50;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[10];
  }
  if (e.target.matches('#mr-1')) {
    myArr[11] = e.target.value * 25;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[11];
  }
  if (e.target.matches('#mr-25c')) {
    myArr[12] = e.target.value * 10;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[12];
  }
  if (e.target.matches('#mr-10c')) {
    myArr[13] = e.target.value * 5;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[13];
  }
  if (e.target.matches('#m-2')) {
    myArr[14] = e.target.value * 2;
    e.target.parentElement.nextElementSibling.textContent = '$' + myArr[14];
  }
  if (e.target.matches('#save-count')) {
    console.log('clicked');
    saveCount(myArr);
  }

  var tbValue = myArr[1] + myArr[2] + myArr[3] + myArr[4] + myArr[0];
  var tcValue = myArr[5] + myArr[6] + myArr[7] + myArr[8] + myArr[9];
  var trValue = myArr[10] + myArr[11] + myArr[12] + myArr[13] + myArr[14];
  const totalBills = document.getElementById('total-bills');
  const totalCoins = document.getElementById('total-coins');
  const totalRolls = document.getElementById('total-rolls');
  const totalAll = document.getElementById('total-all');
  totalBills.textContent = tbValue;
  totalBills.textContent = '$' + totalBills.textContent;

  totalCoins.textContent = tcValue;
  totalCoins.textContent = '$' + totalCoins.textContent;

  totalRolls.textContent = trValue;
  totalRolls.textContent = '$' + totalRolls.textContent;
  var taValue = tbValue + tcValue + trValue;

  totalAll.textContent = taValue;
  totalAll.textContent = totalAll.textContent = '$' + totalAll.textContent;
}
function saveCount(counts) {
  const data = { counts };
  updateFields('cashCount', todayDate(), data);
}
function setAppOrders(e) {
  allOrders.forEach(function (r, i) {
    var st = 'order-' + i;
    var nt = 'net-' + i;
    console.log(i);
    if (e.target.matches('#' + st)) {
      const valField = document.getElementById(st);
      const netField = document.getElementById(nt);
      allOrders[i] = valField.value * 1;
      netField.value = getNetAmount(pageName, allOrders[i]);
    }
  });
}

function lala() {
  const cbpField = document.getElementById('cbpayout-field');
  const payField = document.getElementById('payout-field');
  const jarField = document.getElementById('jar-field');
  const floatField = document.getElementById('float-field');
  const skipField = document.getElementById('skip-field');
  const uberField = document.getElementById('uber-field');
  const doordashField = document.getElementById('doordash-field');
  const depositField = document.getElementById('deposit-field');
  const ccField = document.getElementById('cc-field');
  var payoutValue;
  var jarValue;
  var floatValue;
  var countArr;
  var skipOr;
  var uberOr;
  var doordashOr;
  var cbpValue;
  var depositValue;
  var sknValue;
  var sos;
  var uos;
  var dos;
  var ccValue;
  const docSnap = await getDoc(doc(db, 'cashCount', todayDate()));

  if (docSnap.exists()) {
    const value = docSnap.data();
    console.log(value);
    countArr = value.counts;
    skipOr = value.skipOrder;
    uberOr = value.uberOrders;
    doordashOr = value.doordashOrders;
    payoutValue = value.payout.payoutAmount;
    jarValue = value.payout.jarTip;
    floatValue = floatField.value * 1;

    let sum = countArr[18];
    cbpValue = sum - floatValue;
    cbpField.value = cbpValue;

    skipField.value = getNetAmount('Skip', sos);

    uberField.value = getNetAmount('Uber', uos);

    doordashField.value = getNetAmount('Doordash', dos);
    depositValue = cbpValue - payoutValue;
    depositField.value = depositValue;

    if (depositValue < 0) {
      ccValue = payoutValue + jarValue;
      ccField.textContent = ccValue;
    } else {
      ccValue = cbpValue + jarValue;
      ccField.textContent = ccValue;
    }
  } else {
    console.log('No such document!');
  }

  var summary = {
    cashBeforePayout: cbpValue,
    skipNetValue: getNetAmount('Skip', arrSum(skipOr)),
    uberNetValue: getNetAmount('Uber', arrSum(uberOr)),
    doordashNetValue: getNetAmount('Doordash', arrSum(uberOr)),
    depositCash: depositValue,
    payoutAmount: payoutValue,
    jarTip: jarValue,
    cashInCover: ccValue,
  };
}
