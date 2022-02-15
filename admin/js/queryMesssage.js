const loginCredentials = JSON.parse(localStorage.getItem("loginCredentials"));
const token = loginCredentials.token;
console.log(token);

const section = document.querySelector(".section-content");
const queries = async () => {
  const getQueries = await fetch(
    "https://my-brand-server.herokuapp.com/api/v1/queries/all-messages",
    {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await getQueries.json();
  console.log(data);
  const contacts = data.data;
  contacts.forEach((message) => {
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
};
queries();
