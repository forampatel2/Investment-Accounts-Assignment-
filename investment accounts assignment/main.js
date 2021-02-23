// Investment Accounts Assignment Start Code

// HTML Variables
let containerEl = document.getElementById("container");
let outputEl = document.getElementById("output");
let goBtnEl = document.getElementById("go");
let menuEl = document.getElementById("menu");

// Global Variable
let accounts = [];
let maxAmount = 5000; // account values should be b/t 0 and max
for ( let n = 0; n < 200; n++)
  accounts.push(Math.random() * maxAmount)

// Display Data
drawArray();

function drawArray() {
  let outputStr = "";
  let divHeight;
  for (let i = 0; i < accounts.length; i++) {
    divHeight = (accounts[i] / maxAmount) * 600; // Scale accounts to fit in array visualizer container
    outputStr += `<div style="height:${divHeight}px"></div>`;
  }
  containerEl.innerHTML = outputStr;
}

// Main Menu & Go Button
goBtnEl.addEventListener("click", mainMenu);

function mainMenu() {
  // Get value of menu select element
  let selection = menuEl.value;

  // Take action based on menu selection
  if (selection === "count-range") {
    countRange();
  } else if (selection === "donor") {
    generousDonor();
  } else if (selection === "hacker") {
    hackerAttack();
  } else if (selection === "stats") {
    investmentStats();
  } else if (selection === "add") {
    addAccount();
  } else if (selection === "remove-low") {
    removeLow();
  } else if (selection === "robin-hood") {
    robinHood();
  }

  // Redraw array to show any changes
  drawArray();
}

// ******************************************************
// MENU SELECTION FUNCTIONS
// ******************************************************
function countRange() {
  // Output the number of accounts with amounts between $2,000 and $4,000, inclusive
  let count = 0;
  for( let i = 0; i < accounts.length; i++)
  if (accounts[i] > 2000 && accounts[i] < 4000) {
    count++
  }
  outputEl.innerHTML = " Count Range: " + count;
}

function generousDonor() {
  // A generous donor has decided to give $500 to every investment
  // account that has less than $2000. 
  // Modify the investment account array to apply this donation.
  // Output the total amount of money that was donated.
  let count = 0;
  for( let i = 0; i < accounts.length; i++) {
  if (accounts[i] < 2000) {
      accounts[i] += 500
      count++
   }
  }
  outputEl.innerHTML = " Generous Donor: " + count * 500;
}

function hackerAttack() {
  // A hacker steals 5% from every account.
  // Modify the investment account array to apply this theft.
  // Output the total amount that was stolen.
  let theftAmount = 0;
  for(let i = 0; i < accounts.length; i++) {
    theftAmount += (accounts[i] * 0.05)
    accounts[i] -= (accounts[i] * 0.05)
  }
  outputEl.innerHTML = " Hacker Attack: " + Math.round(theftAmount);
}

function investmentStats() {
  // Output the minimum account amount, the maximum account amount
  // and the average account amount.
  let maxNum = Math.max(...accounts);
  let minNum = Math.min(...accounts);
  let totalNum = 0;
  for(let i =0; i < accounts.length; i++) {
    totalNum += accounts[i];
  }
  let avgNum = totalNum / accounts.length
  outputEl.innerHTML = `Investment Stats:<br> Maximum Account Value: $${Math.round(maxNum)}<br> Minimum Account Value: $${Math.round(minNum)}<br> Average Value: $${Math.round(avgNum)}` 
}

function addAccount() {
  // Prompt for a new account amount and add this to the invesment account
  // array. Output a confirmation that a new account was added with an
  // opening amount of _______.
  let newAmount = Number(prompt("Enter Account Number"))
  if (newAmount > 5000) {
    return alert("Amount Is Too High")
  } 
  accounts.push(newAmount) 
  outputEl.innerHTML = `Add Account: Successfully added a new account with a value of $${newAmount}`;
}

function removeLow() {
  // Remove all accounts that are below $500.
  // Output how many accounts were removed.
  let count = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 500){
      accounts.splice(i , 1)
      i --
      count++
    }
  }
  outputEl.innerHTML = `Remove Low Accounts: ${count} Accounts were removed`;
}

function robinHood() {
  // Steal from the rich and give to the poor.
  // Take $400 from every account that has over $4000.
  // Then evenly distribute the total amount taken between all the
  // accounts that have less than $1000.
  // Output how many accounts received money and 
  // how much each account received.
  let robinTax= 0;
  let count = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] > 4000) {
      accounts[i] -= 400
      robinTax += 400
    }
    if (accounts[i] < 1000) {
      count++
    }
  }
  // Distribute Money
  let distributedMoney = robinTax / count
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 1000) {
      accounts[i] += distributedMoney         
    }
  }
  outputEl.innerHTML = `Robin Hood: ${count} accounts received money, with each acquiring $${Math.round(distributedMoney)}`;
}