import addLinks from "./addLinks.js";
import removeTags from "./removeTags.js";
import settings from "./settings.js";
import { instructions } from "./instructions.js";
import { linksAreaContent } from "./linksAreaContent.js";
import { settingsArea } from "./settingsArea.js";

document.querySelector("#instructions-area").innerHTML = instructions;
document.querySelector("#links-area").innerHTML = linksAreaContent;
document.querySelector("#settings-area").innerHTML = settingsArea;
const textToLinkArea = document.querySelector("#text-to-link");
const outputTextArea = document.querySelector("#output-text");
const previewTextArea = document.querySelector("#preview-text");
const linkUpButton = document.querySelector("#link-up");
const copyButton = document.querySelector("#copy-output");
const clearButton = document.querySelector("#clear-input");

let textToLink = textToLinkArea.value;

settings();

// Link Up button
linkUpButton.addEventListener("click", () => {
  textToLink = textToLinkArea.value;
  const isAllTranslations = JSON.parse(localStorage.isAllTranslations);
  const isNewTab = JSON.parse(localStorage.isNewTab);
  const format = localStorage.formatOptions;

  outputTextArea.innerText = addLinks({ textToLink, format, isAllTranslations, isNewTab });

  // this only affects the preview text
  if (localStorage.formatOptions === "html") {
    const previewTextToLink = removeTags(textToLink).replace(/\n/g, "<br>");
    const linkedUpText = addLinks({ textToLink: previewTextToLink, format: "html", isAllTranslations, isNewTab: true });
    previewTextArea.innerHTML = linkedUpText;
  } else {
    previewTextArea.innerHTML = "Please select Format: HTML if you want to see a preview.";
  }

  const actionMessage = document.querySelector("#action-message");
  actionMessage.innerText = "Linked up!";
  actionMessage.classList.add("fade");
  setTimeout(() => {
    actionMessage.innerText = "";
    actionMessage.classList.remove("fade");
  }, 1900);
});

// copy button
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(outputTextArea.innerText);
  const actionMessage = document.querySelector("#action-message");
  actionMessage.classList.add("fade");
  actionMessage.innerText = "Copied!";
  setTimeout(() => {
    actionMessage.innerText = "";
    actionMessage.classList.remove("fade");
  }, 1900);
});

clearButton.addEventListener("click", () => {
  textToLinkArea.classList.add("fade-out");
  previewTextArea.classList.add("fade-out");
  outputTextArea.classList.add("fade-out");

  setTimeout(() => {
    textToLinkArea.value = "";
    previewTextArea.innerHTML = "";
    outputTextArea.innerText = "";
    textToLinkArea.classList.remove("fade-out");
    previewTextArea.classList.remove("fade-out");
    outputTextArea.classList.remove("fade-out");
  }, 500);
});
