const model = document.querySelector("#my-model");
const editModel = document.querySelector("#my-edit-model");
const createBlog = document.querySelector("#create-blog");
const editBlog = document.querySelector("#edit-skill");
const editBlog1 = document.querySelector("#edit-skill1");
const editBlog2 = document.querySelector("#edit-skill2");
const close = document.getElementsByClassName("close")[0];
const deleteBlog = document.querySelector("#my-delete-model");
const deleteBtn = document.querySelector(".remove-skill");
const comfirm = document.querySelector(".comfirm");
const cancelDelete = document.querySelector(".cancel-delete");

createBlog.addEventListener("click", function () {
  model.style.display = "block";
});
close.onclick = function () {
  model.style.display = "none";
};
window.onclick = function () {
  if (event.target == model) {
    model.style.display = "none";
  }
};
// edit blog

editBlog.addEventListener("click", function () {
  editModel.style.display = "block";
  console.log("hi dear");
});

editBlog1.addEventListener("click", function () {
  editModel.style.display = "block";
  console.log("hi dear");
});

editBlog2.addEventListener("click", function () {
  editModel.style.display = "block";
  console.log("hi dear");
});
close.onclick = function () {
  editModel.style.display = "none";
  editModel.style.ransition = "0.4s ease-in-out";
};
window.onclick = function () {
  if (event.target == editModel) {
    editModel.style.display = "none";
  }
};
// delete a blog

deleteBtn.addEventListener("click", function () {
  deleteBlog.style.display = "block";
});
close.onclick = function () {
  deleteBlog.style.display = "none";
};

comfirm.addEventListener("click", function () {
  deleteBlog.style.display = "none";
});
cancelDelete.addEventListener("click", function () {
  deleteBlog.style.display = "none";
});
