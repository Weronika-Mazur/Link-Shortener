const mobileMenu = document.querySelector("nav");
const mobileMenuIcon = document.querySelector(".menu-icon");

mobileMenuIcon.addEventListener("click", function (e) {
  mobileMenu.classList.toggle("nav-mobile");
});
