// this is the main function that does the linking
// it accepts the entire block of text to link and returns the linked up text

export default function addLinks(props) {
  const { textToLink, format, isAllTranslations, isNewTab } = props;
  const singleNumberBooks = ["dn", "mn", "kp", "dhp"];
  const separators = [".", ":"];
  let openInNewTab = "";

  function replacer(match, p1, p2, p3, p4) {
    const book = p1.toLowerCase();
    let citation = match;
    let firstNumber = p2;
    let separator = p3;
    let secondNumber = p4;
    let notSeparator = "";
    if (singleNumberBooks.includes(book) && separators.includes(separator)) {
      citation = citation.slice(0, -1);
      notSeparator = separator;
    }

    let translator;
    if (isAllTranslations) {
      translator = "";
    } else {
      translator = "/en/sujato";
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
        default:
          console.error("Something went wrong with Itivuttaka citation");
      }
      secondNumber = "";
    }

    if (book === "ud" && !secondNumber) {
      firstNumber = parseInt(firstNumber, 10);
      firstNumber = Math.floor(firstNumber / 10) + 1;
      secondNumber = firstNumber % 10;
    }

    let returnString = "";
    // let format = getFormatValue();

    if (book === "sn" && secondNumber === "") {
      translator = "";
    }

    switch (format) {
      case "markdown":
        returnString = `[${citation}](https://suttacentral.net/${book}${firstNumber}${
          secondNumber ? `.${secondNumber}` : ""
        }${translator})${notSeparator}`;
        break;
      case "phpbb":
        returnString = `[url=https://suttacentral.net/${book}${firstNumber}${
          secondNumber ? `.${secondNumber}` : ""
        }${translator}]${citation}[/url]${notSeparator}`;
        break;
      case "html":
        returnString = `<a href="https://suttacentral.net/${book}${firstNumber}${
          secondNumber ? `.${secondNumber}` : ""
        }${translator}" ${openInNewTab}>${citation}</a>${notSeparator}`;
        break;
      default:
        console.error("something went wrong with the linking");
    }

    return returnString;
  } // end replacer function

  if (isNewTab) {
    openInNewTab = `rel="noreferrer" target="_blank"`;
  }

  // and this is what does it.
  // no range allowed, no chapters
  let linkedText = textToLink.replace(/\b(mn|dn|kp|khp|dhp) ?(\d+)()()\b/gi, replacer);

  // ranges allowed and chapters
  linkedText = linkedText.replace(/\b(sn|an) ?(\d+)(\.|:*)(\d*-*\d*)\b/gi, replacer);

  // chapters and no ranges
  linkedText = linkedText.replace(/\b(iti|itv|ud|snp|vv|pv|thag|thig) ?(\d+)(\.|:*)(\d*)\b/gi, replacer);

  return linkedText;
}
