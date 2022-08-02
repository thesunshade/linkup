import { removeTags } from "./removeTags.js";

const textToLink = document.querySelector("#text-to-link");
const outputTextArea = document.querySelector("#output-text");
const previewTextArea = document.querySelector("#preview-text");
const linkUpButton = document.querySelector("#link-up");
const copyButton = document.querySelector("#copy-output");
const singleNumberBooks = ["dn", "mn", "kp", "dhp"];
const separators = [".", ":"];

/* Format Options Setting */
const formatOptionsSetting = document.querySelector("#format-button-area");
// if setting is stored in localStorage, make frontend match setting
if (localStorage.formatOptions) {
  let format = localStorage.formatOptions;
  var formatOptions = document.getElementsByName("format");
  for (let i = 0; i < formatOptions.length; i++) {
    if (format === formatOptions[i].value) {
      formatOptions[i].checked = true;
      i = formatOptions.length;
    }
  }
}
// when setting is changed, change it in localStorage
formatOptionsSetting.addEventListener("click", () => {
  localStorage.formatOptions = getFormatValue();
});

/* Translation Setting */
const allTranslationsSetting = document.querySelector("#all-translations");
// if setting is stored in localStorage, make frontend match setting
if (localStorage.allTranslations) {
  allTranslationsSetting.checked = JSON.parse(localStorage.allTranslations);
}
// when setting is changed, change it in localStorage
allTranslationsSetting.addEventListener("click", () => {
  localStorage.allTranslations = allTranslationsSetting.checked;
});

/* New Tab Setting */
const newTabSetting = document.querySelector("#new-tab");
// if setting is stored in localStorage, make frontend match setting
if (localStorage.newTab) {
  newTabSetting.checked = JSON.parse(localStorage.newTab);
}
// when setting is changed, change it in localStorage
newTabSetting.addEventListener("click", () => {
  localStorage.newTab = newTabSetting.checked;
});

// Link Up button
linkUpButton.addEventListener("click", e => {
  outputTextArea.innerText = addLinks(textToLink.value);

  // this only affects the preview text
  if (getFormatValue() === "html") {
    previewTextArea.innerHTML = addLinks(removeTags(textToLink.value).replace(/\n/g, "<br>")).replace(
      `<a href=`,
      `<a rel="noreferrer" target="_blank" href=`
    );
  } else {
    previewTextArea.innerHTML = "";
  }

  const copyNotice = document.querySelector("#copy-notice");
  copyNotice.innerText = "Linked up!";
  copyNotice.classList.add("fade");
  setTimeout(() => {
    copyNotice.innerText = "";
    copyNotice.classList.remove("fade");
  }, 1900);
});

// copy button
copyButton.addEventListener("click", e => {
  navigator.clipboard.writeText(outputTextArea.innerText);
  const copyNotice = document.querySelector("#copy-notice");
  copyNotice.classList.add("fade");
  copyNotice.innerText = "Copied!";
  setTimeout(() => {
    copyNotice.innerText = "";
    copyNotice.classList.remove("fade");
  }, 1900);
});

function getFormatValue() {
  let format = "";
  var formatOptions = document.getElementsByName("format");
  for (let i = 0; i < formatOptions.length; i++) {
    if (formatOptions[i].checked) {
      format = formatOptions[i].value;
    }
  }
  return format;
}

// this is the main function that does the linking
// it accepts the entire block of text to link and returns the linked up text
function addLinks(textToLink) {
  const allTranslations = document.querySelector("#all-translations").checked;
  const newTab = document.querySelector("#new-tab").checked;
  let openInNewTab = "";

  function replacer(match, p1, p2, p3, p4) {
    let book = p1.toLowerCase();
    let firstNumber = p2;
    let separator = p3;
    let secondNumber = p4;
    let notSeparator = "";
    if (singleNumberBooks.includes(book) && separators.includes(separator)) {
      match = match.slice(0, -1);
      notSeparator = separator;
    }

    let translator = "/en/sujato";
    if (allTranslations) {
      translator = "";
    }

    if (book === "iti" && secondNumber) {
      separator = "";
      firstNumber = parseInt(firstNumber, 10);
      secondNumber = parseInt(secondNumber, 10);
      switch (firstNumber) {
        case 1:
          firstNumber = secondNumber;
          break;
        case 2:
          firstNumber = secondNumber + 27;
          break;
        case 3:
          firstNumber = secondNumber + 49;
          break;
        case 4:
          firstNumber = secondNumber + 99;
          break;
      }
      secondNumber = "";
    }

    if (book === "ud" && !secondNumber) {
      firstNumber = parseInt(firstNumber, 10);
      firstNumber = Math.floor(firstNumber / 10) + 1;
      secondNumber = firstNumber % 10;
    }

    let returnString = "";
    let format = getFormatValue();

    if (book === "sn" && secondNumber === "") {
      translator = "";
    }

    switch (format) {
      case "markdown":
        returnString = `[${match}](https://suttacentral.net/${book}${firstNumber}${
          secondNumber ? `.${secondNumber}` : ""
        }${translator})${notSeparator}`;
        break;
      case "phpbb":
        returnString = `[url=https://suttacentral.net/${book}${firstNumber}${
          secondNumber ? `.${secondNumber}` : ""
        }${translator}]${match}[/url]${notSeparator}`;
        break;
      case "html":
        returnString = `<a href="https://suttacentral.net/${book}${firstNumber}${
          secondNumber ? `.${secondNumber}` : ""
        }${translator}" ${openInNewTab}>${match}</a>${notSeparator}`;
        break;
    }

    return returnString;
  }

  if (newTab) {
    openInNewTab = `rel="noreferrer" target="_blank"`;
  }

  // and this is what does it.

  //no range allowed, no chapters
  textToLink = textToLink.replace(/\b(mn|dn|kp|khp|dhp) ?(\d+)()()\b/gi, replacer);

  //ranges allowed and chapters
  textToLink = textToLink.replace(/\b(sn|an) ?(\d+)(\.|\:*)(\d*-*\d*)\b/gi, replacer);

  // chapters and no ranges
  textToLink = textToLink.replace(/\b(iti|itv|ud|snp|vv|pv|thag|thig) ?(\d+)(\.|\:*)(\d*)\b/gi, replacer);

  return textToLink;
}
