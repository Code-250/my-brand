// validator.initialize();;
const popCreate = document.querySelector(".popupCreate");

const loginForm = document.querySelector("form");
const handleRegister = (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm).entries();
  const { email, password, userName } = Object.fromEntries(formData);
  // console.log("keeeee");
  const emailErrorMessage = validateEmail(email);
  const passowrdErrorMessage = validatePassword(password, 6);
  const UserNameErrorMessage = validateUserName(userName);

  if (UserNameErrorMessage) {
    const UserNameErrorMessageElement = document.querySelector(
      ".userName.error-message"
    );
    // show email error message to user
    UserNameErrorMessageElement.innerText = UserNameErrorMessage;
  }

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
  if (
    (emailErrorMessage === " ") &
    (passowrdErrorMessage === " ") &
    (UserNameErrorMessage === " ")
  ) {
    fetch("https://my-brand-server.herokuapp.com/api/v1/users/register", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "Access-Control-Cross-origin": "*",
      },
      body: JSON.stringify({
        userName,
        email,
        password,
      }),
    })
      .then((res) => {
        email === null;
        password === null;
        return res.json();
      })
      .then((data) => {
        if (data.status !== 200) {
          popCreate.innerHTML = `<div class="success"><p class="fade-out ">${data.message}</p></div>`;
          setTimeout(() => {
            const removeElement = document.querySelector(".success");
            removeElement?.remove();
            // window.location.reload();
          }, 3000);
        } else {
          popCreate.innerHTML = `<div class="success"><p class="fade-out ">${data.message}</p></div>`;
          setTimeout(() => {
            const removeElement = document.querySelector(".success");
            removeElement.remove();
            // window.location.reload();
          }, 3000);
          window.location.href("./login.html");
        }
      });
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
const validateUserName = (userName) => {
  if (!userName?.trim()) return "userName is required";
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
loginBtn.addEventListener("click", handleRegister);
