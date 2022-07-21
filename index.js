const textToLink = document.querySelector("#text-to-link");
const outputTextArea = document.querySelector("#output-text");
const linkUpButton = document.querySelector("#link-up");
const copyButton = document.querySelector("#copy-output");
const formatOption = document.querySelector("#format-button-area");
const singleNumberBooks = ["dn", "mn", "kp", "dhp"];
const separators = [" ", ".", ":"];

linkUpButton.addEventListener("click", e => {
  outputTextArea.innerText = addLinks(textToLink.value);
});

copyButton.addEventListener("click", e => {
  navigator.clipboard.writeText(outputTextArea.innerText);
});

function replacer() {}

function addLinks(textToLink) {
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
      // separator="."
      // console.log("oopse udana");
    }

    let returnString = "";
    let format = "";

    function getFormatValue() {
      var formatOptions = document.getElementsByName("format");
      for (let i = 0; i < formatOptions.length; i++) {
        if (formatOptions[i].checked) {
          format = formatOptions[i].value;
        }
      }
    }
    getFormatValue();

    switch (format) {
      case "markdown":
        returnString = `[${match}](https://suttacentral.net/${book}${firstNumber}${
          secondNumber ? `.${secondNumber}` : ""
        }/en/sujato)${notSeparator}`;
        break;
      case "phpbb":
        returnString = `[url=https://suttacentral.net/${book}${firstNumber}${
          secondNumber ? `.${secondNumber}` : ""
        }/en/sujato]${match}[/url]${notSeparator}`;
        break;
      case "html":
        returnString = `<a href="https://suttacentral.net/${book}${firstNumber}${
          secondNumber ? `.${secondNumber}` : ""
        }/en/sujato">${match}</a>${notSeparator}`;
        break;
    }

    return returnString;
  }
  textToLink = textToLink.replace(/(mn|dn|kp|khp|dhp|iti|sn|an|ud|snp|thag|thig)\s*(\d+)(\s|\.|\:*)(\d*)/gi, replacer);
  //   textToLink = textToLink.replace(
  //     /(sn|an|ud|snp|thag|thig)\s*(\d+)(\s|\.|\:*)(\d+)/gi,
  //     "[$&](https://suttacentral.net/$1$2.$4/en/sujato)"
  //   );
  return textToLink;
}
