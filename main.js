let completeGoalButton = document.getElementById("completiongoal");
let savedReadToday = document.getElementById("savedReadToday");
let customGoalDiv = document.getElementById("forcustomgoal");
let selectOption = document.getElementById("selectoption");
let customGoalInput = document.getElementById("customgoalinput");
let totalReadVerses = document.getElementById("totalread");
let removeTotalButton = document.getElementById("removetotal");
let removeTodayButton = document.getElementById("removetoday");

function getCurrentTimestamp() {
  return Math.floor(new Date().getTime() / 1000); // Get the current timestamp in seconds
}

window.addEventListener('load', () => {
  const savedToday = localStorage.getItem('savedToday') || '0';
  const totalRead = localStorage.getItem('totalRead') || '0';
  const lastUpdatedTimestamp = parseInt(localStorage.getItem('lastUpdatedTimestamp'), 10) || 0;
  const customGoal = localStorage.getItem('customGoal') || '';

  // Check if 24 hours have passed since the last update
  if (getCurrentTimestamp() - lastUpdatedTimestamp >= 24 * 60 * 60) {
    savedReadToday.innerHTML = `<h2>0</h2>`;
  } else {
    savedReadToday.innerHTML = savedToday;
  }

  totalReadVerses.innerHTML = totalRead;

  // Set the value of the customGoalInput if a custom goal was previously set
  if (customGoal) {
    customGoalInput.value = customGoal;
    // Update totalReadVerses with the custom goal value
    let totalVerses = parseInt(totalReadVerses.innerText) + parseInt(customGoal);
    totalReadVerses.innerHTML = `<h2>${totalVerses}</h2>`;
  }
});

function goalButton() {
  let verses = selectOption.value;
  let currentDayGoal = savedReadToday.innerText;

  if (selectOption.value === "0") {
    currentDayGoal = customGoalInput.value;

    // Check if the custom goal input is not a valid number
    if (isNaN(parseInt(currentDayGoal))) {
      alert("Please enter a valid number for the custom goal.");
      return;
    }

    // Check if the goal has already been completed on the current day with the same custom value
    if (currentDayGoal !== '0' && currentDayGoal === savedReadToday.innerText) {
      alert("You have already completed the goal for today with the same custom value. Choose another value or wait until the next day for the next goal.");
      return;
    }
  }

  // Check if the goal has already been completed on the current day with the same value
  if (currentDayGoal !== '0' && currentDayGoal === verses) {
    alert("You have already completed the goal for today. Choose another value or wait until the next day for the next goal.");
    return;
  }

  // Update totalReadVerses independently
  let totalVerses = parseInt(totalReadVerses.innerText);

  if (selectOption.value === "0") {
    let customValue = parseInt(currentDayGoal);
    savedReadToday.innerHTML = `<h2>${customValue}</h2>`;
    totalVerses += customValue;
    // Save custom goal input to localStorage
    localStorage.setItem('customGoal', customValue.toString());
  } else {
    savedReadToday.innerHTML = `<h2>${verses}</h2>`;
    totalVerses += parseInt(verses);
  }

  totalReadVerses.innerHTML = `<h2>${totalVerses}</h2>`;

  // Save values and update timestamp to the current time
  localStorage.setItem("savedToday", savedReadToday.innerHTML);
  localStorage.setItem("totalRead", totalReadVerses.innerHTML);
  localStorage.setItem('lastUpdatedTimestamp', getCurrentTimestamp());
}

completeGoalButton.addEventListener("click", goalButton);

function customGoalOption() {
  let selectOptionValue = selectOption.value;
  customGoalDiv.style.display = selectOptionValue === "0" ? "block" : "none";
}

// event on selectOption to handle both regular and custom goals
selectOption.addEventListener("change", customGoalOption);

function removeTotalf() {
  totalReadVerses.innerHTML = `<h2>0</h2>`;
  // Save the updated value to localStorage
  localStorage.setItem("totalRead", '0');
}

removeTotalButton.addEventListener("click", removeTotalf);

function removeTodayf() {
  savedReadToday.innerHTML = `<h2>0</h2>`;
  // Save the updated value to localStorage and update timestamp to the current time
  localStorage.setItem('savedToday', '0');
  localStorage.setItem('lastUpdatedTimestamp', getCurrentTimestamp());
}

removeTodayButton.addEventListener("click", removeTodayf);
