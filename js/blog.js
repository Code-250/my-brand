const navBar = document.querySelector(".profile-full");
const showLikes = document.querySelector(".likes-data");
const liked = document.querySelector(".fa-thumbs-up");
const SubmitComments = document.querySelector(".comment-btn");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let article = document.querySelector(".blog-article-content");
fetch(`https://my-brand-server.herokuapp.com/api/v1/posts/${id}`, {
  method: "get",
  headers: {
    "content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    article.innerHTML = `<div class="blog-image">
          <img src="${data.data.imageUrl}" alt="dockeriziation working ahead" class="blog-picture">
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
            ${data.data.title}
          </h3>
        </div>
        <div class="blog-full-content">
        <p class="blog-content-full">
        ${data.data.content}
        </p>
        
        </div>
        <div class="blog-final-line">`;
    showLikes.innerText = `${data.data.likes} likes`;
  })
  .catch((err) => console.log(err));
liked.addEventListener("click", async () => {
  const res = await fetch(
    `https://my-brand-server.herokuapp.com/api/v1/post/${id}/likes`,
    {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
    }
  );
  const likes = await res.json();
  console.log(likes);
  showLikes.innerText = `${likes.data.likes} likes`;
});

const getAllComments = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const assignData = document.querySelector(".comments-container");
  const id = urlParams.get("id");
  const res2 = await fetch(
    `https://my-brand-server.herokuapp.com/api/v1/${id}/all-comments`,
    {
      method: "get",
    }
  );
  const CommentsRetrieved = await res2.json();
  console.log(CommentsRetrieved);
  const commentsList = CommentsRetrieved.data.comments;
  commentsList?.map((comment) => {
    assignData.innerHTML += `
    <div class="comment-guest">
        <div class="guest-profile">
          <img src="./assets/rich-bw.jpg" alt="guest profile picture" class="guest">
        </div>

      <div class="comment-holder">
        <div class="guest-comment">
          <h6 class="guest-name">${comment.name}</h6>
          <p class="guest-dot">.</p>
          <p class="date">Dec, 2, 2021</p>
        </div>
        <div class="comment-description">
          <p class="comment">
            ${comment.comment}
          </p>
        </div>
      </div>
      </div>`;
  });
};
getAllComments();

const createComment = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const name = document.querySelector(".names");
  const comment = document.querySelector("#comment");
  const res3 = await fetch(
    `https://my-brand-server.herokuapp.com/api/v1/${id}/comment`,
    {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        comment: comment.value,
      }),
    }
  );
  const data = await res3.json();
  console.log(data);
};

SubmitComments.addEventListener("click", createComment);
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

    console.log(element);
  } else {
    console.log("this article does not exist");
  }
});
