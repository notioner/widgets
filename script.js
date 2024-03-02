const clock = document.getElementById("clock");
const time = document.getElementById("time");
const amPm = document.getElementById("am-pm");
const switchBtn = document.getElementById("switch-btn");
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeModalBtn = document.querySelector(".close-btn");
const saveBtn = document.getElementById("save-btn");
const backgroundColorSelect = document.getElementById("background-color");
const fontColorSelect = document.getElementById("font-color");

// Default values
let is24Hour = false;
let backgroundColor = "#FFFFFF";
let fontColor = "#37352F";

document.addEventListener("DOMContentLoaded", function () {
  // Load user preferences from localStorage on page load
  if (localStorage.getItem("is24Hour") !== null) {
    is24Hour = localStorage.getItem("is24Hour") === "true";
  }

  if (localStorage.getItem("backgroundColor") !== null) {
    backgroundColor = localStorage.getItem("backgroundColor");
  }

  if (localStorage.getItem("fontColor") !== null) {
    fontColor = localStorage.getItem("fontColor");
  }

  // Update styles
  document.body.style.backgroundColor = backgroundColor;
  clock.style.color = fontColor;
  document.body.style.color = fontColor;
  switchBtn.style.color = fontColor;
  settingsBtn.style.color = fontColor;

  // Update switchBtn text
  switchBtn.innerText = is24Hour ? "24" : "12";

  // Update the time to reflect the changes immediately
  updateTime();
});

function updateTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (!is24Hour) {
    let amPmValue = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    amPm.innerText = amPmValue;
    time.innerText = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  } else {
    amPm.innerText = "";
    time.innerText = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  }

  clock.style.color = fontColor;
  document.body.style.color = fontColor;
  switchBtn.style.color = fontColor;
  settingsBtn.style.color = fontColor;
}

function openSettingsModal() {
  settingsModal.style.display = "flex";
}

function closeSettingsModal() {
  settingsModal.style.display = "none";
}

function saveSettings() {
  // Update preferences
  is24Hour = !is24Hour;
  switchBtn.innerText = is24Hour ? "24" : "12";
  backgroundColor = backgroundColorSelect.value;
  fontColor = fontColorSelect.value;

  // Save preferences to localStorage
  localStorage.setItem("is24Hour", is24Hour);
  localStorage.setItem("backgroundColor", backgroundColor);
  localStorage.setItem("fontColor", fontColor);

  // Update styles
  document.body.style.backgroundColor = backgroundColor;
  clock.style.color = fontColor;
  document.body.style.color = fontColor;
  switchBtn.style.color = fontColor;
  settingsBtn.style.color = fontColor;

  // Update the time to reflect the changes immediately
  updateTime();

  // Close the settings modal
  closeSettingsModal();
}

// Event listeners
switchBtn.addEventListener("click", () => {
  is24Hour = !is24Hour;
  switchBtn.innerText = is24Hour ? "24" : "12";
  updateTime();
});

settingsBtn.addEventListener("click", openSettingsModal);
closeModalBtn.addEventListener("click", closeSettingsModal);
saveBtn.addEventListener("click", saveSettings);

// Load user preferences on page load
updateTime();
