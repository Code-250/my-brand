const contactForm = document.querySelector(".contact-inputs");
 let Messages = [];
 const handleContact = (e) => {
   e.preventDefault();
   const contactFormData = new FormData(contactForm).entries();
   const { name, email, message } = Object.fromEntries(contactFormData);
   const guestNameErrorMessage = validateGuestName(name);
   const contactEmailErrorMessage = validateEmail(email);
   const descriptionErrorMessage = validateDescription(message);

   if (
     guestNameErrorMessage &&
     contactEmailErrorMessage &&
     descriptionErrorMessage
   ) {
     const guestNameErrorMessageElement = document.querySelector(
       ".name.error-message"
     );
     guestNameErrorMessageElement.classList.remove("hidden");
     guestNameErrorMessageElement.innerText = guestNameErrorMessage;
     const contactEmailErrorMessageElement = document.querySelector(
       ".email.error-message"
     );
     contactEmailErrorMessageElement.innerText = contactEmailErrorMessage;
     contactEmailErrorMessageElement.classList.remove("hidden");
     const descriptionErrorMessageElement = document.querySelector(
       ".text-area.error-message"
     );
     descriptionErrorMessageElement.classList.remove("hidden");
     descriptionErrorMessageElement.innerText = descriptionErrorMessage;
   } else {
     const guestNameErrorMessageElement = document.querySelector(
       ".name.error-message"
     );
     guestNameErrorMessageElement.classList.add("hidden");
     guestNameErrorMessageElement.innerText = " ";

     const contactEmailErrorMessageElement = document.querySelector(
       ".email.error-message"
     );
     contactEmailErrorMessageElement.classList.add("hidden");

     const descriptionErrorMessageElement = document.querySelector(
       ".text-area.error-message"
     );
     descriptionErrorMessageElement.classList.add("hidden");

     function addMessage() {
       const contactMessage = {
         id: Date.now(),
         name: name,
         email: email,
         message: message,
       };
       Messages.push(contactMessage);
       console.warn(Messages);
       document.querySelector("form").reset();

       // console.log(Messages);

       const Message = "\n" + JSON.stringify(Messages, "\t", 2);
       console.log(Message);
       localStorage.setItem("contact-message", Message);
     }
     addMessage();
   }
 };
 const validateGuestName = (name) => {
   if (!name.trim()) return "name is required";
 };
 const validateEmail = (email) => {
   if (!email.trim()) return "email is required";
   const emailValidated = /\S+@\S+\.\S+/;
   if (!emailValidated.test(email)) return "please enter a valid email";
 };

 const validateDescription = (message) => {
   if (!message.trim()) return "Message is required";
 };
 const contactSubmitBtn = document.querySelector(".contact-btns");
 document.addEventListener("DOMContentLoaded", () => {
   contactSubmitBtn.addEventListener("click", handleContact);
 });

