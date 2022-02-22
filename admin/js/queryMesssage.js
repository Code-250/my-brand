const popCreate = document.querySelector(".popupCreate");

const newCredentials = localStorage.getItem("loginCredentials");
const cred = JSON.parse(newCredentials);
if (cred?.role !== "Admin") {
  window.location.replace("../login.html");
}

const contacts = localStorage.getItem("contact-message");
const section = document.querySelector(".section-content");
const contact = JSON.parse(contacts);
const getQueries = async () => {
  const res = await fetch(
    "https://my-brand-server.herokuapp.com/api/v1/queries/all-messages",
    {
      method: "get",
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${cred.token}`,
      },
    }
  );
  const data = await res.json();
  if (data.status !== 200) {
    popCreate.innerHTML = `<div class="success"><p class="fade-out ">${data.message}</p></div>`;
    setTimeout(() => {
      const removeElement = document.querySelector(".success");
      removeElement.remove();
      // window.location.reload();
    }, 3000);
  } else {
    popCreate.innerHTML = `<div class="success"><p class="fade-out ">${data.message}</p></div>`;
    setTimeout(() => {
      const removeElement = document.querySelector(".success");
      removeElement.remove();
      // window.location.reload();
    }, 3000);
    data.data.forEach((message) => {
      console.log(message);
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
                  Kigali-Rwanda
                </div>
              </div>
            </div>`;
    });
  }
};
getQueries();
