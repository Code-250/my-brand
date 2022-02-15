const contactForm = document.querySelector(".contact-inputs");
 let Messages = [];
 const handleContact = (e) => {
   e.preventDefault();
   const contactFormData = new FormData(contactForm).entries();
   const { guestName, email, message } = Object.fromEntries(contactFormData);
   const guestNameErrorMessage = validateGuestName(guestName);
   const contactEmailErrorMessage = validateEmail(email);
   const descriptionErrorMessage = validateDescription(message);

   if (guestNameErrorMessage) {
     const guestNameErrorMessageElement = document.querySelector(
       ".name.error-message"
     );
     guestNameErrorMessageElement.innerText = guestNameErrorMessage;
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
   }
   if (
     (guestNameErrorMessage === " ") &
     (contactEmailErrorMessage === " ") &
     (descriptionErrorMessage === " ")
   ) {
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

     const fetchApi = async () => {
       const res = await fetch(
         "https://my-brand-server.herokuapp.com/api/v1/queries/send-message",
         {
           method: "POST",
           headers: {
             "content-Type": "application/json",
             "Access-Control-Cross-orgin": "*",
           },
           body: JSON.stringify({
             guestName,
             email,
             message,
           }),
         }
       );
        await res.json();
     };
     fetchApi();
   }
     

     
 };

 const validateGuestName = (guestName) => {
   if (!guestName.trim()) return "guestName is required";
 };
 const validateEmail = (email) => {
   if (!email.trim()) return "email is required";
   const emailValidated = /\S+@\S+\.\S+/;
   if (!emailValidated.test(email)) return "please enter a valid email";
   return " "
 };

 const validateDescription = (message) => {
   if (!message.trim()) return "Message is required";
   return " "
 };
 const contactSubmitBtn = document.querySelector(".contact-btns");
 document.addEventListener("DOMContentLoaded", () => {
   contactSubmitBtn.addEventListener("click", handleContact);
 });

