// populating data  in the dashboard

const newCredentials = localStorage.getItem("loginCredentials");
const cred = JSON.parse(newCredentials);
if (!newCredentials) {
  window.location.replace("../login.html");
}
const deleteBlo = document.querySelector("#my-delete-model");

// delete article function

const RetrieveArticles = localStorage.getItem("blogList");
const RetrievedObj = JSON.parse(RetrieveArticles);
function deleteArticle(id) {
  console.log(RetrievedObj);
  RetrievedObj.splice(
    RetrievedObj.findIndex((article) => article.id == id),
    1
  );
  console.log(RetrievedObj);
  localStorage.setItem("blogList", JSON.stringify(RetrievedObj));
  window.location.reload();
}

// update an article

const editModelss = document.querySelector("#my-edit-model");

function update(id) {
  editModelss.style.display = "block";

  const imageUpdate = document.querySelector(".article-picture-update");
  imageUpdate.addEventListener("change", () => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrls = reader.result;
      console.log(imageUrls);
      if (imageUrls === null) {
        return "image is required";
      } else {
        localStorage.setItem("recent-image", imageUrls);
        localStorage.setItem("save", imageUrls);
        const imagePreviewUpdate = localStorage.getItem("recent-image");
        console.log(imagePreviewUpdate);

        document
          .querySelector("#image-preview-update")
          .setAttribute("src", imagePreviewUpdate);
        localStorage.removeItem("recent-image");
      }
    };
    reader.readAsDataURL(imageUpdate.files[0]);
  });
  RetrievedObj.forEach((article) => {
    if (article.id == id) {
      const title = (document.querySelector(".title-update").value =
        article.title);
      const body = (document.querySelector(
        ".detailed-update-description"
      ).value = article.description);
      const image = document
        .querySelector("#image-preview-update")
        .setAttribute("src", article.imageUrl);
      const handleUpdateArticle = (e) => {
        e.preventDefault();
        const titleArticle = document.querySelector(".title-update");
        const bodyArticle = document.querySelector(
          ".detailed-update-description"
        );
        if (titleArticle.value.length < 4) {
          const titleUpdateErrorMessageElement = document.querySelector(
            ".title-update-error.error-message"
          );
          titleUpdateErrorMessageElement.style.display = "block";
        }
        if (bodyArticle.value.length < 5) {
          const descriptionErrorMessageElement = document.querySelector(
            ".detailed-update-description.error-message"
          );
          descriptionErrorMessageElement.style.display = "block";
          descriptionErrorMessageElement.innerText = "description is required";
        } else if (
          (bodyArticle.value.length >= 5) &
          (titleArticle.value.length >= 4)
        ) {
          const titleUpdateErrorMessageElement = document.querySelector(
            ".title-update-error.error-message"
          );
          titleUpdateErrorMessageElement.style.display = "none";
          const descriptionErrorMessageElement = document.querySelector(
            ".detailed-update-description.error-message"
          );
          descriptionErrorMessageElement.style.display = "none";
          const imageUrl = localStorage.getItem("save");
          console.log(RetrievedObj, titleArticle.value, bodyArticle.value);

          article.title = titleArticle.value;
          article.description = bodyArticle.value;
          article.imageUrl = imageUrl;

          localStorage.setItem("blogList", JSON.stringify(RetrievedObj));
          editModelss.style.display = "none";
          window.location.reload();
        }
      };
      const updateBtns = document.querySelector(".submit-update-btn");
      updateBtns.addEventListener("click", handleUpdateArticle);
    }
  });
}

const getData = JSON.parse(localStorage.getItem("blogList"));
console.log(getData);
let blogCardElement = document.querySelector(".section-content");
getData?.forEach((element) => {
  let body = element?.description.slice(0, 120) + "....";

  blogCardElement.innerHTML += `
  <div class="article-card">
              <a href="../article.html?id=${element.id}" data-id="${element.id}">
              <div class="article-owner-image">
                <img src="${element.imageUrl}" alt="importance of reading" width="400" height="350"/>
              </div>
              <div class="article-title-date">
                <h3 class="title-articles">${element.title}</h3>
                <p class="date-article">march, 12,2021</p>
                <div class="article-line"></div>
              </div>
              <div class="article-description">
                <p class="blog-content-description">${body}</p>
              </div>
            </a>
               <div class="edit-delete">
                <div class="edit-skill-article" id="edit-skill">
                  <i onclick="update(${element.id})" class="fas fa-pen update"></i>
                </div>
                <div class="delete-blog">
                  <i onclick="deleteArticle(${element.id})" class="fas fa-trash-alt delete"></i>
                </div>
              </div>
            </div>`;
});