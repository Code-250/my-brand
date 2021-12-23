const sections = document.querySelectorAll("section");
const scrollTopper = document.querySelector(".back-to-top");
const scrollToAbout = document.querySelector(".view-work");
const navLink = document.querySelectorAll(".nav-container ul a li");
const mobileLinks = document.querySelectorAll(".nav-links-bars ul a li");
const hambuger = document.querySelector(".fa-bars");

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
