const adminHambuger = document.querySelector(".fa-bars");

adminHambuger.addEventListener("click", function () {
  const adminMenu = document.querySelector(".sidebar-holder");
  if (adminMenu.style.display === "block") {
    adminMenu.style.display = "none";
    adminMenu.style.transition = "0.4s ease-in-out";
  } else {
    adminMenu.style.display = "block";
    adminMenu.style.transition = "0.4s eas-in-out";
    adminMenu.style.position = "fixed";
    adminMenu.style.top = "75px";
  }
});
