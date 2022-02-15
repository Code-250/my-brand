const loginCredentials = JSON.parse(localStorage.getItem("loginCredentials"));
const token = loginCredentials.token;
console.log(token);
const newCredentials = localStorage.getItem("loginCredentials");
const cred = JSON.parse(newCredentials);
console.log(cred.role);
if (cred.role !== "Admin") {
  window.location.replace("../login.html");
}

const section = document.querySelector(".section-content");
// const contact = JSON.parse(contacts);
fetch("https://my-brand-server.herokuapp.com/api/v1/queries/all-messages", {
  method: "get",
  headers: {
    "content-Type": "application/json",
    authorization: `Bearer ${cred.token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data?.data.forEach((message) => {
      section.innerHTML += `<div class="message-card">
              <div class="article-title-date">
                <h3 class="title-articles">${message.guestName}</h3>
                <p class="date-article">${message.email}</p>
                <div class="article-line"></div>
              </div>
              <div class="article-description">
                <p class="blog-content-description">${message.message}</p>
              </div>
               <div class="edit-delete-message">
                <div class="edit-skill">
                  <i class="fas fa-reply"></i>
                </div>
                <div class="location">
                  ${message.userLocation}
                </div>
              </div>
            </div>`;
    });
  })
  .catch((err) => console.log(err));
