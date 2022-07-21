const textToLink = document.querySelector("#text-to-link");
const outputTextArea = document.querySelector("#output-text");
const linkUpButton = document.querySelector("#link-up");
const copyButton = document.querySelector("#copy-output");
const formatOption = document.querySelector("#format-button-area");
let format = "html";

linkUpButton.addEventListener("click", e => {
  outputTextArea.innerText = addLinks(textToLink.value);
});

copyButton.addEventListener("click", e => {
  navigator.clipboard.writeText(outputTextArea.innerText);
});

function replacer() {}

function addLinks(textToLink) {
  function replacer(match, p1, p2, p3, p4) {
    let returnString = "";
    format = "";
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
        returnString = `[${match}](https://suttacentral.net/${p1}${p2}${p4 ? `${p3}${p4}` : ""}/en/sujato)`;
        break;
      case "phpbb":
        returnString = `[url=https://suttacentral.net/${p1}${p2}${p4 ? `${p3}${p4}` : ""}/en/sujato]${match}[/url]`;
        break;
      case "html":
        returnString = `<a href="https://suttacentral.net/${p1}${p2}${p4 ? `${p3}${p4}` : ""}/en/sujato">${match}</a>`;
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
