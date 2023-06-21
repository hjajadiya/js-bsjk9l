// Import stylesheets
//import './style.css';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  EmailAuthProvider,
  sendEmailVerification,
} from 'firebase/auth';

// Add the Firebase products and methods that you want to use
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  addDoc,
  collection,
  runTransaction,
  deleteDoc,
  deleteField,
  getDocFromCache,
  query,
  where,
  getDocs,
  onSnapshot,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import * as firebaseui from 'firebaseui';

let db, auth;

// Write Javascript code!
const appDiv = document.getElementById('app');

const loginLink = document.getElementById('login-link');

let home = `<div class="input-group mb-3  w-25">
<span class="input-group-text" id="basic-addon1">Date</span>
<input
  id="date-field"
  type="date"
  class="form-control"
  placeholder=""
  aria-label=""
  aria-describedby="basic-addon1"
  min="2023-05-01"
  max="2030-01-01"
/>
<button type="button" id = "next-page" class="btn btn-primary">Next</button>

</div>`;

let loginPage = `
<div class="card mt-3">
  <div class="card-body">
Please login to your account
  </div>
</div>
`;

let adminPage = `<div class="input-group mb-3 w-25">
<span class="input-group-text" id="basic-addon1">From</span>
<input
  id="date-field1"
  type="date"
  class="form-control"
  placeholder=""
  aria-label=""
  aria-describedby="basic-addon1"
  min="2023-05-01"
  max="2030-01-01"
/></div>

<p>
<div class="input-group mb-3 w-25">
<span class="input-group-text" id="basic-addon1">To</span>
<input
  id="date-field2"
  type="date"
  class="form-control"
  placeholder=""
  aria-label=""
  aria-describedby="basic-addon1"
  min="2023-05-01"
  max="2030-01-01"
/></div>
<button type="button" id = "view-report" class="btn btn-primary">Next</button>
<div class="card mt-3">
  <div class="card-body" id="report-box">

  </div>
</div>


</div>`;
let dashboard = `
<hr />
<div class="input-group mb-3 w-25">
<span class="input-group-text" id="basic-addon1">Date</span>
<input
  id="date-field"
  type="date"
  class="form-control"
  placeholder=""
  aria-label=""
  aria-describedby="basic-addon1"
/>
</div>
</hr>
<p>

      <button id = "cash-count" type="button" class="btn btn-primary">Cash Counter</button><p><p>
      <hr />
      <button id = "skip-app" type="button" class="btn btn-primary">Skip Orders</button><p><p>
      <button id = "uber-app" type="button" class="btn btn-primary">Uber Orders</button><p>
      <button id = "doordash-app" type="button" class="btn btn-primary">Doordash Orders</button>
      <hr />
      <button id = "payout-page" type="button" class="btn btn-primary">Payout</button>
      <button id = "summary-func" type="button" class="btn btn-primary">Summary</button>
<hr />
`;
let appSelection = `
<hr />
<p>

<hr />
`;
let verifyEmail = ` <div class="d-flex justify-content-center align-content-center" style="margin:15rem; ">
<button type="button" id = "verify-email" class="btn btn-primary">Verify Email</button>

</div>`;
let summaryPage = `

<button id = "save-data" type="button" class="btn btn-primary">Back</button>
<h5>Cash Before Payout</h5>
<input
  id="cbpayout-field"
  type="number"
  class="form-control"
  aria-label="net"
  disabled
/>
<h5>Float Amount</h5>
<input id="float-field" type="number"  value="250"class="form-control" aria-label="net" />



<h5>Skip Net Amount</h5>
<input
  id="skip-field"
  type="number"
  class="form-control"
  aria-label="net"
  disabled
/>
<h5>Uber Net Amount</h5>
<input
  id="uber-field"
  type="number"
  class="form-control"
  aria-label="net"
  disabled
/>
<h5>Doordash Net Amount</h5>
<input
  id="doordash-field"
  type="number"
  class="form-control"
  aria-label="net"
  disabled
/>
<h5>Deposit Cash</h5>
<input
  id="deposit-field"
  type="number"
  class="form-control"
  aria-label="net"
  disabled
/>
<h5>Cash in Cover</h5>
<h6 id="cc-field">$</h6>`;
let cashCountPage = ` 
<button type="button" id="save-data" class="btn btn-primary">Back</button>
<button type="button" id="to-next" class="btn btn-primary">Next</button>
<h2>Bills</h2>

<div class="d-flex p-2" style="margin: 0.5rem">
  <table class="table  table-striped" id="bills-table">
    <thead>
      <tr>
        <th scope="col">Amount</th>
        <th scope="col">Count</th>
        <th scope="col">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">$100</th>
        <td>
          <input
            id="0"
            type="number"
            class="form-control"
            aria-label="Number of Bills"
          />
        </td>
        <td>$0</td>
      </tr>
      <tr>
        <th scope="row">$50</th>
        <td>
          <input
            id="1"
            type="number"
            class="form-control"
            aria-label="Number of Bills"
          />
        </td>
        <td>$0</td>
      </tr>
      <tr>
        <th scope="row">$20</th>
        <td>
          <input
            id="2"
            type="number"
            class="form-control"
            aria-label="Number of Bills"
          />
        </td>
        <td>$0</td>
      </tr>
      <tr>
        <th scope="row">$10</th>
        <td>
          <input
            id="3"
            type="number"
            class="form-control"
            aria-label="Number of Bills"
          />
        </td>
        <td>$0</td>
      </tr>
      <tr>
        <th scope="row">$5</th>
        <td>
          <input
            id="4"
            type="number"
            class="form-control"
            aria-label="Number of Bills"
          />
        </td>
        <td>$0</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td id="15">$0</td>
      </tr>
    </tbody>
  </table>
</div>
<h2>Coins</h2>
<div class="d-flex p-2" style="margin: 0.5rem">
  <table class="table" id="coin-table">
    <thead>
      <tr>
        <th scope="col">Amount</th>
        <th scope="col">Coins</th>
        <th scope="col">Total</th>
        <th scope="col">Rolls</th>
        <th scope="col">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">$2</th>
        <td>
          <input
            id="5"
            type="number"
            class="form-control"
            aria-label="Number of coins"
          />
        </td>
        <td>$0</td>
        <td>
          <input
            id="10"
            type="number"
            class="form-control"
            aria-label="Number of rolls"
          />
        </td>
        <td>$0</td>
      </tr>
      <tr>
        <th scope="row">$1</th>
        <td>
          <input
            id="6"
            type="number"
            class="form-control"
            aria-label="Number of coins"
          />
        </td>
        <td>$0</td>
        <td>
          <input
            id="11"
            type="number"
            class="form-control"
            aria-label="Number of rolls"
          />
        </td>
        <td>$0</td>
      </tr>
      <tr>
        <th scope="row">25¢</th>
        <td>
          <input
            id="7"
            type="number"
            class="form-control"
            aria-label="Number of coins"
          />
        </td>
        <td>$0</td>
        <td>
          <input
            id="12"
            type="number"
            class="form-control"
            aria-label="Number of rolls"
          />
        </td>
        <td>$0</td>
      </tr>
      <tr>
        <th scope="row">10¢</th>
        <td>
          <input
            id="8"
            type="number"
            class="form-control"
            aria-label="Number of coins"
          />
        </td>
        <td>$0</td>
        <td>
          <input
            id="13"
            type="number"
            class="form-control"
            aria-label="Number of rolls"
          />
        </td>
        <td>$0</td>
      </tr>
      <tr>
        <th scope="row">5¢</th>
        <td>
          <input
            id="9"
            type="number"
            class="form-control"
            aria-label="Number of coins"
          />
        </td>
        <td>$0</td>
        <td>
          <input
            id="14"
            type="number"
            class="form-control"
            aria-label="Number of rolls"
          />
        </td>
        <td>$0</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td id="16">$0</td>
        <td></td>
        <td id="17">$0</td>
      </tr>
    </tbody>
  </table>
</div>
<h4 id="18"></h4>
`;
let payoutPage = `
<button type="button" id="save-data" class="btn btn-primary">Back</button>
<button type="button" id="to-next" class="btn btn-primary">Next</button>
<h5>Payout</h5>
<input
  id="payout-field"
  type="number"
  class="form-control"
  aria-label="net"
/>
<h5>Jar Tip</h5>
<input id="jar-field" type="number" class="form-control" aria-label="net" />
`;
let addOrders = `
<button type="button" id="save-data" class="btn btn-primary">Back</button>
<button type="button" id="to-next" class="btn btn-primary">Next</button>
<h4 id="ao-title">App Orders</h4>
<input
id="order-value"
type="number"
class="form-control"
aria-label="amount"
/>
<input
id="order-total"
type="number"
class="form-control"
aria-label="net" disabled
/>
<button type="button" id="add-orders" class="btn btn-primary">Add Order</button>

<table class="table" id="orders-table">
      <thead>
        <tr>
        <th scope="col"></th>
          <th scope="col">Orders</th>
          <th scope="col">Net Value</th>
        </tr>
      </thead>
      <tbody id="result-box"></tbody>
    </table>
    <template id="row-template">
      <tr>
      <td> <button class="oDelete" id = "" type="button" class="btn btn-primary">Delete</button></td>
        <td>
          <input
            class="oAmount"
            id=""
            type="number"
            class="form-control"
            aria-label="amount" disabled
          />
        </td>
        <td>
          <input
            class="oNet"
            id=""
            type="number"
            class="form-control"
            aria-label="net"
            disabled
          />
        </td>
      </tr>
    </template>
`;

var pageName = '';
var allOrders;
var myArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let selectedDate;
document.getElementById('app').addEventListener('click', clickEventHandler);
document.getElementById('app').addEventListener('input', (e) => {
  if (e.target.id == 'date-field') {
    selectedDate = document.getElementById('date-field').value;
  }
  console.log(selectedDate);
});
document.getElementById('my-nav').addEventListener('click', linkEventHandler);
function linkEventHandler(e) {
  if (e.target.matches('#home-link')) {
    document.getElementById('firebaseui-auth-container').style.display = 'none';
    saveData();
  }
  if (e.target.matches('#admin-link')) {
    appDiv.innerHTML = adminPage;
    document.getElementById('date-field1').value = todayDate();

    document.getElementById('date-field2').value = todayDate();
  }
  if (e.target.matches('#login-link')) {
    document.getElementById('firebaseui-auth-container').style.display = '';
    appDiv.innerHTML = null;
  }
}
function clickEventHandler(e) {
  console.log(pageName);

  if (e.target.matches('#verify-email')) {
    userVerify();
  }
  if (e.target.matches('#cash-count')) {
    cashCount();
  }
  if (e.target.matches('#skip-app')) {
    appOrders('Skip');
  }
  if (e.target.matches('#uber-app')) {
    appOrders('Uber');
  }
  if (e.target.matches('#doordash-app')) {
    appOrders('Doordash');
  }
  if (e.target.matches('#payout-page')) {
    payoutFunc();
  }
  if (e.target.matches('#summary-func')) {
    loadSummary();
  }
  if (e.target.matches('#view-report')) {
    createReport();
  }
  if (e.target.matches('#save-data')) {
    saveData();
  }
  if (e.target.matches('#delete-order')) {
    deleteOrder(e);
  }
  if (e.target.matches('#to-next')) {
    saveData();
    switch (pageName) {
      case 'Cash':
        appOrders('Skip');
        break;
      case 'Skip':
        appOrders('Uber');
        break;
      case 'Uber':
        appOrders('Doordash');
        break;
      case 'Doordash':
        payoutFunc();
        break;
      case 'Payout':
        loadSummary();
        break;
    }
  }
}

function dateMaker() {
  let objectDate = new Date();
  let hours = objectDate.getHours();
  if (hours < 12) {
    objectDate.setDate(objectDate.getDate() - 1);
  }
  let day = objectDate.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  let month = objectDate.getMonth();
  month = month + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let year = objectDate.getFullYear();
  let date = year + '-' + month + '-' + day;
  document.getElementById('date-field').max = date;
  selectedDate = date;
  return date;
}

async function main() {
  // Add Firebase project configuration object here
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyAfGFV2Y-T0toSwvw2mZ5ja09nEEyb3S1E',
    authDomain: 'hl-foods.firebaseapp.com',
    projectId: 'hl-foods',
    storageBucket: 'hl-foods.appspot.com',
    messagingSenderId: '904989510183',
    appId: '1:904989510183:web:2130808f07d00c6c63dc02',
    measurementId: 'G-LDQ6JNP29T',
  };

  initializeApp(firebaseConfig);
  auth = getAuth();
  db = getFirestore();

  loginAction();

  authState();
}
function daysBetween(d1, d2) {
  // JavaScript program to illustrate
  // calculation of no. of days between two date

  // To set two dates to two variables
  var date1 = new Date(d1);
  var date2 = new Date(d2);

  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  if (Difference_In_Days < 0) {
    Difference_In_Days = Difference_In_Days * -1;
  }
  //To display the final no. of days (result)
  console.log(
    'Total number of days between dates  <br>' +
      date1 +
      '<br> and <br>' +
      date2 +
      ' is: <br> ' +
      Difference_In_Days
  );
  return Difference_In_Days;
}
function datesForReport(d1, d2) {
  function getDatesBetween(startDate, endDate) {
    let currentDate = new Date(startDate.getTime());

    const dates = [];
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    if (startDate <= endDate) {
      // dates.shift();
    }
    if (endDate <= startDate) {
      currentDate.setDate(currentDate.getDate() + 1);
      console.log(currentDate);
    }
    while (endDate <= currentDate) {
      dates.push(new Date(endDate));
      endDate.setDate(endDate.getDate() + 1);
    }
    dates.shift();
    return dates;
  }

  const date1 = new Date(d1);
  const date2 = new Date(d2);

  let allDates = getDatesBetween(date1, date2);
  console.log(allDates);
  return allDates;
}
function loginAction() {
  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.

        return false;
      },
    },
  };
  const ui = new firebaseui.auth.AuthUI(auth);
  // Called when the user clicks the RSVP button
  loginLink.addEventListener('click', () => {
    if (auth.currentUser) {
      // User is signed in; allows user to sign out
      signOut(auth);
    } else {
      // No user is signed in; allows user to sign in
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });
}

function authState() {
  // Listen to the current Auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginLink.textContent = 'Logout';
      if (user.emailVerified) {
        authView(true);
        if (user.email.split('@')[1] == 'hlfoods.ca') {
          document.getElementById('admin-link').removeAttribute('hidden');
        } else {
          document.getElementById('admin-link').setAttribute('hidden');
        }
      } else {
        appDiv.innerHTML = verifyEmail;
      }
      // Show guestbook to logged-in users
      // guestbookContainer.style.display = 'block';
    } else {
      loginLink.textContent = 'Login/Sign Up';
      document.getElementById('firebaseui-auth-container').style.display =
        'none';
      authView(false);
      // Hide guestbook for non-logged-in users
      // guestbookContainer.style.display = 'none';
    }
  });
}
main();

function authView(status) {
  if (status == false) {
    appDiv.innerHTML = loginPage;
    document.getElementById('date-field').value = dateMaker();
  } else {
    appDiv.innerHTML = dashboard;
    document.getElementById('date-field').value = dateMaker();

    documentExists();
  }
}
function userVerify() {
  sendEmailVerification(auth.currentUser).then(() => {
    // Email verification sent!
    // ...
  });
}
async function documentExists() {
  const docSnap = await getDoc(doc(db, 'cashCount', todayDate()));

  if (docSnap.exists()) {
  } else {
    addDocByName('cashCount', todayDate(), {});
  }
}
//l-cash count

function cashCount() {
  documentExists();
  appDiv.innerHTML = cashCountPage;
  pageName = 'Cash';

  const billsTable = document.getElementById('bills-table');
  const coinTable = document.getElementById('coin-table');
  billsTable.addEventListener('input', countingApp);
  coinTable.addEventListener('input', countingApp);
  setData();

  function countingApp(e) {
    let id = e.target.id * 1;

    let arr = revertCount('null');
    let value = arr[id];

    let total = e.target.value * value;

    myArr[id] = total;

    e.target.parentElement.nextElementSibling.textContent = '$' + total;
    getTotals();
    let fakearr = [15, 16, 17, 18];
    fakearr.forEach(function (r, i) {
      document.getElementById(r).textContent = '$' + myArr[r];
    });
  }
}
//l-payout
function payoutFunc() {
  documentExists();
  pageName = 'Payout';
  appDiv.innerHTML = payoutPage;
  setData();
}
//set or save data
async function setData() {
  let re = await readResult();
  if (pageName == 'Cash') {
    let resArr = checkData(re, 'counts');
    if (resArr != null) {
      setCountsData(resArr);
    }
    function setCountsData(arr) {
      myArr = revertCount(arr);
      getTotals();
      arr.forEach(function (r, i) {
        if (r != 0) {
          document.getElementById(i).value = r;
        }
      });
      myArr.forEach(function (r, i) {
        if (i < 14) {
          document.getElementById(
            i
          ).parentElement.nextElementSibling.textContent = '$' + r;
        }
        if (i > 14) {
          document.getElementById(i).textContent = '$' + r;
        }
      });
    }
  }
  if (pageName == 'Skip') {
    var arr = re.skipOrder;
    allOrders = arr;

    setOrdersListData(arr);
  }
  if (pageName == 'Uber') {
    var arr = re.uberOrders;
    allOrders = arr;
    setOrdersListData(arr);
  }
  if (pageName == 'Doordash') {
    var arr = re.doordashOrders;
    allOrders = arr;
    setOrdersListData(arr);
  }
  if (pageName == 'Payout') {
    let resArr = checkData(re, 'payout');
    if (resArr != null) {
      document.getElementById('payout-field').value = re.payout.payoutAmount;
      document.getElementById('jar-field').value = re.payout.jarTip;
    }
  }
}
function setOrdersListData(arr) {
  var rBox = document.getElementById('result-box');
  var tBox = document.getElementById('row-template');
  var template = tBox.content;

  rBox.innerHTML = '';
  if (arr != null) {
    if (arr.length != 0) {
      arr.forEach(function (r, i) {
        var tr = template.cloneNode(true);
        var oAm = tr.querySelector('.oAmount');
        var oNe = tr.querySelector('.oNet');
        var oDe = tr.querySelector('.oDelete');
        oDe.id = 'delete-order';
        oAm.value = r;
        oAm.id = 'order-' + i;
        oNe.value = getNetAmount(pageName, r);
        oNe.id = 'net-' + i;
        rBox.appendChild(tr);
      });
    }
  }
}
function saveData() {
  if (pageName == 'Cash') {
    let counts = myArr;
    const data = { counts };
    updateFields('cashCount', todayDate(), data);
  }
  let data = allOrders;
  if (pageName == 'Skip') {
    var skipOrders = { skipOrder: data };
    updateFields('cashCount', todayDate(), skipOrders);
  }
  if (pageName == 'Uber') {
    var uberOrders = { uberOrders: data };
    updateFields('cashCount', todayDate(), uberOrders);
  }
  if (pageName == 'Doordash') {
    var doordashOrders = { doordashOrders: data };
    updateFields('cashCount', todayDate(), doordashOrders);
  }
  if (pageName == 'Payout') {
    let pAmount = document.getElementById('payout-field').value * 1;
    let jTip = document.getElementById('jar-field').value * 1;
    let data = { payoutAmount: pAmount, jarTip: jTip };
    var payout = { payout: data };
    updateFields('cashCount', todayDate(), payout);
  }
  if (pageName == 'Summary') {
    appDiv.innerHTML = dashboard;
  }
  appDiv.innerHTML = dashboard;
  document.getElementById('date-field').value = selectedDate;
}
//l-summary
function arrSum(arr) {
  if (arr.length > 0) {
    let r = arr.reduce(function (a, b) {
      return a + b;
    });
    return twoDecimal(r);
  }
}

function findCashInCover(totalCash, floatValue, payoutValue, jarValue) {
  let depositValue = totalCash - floatValue - payoutValue;
  let cashBeforePayoutValue = totalCash - floatValue;
  let ccValue = 0;
  if (depositValue < 0) {
    ccValue = payoutValue + jarValue;
  } else {
    ccValue = cashBeforePayoutValue + jarValue;
  }
  return ccValue;
}

function checkVal(arr) {
  if (arr) {
    return arr;
  } else {
    return [0];
  }
}
function checkVol(v) {
  if (v) {
    return v;
  } else {
    return 0;
  }
}
async function loadSummary() {
  pageName = 'Summary';
  documentExists();
  appDiv.innerHTML = summaryPage;
  let re = await readResult();

  let floatValue = twoDecimal(document.getElementById('float-field').value * 1);
  let totalCash = twoDecimal(re.counts[18]);

  var summary = {
    cashBeforePayout: twoDecimal(totalCash - floatValue),
    skipNetValue: getNetAmount('Skip', arrSum(checkVal(re.skipOrder))),
    uberNetValue: getNetAmount('Uber', arrSum(checkVal(re.uberOrders))),
    doorNetValue: getNetAmount('Doordash', arrSum(checkVal(re.doordashOrders))),
    depositCash: twoDecimal(
      totalCash - floatValue - checkVol(re.payout.payoutAmount)
    ),
    payoutAmount: twoDecimal(checkVol(re.payout.payoutAmount)),
    jarTip: twoDecimal(checkVol(re.payout.jarTip)),
    cashInCover: twoDecimal(
      findCashInCover(
        totalCash,
        floatValue,
        checkVol(re.payout.payoutAmount),
        checkVol(re.payout.jarTip)
      )
    ),
  };

  setFinalData(summary);
  saveFinalData(summary);
}
function setFinalData(summary) {
  document.getElementById('cbpayout-field').value = summary.cashBeforePayout;
  document.getElementById('skip-field').value = summary.skipNetValue;
  document.getElementById('uber-field').value = summary.uberNetValue;
  document.getElementById('doordash-field').value = summary.doorNetValue;
  document.getElementById('deposit-field').value = summary.depositCash;
  document.getElementById('cc-field').textContent = '$' + summary.cashInCover;
}
async function saveFinalData(summary) {
  await updateDoc(doc(db, 'cashCount', todayDate()), { summary });
  let dt = selectedDate.split('-')[2];

  let data = {};
  data[dt] = summary;
  await updateDoc(
    doc(
      db,
      'cashCount/summary/' + todayDate().split('-')[0],
      todayDate().split('-')[1]
    ),
    data
  ).catch(() => {
    addDocByName(
      'cashCount/summary/' + todayDate().split('-')[0],
      todayDate().split('-')[1],
      data
    );
  });

  //  addDocByName(    'cashCount/summary/' + todayDate().split('-')[0],    todayDate().split('-')[1],    data  );
}
//l-app orders
function addOrder() {
  const orderValue = document.getElementById('order-value');
  var currentValue = orderValue.value * 1;

  if (currentValue != 0) {
    if (allOrders) {
      allOrders.push(currentValue);
    } else {
      allOrders = [];
      allOrders.push(currentValue);
    }
  }
  setOrdersListData(allOrders);
  orderValue.value = null;
  document.getElementById('order-total').value = null;
  //  saveOrders(pageName, allOrders);
}
function deleteOrder(e) {
  console.log(e.target.parentElement.nextElementSibling);
  let id = e.target.parentElement.nextElementSibling.children[0].id;
  let i = id.split('-')[1];
  allOrders[i[1]] = 0;
  document.getElementById(id).value = 0;
  e.target.parentElement.parentElement.remove();
  allOrders.splice(i, 1);
}
function appOrders(appName) {
  documentExists();
  allOrders = [];
  appDiv.innerHTML = addOrders;
  pageName = appName;
  console.log(pageName);
  document.getElementById('ao-title').textContent = appName + ' Orders';

  setData();

  const addButton = document.getElementById('add-orders');
  addButton.addEventListener('click', addOrder);
  const orderTotal = document.getElementById('order-total');
  const orderValue = document.getElementById('order-value');

  orderValue.addEventListener('input', updateTotal);
  function updateTotal(e) {
    if (e.target.matches('#order-value')) {
      var val = e.target.value * 1;

      orderTotal.value = getNetAmount(pageName, val);
    }
    var val = e.target.value * 1;
    orderTotal.textContent = getNetAmount(pageName, val);
  }

  // const ordersTable = document.getElementById('orders-table');
  // ordersTable.addEventListener('input', setAppOrders);
}

//l-math
function getTotals() {
  myArr[15] = myArr[1] + myArr[2] + myArr[3] + myArr[4] + myArr[0];
  myArr[16] = myArr[5] + myArr[6] + myArr[7] + myArr[8] + myArr[9];
  myArr[17] = myArr[10] + myArr[11] + myArr[12] + myArr[13] + myArr[14];
  myArr[18] = myArr[15] + myArr[16] + myArr[17];
}
function convCount(arr) {
  var countArr = [
    arr[0] / 100,
    arr[1] / 50,
    arr[2] / 20,
    arr[3] / 10,
    arr[4] / 5,
    arr[5] / 2,
    arr[6] / 1,
    arr[7] / 0.25,
    arr[8] / 0.1,
    arr[9] / 0.05,
    arr[10] / 50,
    arr[11] / 25,
    arr[12] / 10,
    arr[13] / 5,
    arr[14] / 2,
  ];
  return countArr;
}
function revertCount(arr) {
  if (arr == 'null') {
    arr = new Array(15).fill(1);
  }
  var countArr = [
    arr[0] * 100,
    arr[1] * 50,
    arr[2] * 20,
    arr[3] * 10,
    arr[4] * 5,
    arr[5] * 2,
    arr[6] * 1,
    arr[7] * 0.25,
    arr[8] * 0.1,
    arr[9] * 0.05,
    arr[10] * 50,
    arr[11] * 25,
    arr[12] * 10,
    arr[13] * 5,
    arr[14] * 2,
  ];

  return countArr;
}

function convertDate(d) {
  let objectDate = d;
  let day = objectDate.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  let month = objectDate.getMonth();
  month = month + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let year = objectDate.getFullYear();
  let date = year + '-' + month + '-' + day;
  return date;
}
function todayDate() {
  let objectDate = new Date();
  let day = objectDate.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  let month = objectDate.getMonth();
  month = month + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let year = objectDate.getFullYear();
  let date = year + '-' + month + '-' + day;
  date = selectedDate;
  return date;
}
function twoDecimal(v) {
  v = Math.round(v * 100) / 100;
  return v;
}

function getNetAmount(pageName, value) {
  var valNet;
  if (pageName == 'Skip') {
    valNet = value * 0.8625;
  }
  if (pageName == 'Uber') {
    valNet = value * 0.83375;
  }
  if (pageName == 'Doordash') {
    valNet = value / 1.06;
  }
  valNet = twoDecimal(valNet);
  return valNet;
}
function checkData(value, type) {
  if (value != null) {
    if (type in value) {
      if (value[type].length != 0) {
        const rarr = convCount(value[type]);
        return rarr;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}
function dataValidator(v, r, a) {
  if (v == r) {
    if (a == 0) {
    } else {
      return v;
    }
  } else {
    return r;
  }
}

async function getAllData(ym) {
  let rarr = {};
  for (let i = 0; i < ym.length; i++) {
    let v = ym[i];
    let r;
    const docSnap = await getDoc(
      doc(db, 'cashCount/summary/' + v.split('-')[0] + '/', v.split('-')[1])
    );

    if (docSnap.exists()) {
      r = docSnap.data();
      rarr[v] = r;
    } else {
      // docSnap.data() will be undefined in this case

      console.log('No such document!');
    }
    if (ym.length == i + 1) {
      return rarr;
    }
  }
}

function getYearMonth(d) {
  let yarr = [];

  d.forEach(function (v) {
    v = convertDate(v);
    yarr.push(v.split('-')[0] + '-' + v.split('-')[1]);
  });

  return Array.from(new Set(yarr));
}

async function filterData(dates, data) {
  let arr = {};
  for (let i = 0; i < dates.length; i++) {
    let v = dates[i];
    v = convertDate(v);
    let ym = v.split('-')[0] + '-' + v.split('-')[1];
    let d = v.split('-')[2];

    if (ym in data) {
      if (d in data[ym]) {
        if (!arr[ym]) {
          arr[ym] = {};
        }
        arr[ym][d] = data[ym][d];
      }
    }
    if (dates.length == i + 1) {
      return arr;
    }
  }
}
async function createReport() {
  let d1 = document.getElementById('date-field1').value;
  let d2 = document.getElementById('date-field2').value;
  //let d1 = document.getElementById('start-date').value;
  //let d2 = document.getElementById('end-date').value;
  let numDays = daysBetween(d1, d2);

  if (numDays < 35) {
    let dates = datesForReport(d1, d2);
    let yearMonth = getYearMonth(dates);
    let data = await getAllData(yearMonth);
    let fData = await filterData(dates, data);
    console.log(fData);
    totalData(fData);
    function totalData(fData) {
      let cashBeforePayout = [];
      let cashInCover = [];
      let depositCash = [];
      let doorNetValue = [];
      let jarTip = [];
      let payoutAmount = [];
      let skipNetValue = [];
      let uberNetValue = [];

      let keys = Object.keys(fData);
      for (let i = 0; i < keys.length; i++) {
        let ym = keys[i];
        let key = Object.keys(fData[ym]);
        for (let i = 0; i < key.length; i++) {
          let d = key[i];
          let data = fData[ym][d];
          cashBeforePayout.push(data.cashBeforePayout);
          cashInCover.push(data.cashInCover);
          depositCash.push(data.depositCash);
          doorNetValue.push(data.doorNetValue);
          jarTip.push(data.jarTip);
          payoutAmount.push(data.payoutAmount);
          skipNetValue.push(data.skipNetValue);
          uberNetValue.push(data.uberNetValue);
        }
      }
      cashBeforePayout = arrSum(cashBeforePayout);
      cashInCover = arrSum(cashInCover);
      depositCash = arrSum(depositCash);
      doorNetValue = arrSum(doorNetValue);
      jarTip = arrSum(jarTip);
      payoutAmount = arrSum(payoutAmount);
      skipNetValue = arrSum(skipNetValue);
      uberNetValue = arrSum(uberNetValue);
      let result =
        `<p>` +
        'Cash Before Payout : ' +
        cashBeforePayout +
        '\n' +
        `<p>` +
        'Cash In Cover : ' +
        cashInCover +
        '\n' +
        `<p>` +
        'Deposit Cash : ' +
        depositCash +
        '\n' +
        `<p>` +
        'Doordash Net Value : ' +
        doorNetValue +
        '\n' +
        `<p>` +
        'Jar Tip : ' +
        jarTip +
        '\n' +
        `<p>` +
        'Payout Amount : ' +
        payoutAmount +
        '\n' +
        `<p>` +
        'Skip Net Value : ' +
        skipNetValue +
        '\n' +
        `<p>` +
        'Uber Net Value : ' +
        uberNetValue;
      document.getElementById('report-box').innerHTML = result;
      console.log(result);
    }
  }
}
//l-firestore
async function updateFields(colPath, docName, data) {
  // Set the "capital" field of the city 'DC'
  await updateDoc(doc(db, colPath, docName), data);
}
async function addDocByName(colPath, docName, data) {
  //e.preventDefault();

  await setDoc(doc(db, colPath, docName), data)
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });

  // Return false to avoid redirect
  return false;
}

async function addDocAutoId(colPath, data) {
  // e.preventDefault();

  await addDoc(collection(db, colPath), data)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });

  // Return false to avoid redirect
}

async function readResult() {
  let result = await readData('cashCount', todayDate()).then((value) => {
    return value;
  });
  return result;
}
async function readData(colPath, docName) {
  const docSnap = await getDoc(doc(db, colPath, docName));

  if (docSnap.exists()) {
    const rdata = docSnap.data();
    //console.log('Document data:', obj);

    return rdata;
    // runFunc('fireData', docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
    return null;
  }
}
