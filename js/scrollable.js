const sections = document.querySelectorAll("section");
const scrollTopper = document.querySelector(".back-to-top");
const scrollToAbout = document.querySelector(".view-work");
const navLink = document.querySelectorAll(".nav-container ul li");
const mobileLinks = document.querySelectorAll(".nav-links-bars ul a li");
const hambuger = document.querySelector(".fa-bars");
const scrollToContact = document.querySelector(".contact-link");
const scrollToBlogs = document.querySelector(".blog-link");
const scrollToProjects = document.querySelector(".portfolio-link");
const scrollAbout = document.querySelector(".about-link");
const scrollHome = document.querySelector(".home-link");

window.onscroll = () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });
  navLink.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });
};

// scroll to top
scrollTopper.addEventListener("click", () => {
  window.scroll({ top: 0, left: 0, behavior: "smooth" }), false;
});
// scroll to abuot

scrollToAbout.addEventListener("click", () => {
  window.scroll({ top: 1650, left: 0, behavior: "smooth" }), false;
});
scrollToContact.addEventListener("click", function () {
  window.scroll({ top: 3600, left: 0, behavior: "smooth" });
});
scrollToBlogs.addEventListener("click", function () {
  window.scroll({ top: 2350, left: 0, behavior: "smooth" });
});
scrollToProjects.addEventListener("click", function () {
  window.scroll({ top: 1650, left: 0, behavior: "smooth" });
});
scrollAbout.addEventListener("click", function () {
  window.scroll({ top: 750, left: 0, behavior: "smooth" });
});
scrollHome.addEventListener("click", function () {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
});
hambuger.addEventListener("click", () => {
  const menu = document.querySelector(".nav-hidden");
  if (menu.style.display === "block") {
    menu.style.display = "none";
    menu.style.transition = "0.8s ease-in-out";
  } else {
    menu.style.display = "block";
    menu.style.trnsition = "0.8s ease-in-out";
  }
});
