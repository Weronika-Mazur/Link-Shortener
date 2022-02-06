const mobileMenu = document.querySelector("nav");
const mobileMenuIcon = document.querySelector(".menu-icon");

const shortenerForm = document.querySelector(".shortener-form form");
const shortenerLinks = document.querySelector(".shortener-links");

mobileMenuIcon.addEventListener("click", function (e) {
  mobileMenu.classList.toggle("nav-mobile");
});

const shortenAPIUrl = "https://api.shrtco.de/v2/shorten";

function copyLinkButton(e) {
  const target = e.currentTarget;

  const text = target.previousSibling.textContent;

  navigator.clipboard.writeText(text).then((result) => {
    changeButtonToCopied(result, target);
  });
}

function changeButtonToCopied(e, target) {
  const copyButtonsList = document.querySelectorAll(
    ".shortened-container button"
  );

  for (element of copyButtonsList) {
    element.classList.remove("copied");
    element.textContent = "Copy";
  }

  target.classList.add("copied");
  target.textContent = "Copied!";
}

function generateHTML(url) {
  console.log(url);
  if (url.ok) {
    const linkItem = document.createElement("div");
    linkItem.classList.add("shortener-links-items");

    const originalURL = document.createElement("p");
    originalURL.classList.add("original-link");
    const linkContainer = document.createElement("div");
    linkContainer.classList.add("shortened-container");

    const shortenedURL = document.createElement("p");
    shortenedURL.classList.add("shortened-link");
    const copyButton = document.createElement("button");
    copyButton.classList.add("button");
    copyButton.classList.add("button-squared");

    copyButton.addEventListener("click", copyLinkButton);

    originalURL.append(url.result.original_link);
    shortenedURL.append(url.result.full_short_link);
    copyButton.append("Copy");

    linkContainer.append(shortenedURL, copyButton);

    linkItem.append(originalURL, linkContainer);

    shortenerLinks.append(linkItem);
  }
}

shortenerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const formProps = Object.fromEntries(formData);

  const url = `${shortenAPIUrl}?url=${formProps["url-input"]}`;
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((link) => {
      generateHTML(link);
    });
});
