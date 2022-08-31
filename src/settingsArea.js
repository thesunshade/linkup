// eslint-disable-next-line import/prefer-default-export
export const settingsArea = `
<div id="format-button-area" class="radiobuttonarea" value="format">
            <fieldset>
                <div class="settings-heading">Select Format:</div>
                <div class="radio-options">
                    <label for="markdown">
                        <div class="radio-input"><input type="radio" value="markdown" id="markdown" name="format"
                                checked="checked" />
                            <span class="radio-icon"></span>Markdown
                        </div>
                        <div class="option-descriptions">For forums like discourse.suttacentral.net</div>
                    </label>
                    <label for="phpbb">
                        <div class="radio-input"><input type="radio" value="phpbb" id="phpbb" name="format" />
                            <span class="radio-icon"></span>PHPbb
                        </div>
                        <div class="option-descriptions">For forums like dhammawheel.com</div>
                    </label>
                    <label for="html">
                        <div class="radio-input"><input type="radio" value="html" id="html" name="format" />
                            <span class="radio-icon"></span>HTML
                        </div>
                        <div class="option-descriptions">For web pages</div>
                    </label>
                </div>
            </fieldset>
        </div>
        <div class="misc-settings">
            <div class="settings-heading">Other Settings:</div>
            <label for="all-translations">
                <input type="checkbox" name="all-translations" id="all-translations">
                <span class="check-icon"></span>Link to page with all translations
            </label>
            <label for="new-tab">
                <input type="checkbox" name="new-tab" id="new-tab"><span class="check-icon"></span>
                Open HTML links in new tab
            </label>

        </div>`;
