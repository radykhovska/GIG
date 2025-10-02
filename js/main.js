const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const submitButton = document.getElementById("submitButton");

let isNameTouched = false;
let isEmailTouched = false;

function displayError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((el) => (el.textContent = ""));
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

function isNameValid() {
  const name = nameInput.value.trim();

  return name !== "" && name.length >= 2;
}

function isEmailValid() {
  const email = emailInput.value.trim();

  return email !== "" && isValidEmail(email);
}

function displayValidation(field) {
  if (field === "name") {
    displayError("nameError", "");
    if (!isNameValid()) {
      const name = nameInput.value.trim();
      if (name === "") {
        displayError("nameError", "Ім'я є обов'язковим полем.");
      } else if (name.length < 2) {
        displayError("nameError", "Ім'я має бути довшим за 1 символ.");
      }
    }
  } else if (field === "email") {
    displayError("emailError", "");
    if (!isEmailValid()) {
      const email = emailInput.value.trim();
      if (email === "") {
        displayError("emailError", "Електронна пошта є обов'язковою.");
      } else if (!isValidEmail(email)) {
        displayError("emailError", "Введіть коректний формат емейла.");
      }
    }
  }
}

function checkInputs() {
  const isReady = isNameValid() && isEmailValid();

  submitButton.disabled = !isReady;
}

nameInput.addEventListener("blur", function () {
  isNameTouched = true;
  displayValidation("name");
  checkInputs();
});

emailInput.addEventListener("blur", function () {
  isEmailTouched = true;
  displayValidation("email");
  checkInputs();
});

form.addEventListener("input", function () {
  if (isNameTouched) {
    displayValidation("name");
  }
  if (isEmailTouched) {
    displayValidation("email");
  }
  checkInputs();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (isNameValid() && isEmailValid()) {
    const qs = new URLSearchParams(new FormData(form));

    form.reset();
    window.location.assign(`${form.action}?${qs}`);
  }
});

checkInputs();
