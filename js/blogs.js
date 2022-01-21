// populating data  in the dashboard

const getData = JSON.parse(localStorage.getItem("blogList"));
console.log(getData);
let blogCardElement = document.querySelector(".blog-list");

getData?.forEach((element) => {
  let body = element?.description.slice(0, 120) + "....";

  blogCardElement.innerHTML += `
           <a href="./article.html?id=${element.id}" data-id=${element.id}> 
               <div class="blog-card">
              <div class="blog-image">
                <img src="${element.imageUrl}" alt="importance of reading" width="400" height="350"/>
              </div>
              <div class="blog-title-date">
                <h3 class="title-blog">${element.title}</h3>
                <p class="date">march, 12,2021</p>
                <div class="blog-line"></div>
              </div>
              <div class="blog-description">
                <p class="blog-content-description">${body}</p>
              </div>
               <div class="likes-comment-view">
                <div class="likes">
                  <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                  <p class="likes-data">${element.like} likes</p>
                </div>
                <div class="comments">
                  <i class="fa fa-comments" aria-hidden="true"></i>
                  <p class="comments-data">${element.numberOfComments} comments</p>
                </div>
              </div>
            </div>
            </a>`;
});
