const contactForm = document.querySelector(".contact-inputs");
const handleContact = (e) => {
  e.preventDefault();
  const contactFormData = new FormData(contactForm).entries();
  const { name, email, description } = Object.fromEntries(contactFormData);
  const guestNameErrorMessage = validateGuestName(name);
  const contactEmailErrorMessage = validateEmail(email);
  const descriptionErrorMessage = validateDescription(description);

  if (guestNameErrorMessage) {
    const guestNameErrorMessageElement = document.querySelector(
      ".name.error-message"
    );
    guestNameErrorMessageElement.innerText = guestNameErrorMessage;
  }
  if (contactEmailErrorMessage) {
    const contactEmailErrorMessageElement = document.querySelector(
      ".email.error-message"
    );
    contactEmailErrorMessageElement.innerText = contactEmailErrorMessage;
  }
  if (descriptionErrorMessage) {
    const descriptionErrorMessageElement = document.querySelector(
      ".text-area.error-message"
    );
    descriptionErrorMessageElement.innerText = descriptionErrorMessage;
  }
};
const validateGuestName = (name) => {
  if (!name) return "name is required";
  return " ";
};
const validateEmail = (email) => {
  if (!email) return "email is required";
  const emailValidated = /\S+@\S+\.\S+/;
  if (!emailValidated.test(email)) {
    return "please enter a valid email";
  }

  return " ";
};

const validateDescription = (description) => {
  if (!description) return "Message is required";
};
const contactSubmitBtn = document.querySelector(".contact-btns");
contactSubmitBtn.addEventListener("click", handleContact);
