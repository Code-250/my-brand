const commentData = document.querySelector("form");
const SubmitComment = document.querySelector(".comment-btn");

const getBlogsData = JSON.parse(localStorage.getItem("blogList"));
console.log(getBlogsData);
const Params = new URLSearchParams(window.location.search);
const articleId = Params.get("id");
getBlogsData?.forEach((element) => {
  if (element.id == articleId) {
    const handleComments = (e) => {
      e.preventDefault();
      const formData = new FormData(commentData).entries();
      const { name, comment } = Object.fromEntries(formData);
      const NameErrorMessage = validateName(name);
      const CommentErrorMessage = validateCommentField(comment);

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
        const articleComments = {
          name,
          comment,
        };
        element.comments.push(articleComments);
        const saveData = JSON.stringify(getBlogsData);
        localStorage.setItem("blogList", saveData);
        document.querySelector("form").reset();
        console.log(getBlogsData);
      }
      getComments();
    };
    const validateName = (name) => {
      if (!name.trim()) return "Name field is required";
      return " ";
    };
    const validateCommentField = (comment) => {
      if (!comment.trim()) return "Comment field is required";
      return " ";
    };
    const getComments = () => {
      const assignData = document.querySelector(".comments-container");
      let commentCounter = 0;
      element.comments.forEach((comment) => {
        commentCounter++;
        element.numberOfComments = commentCounter;

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
          
        </div>
        `;
      });
      localStorage.setItem("blogList", JSON.stringify(getBlogsData));
      console.log(element);
    };

    getComments();
    SubmitComment.addEventListener("click", handleComments);

    const showLikes = document.querySelector(".likes-data");
    const liked = document.querySelector(".fa-thumbs-up");
    showLikes.innerText = `${element.like === null ? 0 : element.like} likes`;
    liked.addEventListener("click", () => {
      element.like++;
      const articleString = JSON.stringify(getBlogsData);
      localStorage.setItem("blogList", articleString);
      showLikes.innerText = `${element.like} likes`;
    });
  } else {
    console.log("dear god");
  }
});
