// validator.initialize();;
const loginForm = document.querySelector("form");
const handleLogin = (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm).entries();
  const { email, password } = Object.fromEntries(formData);
  // console.log("keeeee");
  const emailErrorMessage = validateEmail(email);
  const passowrdErrorMessage = validatePassword(password, 6);

  if (emailErrorMessage) {
    // select the email form field message element
    const emailErrorMessageElement = document.querySelector(
      ".email.error-message"
    );
    // show email error message to user
    emailErrorMessageElement.innerText = emailErrorMessage;
  }

  if (passowrdErrorMessage) {
    // select the email form field message element
    const passwordErrorMessageElement = document.querySelector(
      ".password.error-message"
    );
    // show password error message to user
    passwordErrorMessageElement.innerText = passowrdErrorMessage;
  }
  if ((emailErrorMessage === " ") & (passowrdErrorMessage === " ")) {
    const saveEmail = JSON.stringify(email);
    const savePassword = JSON.stringify(password);
    console.log(saveEmail, savePassword);
    localStorage.setItem("email", saveEmail);
    localStorage.setItem("password", savePassword);
    window.location.replace("http://127.0.0.1:5500/admin/admin.html");
  }
};
const validateEmail = (email) => {
  if (!email.trim()) return "email is required";
  const emailValidated = /\S+@\S+\.\S+/;
  if (!emailValidated.test(email)) {
    return "please enter a valid email";
  }

  return " ";
};

const validatePassword = (password, minLength) => {
  if (!password) return "Password is required";
  if (password.length < minLength) {
    return `Please enter a password that's at least ${minLength} characters long`;
  }

  const hasCapitalLetter = /[A-Z]/g;
  if (!hasCapitalLetter.test(password)) {
    return "Please use at least one capital letter.";
  }

  const hasNumber = /\d/g;
  if (!hasNumber.test(password)) {
    return "Please use at least one number.";
  }
  return " ";
};

const loginBtn = document.querySelector(".login-btn");
loginBtn.addEventListener("click", handleLogin);
