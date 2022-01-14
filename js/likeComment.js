const commentData = document.querySelector("form");
const SubmitComment = document.querySelector(".comment-btn");
const comments = [];
const handleComments = (e) => {
  e.preventDefault();
  const formData = new FormData(commentData).entries();
  const { name, comment } = Object.fromEntries(formData);
  const NameErrorMessage = validateName(name);
  const CommentErrorMessage = validateCommentField(comment);
  //  if (emailErrorMessage) {
  //   // select the email form field message element
  //   const emailErrorMessageElement = document.querySelector(
  //     ".email.error-message"
  //   );
  //   // show email error message to user
  //   emailErrorMessageElement.innerText = emailErrorMessage;
  // }

  // if (passowrdErrorMessage) {
  //   // select the email form field message element
  //   const passwordErrorMessageElement = document.querySelector(
  //     ".password.error-message"
  //   );
  //   // show password error message to user
  //   passwordErrorMessageElement.innerText = passowrdErrorMessage;
  // }
  // if ((emailErrorMessage === " ") & (passowrdErrorMessage === " ")) {

  // }
  if (NameErrorMessage) {
    const NameErrorMessageElement = document.querySelector(
      ".name.error-message"
    );
    NameErrorMessageElement.innerText = NameErrorMessage;
  }
  if (CommentErrorMessage) {
    const CommentErrorMessageElement = document.querySelector(
      ".comment.error-message"
    );
    CommentErrorMessageElement.innerText = CommentErrorMessage;
  }
  if ((NameErrorMessage === " ") & (CommentErrorMessage === " ")) {
    const saveToLocalStorage = (name, comment) => {
      const commentArticle = {
        id: Date.now(),
        name,
        comment,
      };

      comments.push(commentArticle);

      return comments;
    };
    saveToLocalStorage(name, comment);
    const saveData = JSON.stringify(comments);
    localStorage.setItem("comments", saveData);
    console.log(comments);
  }
  getComments();
};
const validateName = (name) => {
  if (!name.trim()) return "Password is required";
  return " ";
};
const validateCommentField = (comment) => {
  if (!comment.trim()) return "Password is required";
  return " ";
};
const getComments = () => {
  const retrieveComments = localStorage.getItem("comments");
  const retrievedComments = JSON.parse(retrieveComments);

  const assignData = document.querySelector(".comments-container");
  retrievedComments.forEach((element) => {
    assignData.innerHTML += `<div class="comment-guest">
          <div class="guest-profile">
            <img src="./assets/rich-bw.jpg" alt="guest profile picture" class="guest">
          </div>

        <div class="comment-holder">
          <div class="guest-comment">
            <h6 class="guest-name">${element.name}</h6>
            <p class="guest-dot">.</p>
            <p class="date">Dec, 2, 2021</p>
          </div>
          <div class="comment-description">
            <p class="comment">
              ${element.comment}
            </p>
          </div>
        </div>
          
        </div>`;
  });
};
getComments();
SubmitComment.addEventListener("click", handleComments);
const NumberOfLikes = () => {
  const showLikes = document.querySelector(".likes-data");
  const likeObject = localStorage.getItem("likes");
  const getlikes = JSON.parse(likeObject);
  console.log(getlikes);
  showLikes.innerText = `${getlikes === null ? 0 : getlikes} likes`;
};
NumberOfLikes();
const retrivedObject = localStorage.getItem("likes");
const retriveLikes = JSON.parse(retrivedObject);
retriveLikes === 0 || !localStorage.getItem("likes")
  ? localStorage.setItem("likes", 0)
  : "";

const liked = document.querySelector(".fa-thumbs-up");
let likes = 0;
liked.addEventListener("click", () => {
  likes++;
  localStorage.setItem("likes", likes);
  NumberOfLikes();
  console.log(likes);
});
