const contacts = localStorage.getItem("contact-message");
const section = document.querySelector(".section-content");
const contact = JSON.parse(contacts);
console.log(contact);
contact.forEach((message) => {
  section.innerHTML += `<div class="message-card">
              <div class="article-title-date">
                <h3 class="title-articles">${message.name}</h3>
                <p class="date-article">${message.email}</p>
                <div class="article-line"></div>
              </div>
              <div class="article-description">
                <p class="blog-content-description">${message.message}</p>
              </div>
               <div class="edit-delete">
                <div class="edit-skill">
                  <i class="fas fa-reply"></i>
                </div>
              </div>
            </div>`;
  console.log(message);
});
