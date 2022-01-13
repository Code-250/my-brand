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
    const loginCredentials = {
      email,
      password,
    };
    const saveCredentials = JSON.stringify(loginCredentials);
    console.log(saveCredentials);
    localStorage.setItem("loginCredentials", saveCredentials);
    if (!localStorage.getItem("loginCredentials")) {
      window.location.replace("https://richmunye.netlify.app/login.html");
    }
    window.location.replace("https://richmunye.netlify.app/admin/admin.html");
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
