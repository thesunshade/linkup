/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import addLinks from "../src/addLinks.js";

describe(`test replacement`, () => {
  describe(`test citation as only thing in the text to be linked up, html`, () => {
    const textToLink = "MN23";
    const format = "html";

    it("links up MN23 to all translations in new tab", () => {
      // arrange
      const isAllTranslations = true;
      const isNewTab = true;

      // act
      const linkedText = addLinks({ textToLink, format, isAllTranslations, isNewTab });

      // assert
      expect(linkedText).toBe('<a href="https://suttacentral.net/mn23" rel="noreferrer" target="_blank">MN23</a>');
    });

    it("links up MN23 to Sujato in new tab", () => {
      // arrange
      const isAllTranslations = false;
      const isNewTab = true;

      // act
      const linkedText = addLinks({ textToLink, format, isAllTranslations, isNewTab });

      // assert
      expect(linkedText).toBe(
        '<a href="https://suttacentral.net/mn23/en/sujato" rel="noreferrer" target="_blank">MN23</a>'
      );
    });

    it("links up MN23 to Sujato in same tab", () => {
      // arrange
      const isAllTranslations = false;
      const isNewTab = false;

      // act
      const linkedText = addLinks({ textToLink, format, isAllTranslations, isNewTab });

      // assert
      expect(linkedText).toBe('<a href="https://suttacentral.net/mn23/en/sujato" >MN23</a>');
    });
  });

  describe(`test when there is non-citation text in textToLink, html`, () => {
    const textToLink = "SN56.11 is a sutta";
    const format = "html";
    it("links up 'SN56.11 is a sutta' to Sujato in new tab", () => {
      // arrange
      const isAllTranslations = false;
      const isNewTab = true;

      // assert
      expect(addLinks({ textToLink, format, isAllTranslations, isNewTab })).toBe(
        '<a href="https://suttacentral.net/sn56.11/en/sujato" rel="noreferrer" target="_blank">SN56.11</a> is a sutta'
      );
    });

    it("links up 'SN56.11 is a sutta' to Sujato in new tab", () => {
      // arrange
      const isAllTranslations = false;
      const isNewTab = true;
      const result = `<a href="https://suttacentral.net/sn56.11/en/sujato" rel="noreferrer" target="_blank">SN56.11</a> is a sutta`;

      // assert
      expect(addLinks({ textToLink, format, isAllTranslations, isNewTab })).toBe(result);
    });
  });
});
