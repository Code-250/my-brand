const contactForm = document.querySelector(".contact-inputs");
 let Messages = [];
 const handleContact = (e) => {
   e.preventDefault();
   const contactFormData = new FormData(contactForm).entries();
   const { name, email, message } = Object.fromEntries(contactFormData);
   const guestNameErrorMessage = validateGuestName(name);
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

     function getLocation() {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(showPosition, showError);
       } else {
         console.log("The Browser Does not Support Geolocation");
       }
     }

     async function showPosition(position) {
       const { latitude, longitude } = position.coords;
       const response = await fetch(
         `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=312f08e67dbc4295bfacafdfd8a9d3bc`
       );
       const results = await response.json();
       const userLoc = JSON.stringify(results.results[0].formatted);
       localStorage.setItem("userLocation", userLoc);
     }

     function showError(error) {
       switch (error.code) {
         case error.PERMISSION_DENIED:
           console.log("User denied the request for Geolocation.");
           break;
         case error.POSITION_UNAVAILABLE:
           console.log("Location information is unavailable.");
           break;
         case error.TIMEOUT:
           console.log("The request to get user location timed out.");
           break;
         case error.UNKNOWN_ERROR:
           conole.log("An unknown error occurred.");
           break;
       }
     }

     getLocation();

     function addMessage() {
       const userLocation = JSON.parse(localStorage.getItem("userLocation"));
       const contactMessage = {
         id: Date.now(),
         name: name,
         email: email,
         message: message,
         userLocation: userLocation,
       };
       const getMessages = JSON.parse(localStorage.getItem("contact-message"))
       if (getMessages?.length >= 1) {
         getMessages.push(contactMessage);
         localStorage.removeItem("userLocation");
         document.querySelector("form").reset();

         const saveMessage = "\n" + JSON.stringify(getMessages, "\t", 2);
         localStorage.setItem("contact-message", saveMessage);
       } else {
         Messages.push(contactMessage);
         localStorage.removeItem("userLocation");
         console.warn(Messages);
         document.querySelector("form").reset();

         const Message = "\n" + JSON.stringify(Messages, "\t", 2);
         localStorage.setItem("contact-message", Message);
       }
       
     }
     addMessage();
   }
     

     
 };
 const validateGuestName = (name) => {
   if (!name.trim()) return "name is required";
   return " "
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

