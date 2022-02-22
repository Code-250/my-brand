// populating data  in the dashboard

const getData = JSON.parse(localStorage.getItem("blogList"));
console.log(getData);
let blogCardElement = document.querySelector(".blog-list");
fetch("https://my-brand-server.herokuapp.com/api/v1/posts", {
  method: "get",
  headers: {
    "content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    const retrievedData = data.data;
    retrievedData?.map((article) => {
      let body = article?.content?.slice(0, 120) + "....";
      blogCardElement.innerHTML += `
           <a href="./article.html?id=${article._id}" data-id=${article._id}> 
               <div class="blog-card">
              <div class="blog-image">
                <img src="${article.imageUrl}" alt="importance of reading" width="400" height="350"/>
              </div>
              <div class="blog-title-date">
                <h3 class="title-blog">${article.title}</h3>
                <p class="date">march, 12,2021</p>
                <div class="blog-line"></div>
              </div>
              <div class="blog-description">
                <p class="blog-content-description">${body}</p>
              </div>
               <div class="likes-comment-view">
                <div class="likes">
                  <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                  <p class="likes-data">${article.likes} likes</p>
                </div>
                <div class="comments">
                  <i class="fa fa-comments" aria-hidden="true"></i>
                  <p class="comments-data">${article.commentsCount} comments</p>
                </div>
              </div>
            </div>
            </a>`;
    });
  })
  .catch((err) => {
    console.log(err, "this is not working here");
  });


