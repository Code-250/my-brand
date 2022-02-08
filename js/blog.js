

const navBar = document.querySelector(".profile-full");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let article = document.querySelector(".blog-article-content");
console.log(id);
const getArticle = JSON.parse(localStorage.getItem("blogList"));
const getUser = JSON.parse(localStorage.getItem("loginCredentials"));
console.log(getUser);
if (getUser) {
  navBar.innerHTML = `  <div class="profile">
            <img src="./assets/rich-bw.jpg" alt="blog owner profile" class="profile-picture"> 
          </div>
          <div class="name-owner">
            <h5 class="owner-name">${getUser.user.userName}</h5>
          </div>`;
}
getArticle?.forEach((element) => {
  if (id == element.id) {
    console.log(id, element.id);
    article.innerHTML = `<div class="blog-image">
          <img src="${element.imageUrl}" alt="dockeriziation working ahead" class="blog-picture">
        </div>
        <div class="blogger-profile-date">
          <div class="blogger-image">
            <img src="./assets/rich-bw.jpg" alt="blog owner profile picture" class="blogger">
          </div>
          <div class="blogger-name-date">
            <h6 class="blogger-name">Rich Munye</h6>
            <p class="date-posted">March, 12, 2021</p>
          </div>
        </div>
        <div class="blog-title-container">
          <h3 class="title-blog">
            ${element.title}
          </h3>
        </div>
        <div class="blog-full-content">
        <p class="blog-content-full">
        ${element.description}
        </p>
        
        </div>
        <div class="blog-final-line">`;
    console.log(element);
  } else {
    console.log("this article does not exist");
  }
});
