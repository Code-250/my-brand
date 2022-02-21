// populating data  in the dashboard

const newCredentials = localStorage.getItem("loginCredentials");
const loginData = JSON.parse(newCredentials);

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
      if (imageUrls === null) {
        return "image is required";
      } else {
        localStorage.setItem("recent-image", imageUrls);
        localStorage.setItem("save", imageUrls);
        const imagePreviewUpdate = localStorage.getItem("recent-image");

        document
          .querySelector("#image-preview-update")
          .setAttribute("src", imagePreviewUpdate);
        localStorage.removeItem("recent-image");
      }
    };
    reader.readAsDataURL(imageUpdate.files[0]);
  });

  fetch(`https://my-brand-server.herokuapp.com/api/v1/posts/${id}`, {
    method: "get",
    headers: {
      "Access-Control-Cross-origin": "*",
      "content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "=======");
      if (!newCredentials) {
        console.log("you are not logged in please loggIn");
      } else {
        const title = (document.querySelector(".title-update").value =
          data.data[0].title);
        const content = (document.querySelector(
          ".detailed-update-description"
        ).value = data.data[0].content);
        const image = document
          .querySelector("#image-preview-update")
          .setAttribute("src", data.data[0].imageUrl);
        const filesUpdate = document.querySelector(".article-picture-update");

        const updated = document.querySelector(".submit-update-btn");
        updated.addEventListener("click", () => {
          const title = document.querySelector(".title-update").value;
          const content = document.querySelector(
            ".detailed-update-description"
          ).value;
          const updateData = new FormData();
          updateData.append("title", title);
          updateData.append("content", content);
          updateData.append("imageUrl", filesUpdate.files[0]);
          const idUpdate = data.data[0]._id;
          console.log(loginData.token);
          console.log(idUpdate);
          fetch(
            `https://my-brand-server.herokuapp.com/api/v1/posts/${idUpdate}`,
            {
              method: "put",
              headers: {
                authorization: `Bearer ${loginData.token}`,
              },
              body: updateData,
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("log to the console the updated data", data);
              window.location.reload();
            });
        });
      }
    })
    .catch((err) => console.log(err));
  RetrievedObj?.forEach((article) => {
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
fetch("https://my-brand-server.herokuapp.com/api/v1/posts", {
  method: "get",
  headers: {
    "Access-Control-Cross-origin": "*",
    "content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data?.data?.forEach((element) => {
      let body = element?.content?.slice(0, 120) + "....";
      const id = element._id;
      console.log(id);
      blogCardElement.innerHTML += `
            <div class="article-card">
              <a href="../article.html?id=${element._id}" data-id="${element._id}">
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
                  <i onclick="update(id)" class="fas fa-pen update"></i>
                </div>
                <div class="delete-blog">
                  <i onclick="deleteArticle(${element._id})" class="fas fa-trash-alt delete"></i>
                </div>
              </div>
            </div>`;
    });
  })
  .catch((err) => console.log(err));

// fetch();
