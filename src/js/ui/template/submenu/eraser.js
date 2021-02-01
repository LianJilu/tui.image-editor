/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 * @returns {string}
 */
export default ({ locale, makeSvgIcon }) => `
    <ul class="tui-image-editor-submenu-item">
        <li>
            <div class="tie-eraser-color" title="${locale.localize('Color')}"></div>
        </li>
        <li class="tui-image-editor-partition only-left-right">
            <div></div>
        </li>
        <li class="tui-image-editor-newline tui-image-editor-range-wrap">
            <label class="range">${locale.localize('Range')}</label>
            <div class="tie-eraser-range"></div>
            <input class="tie-eraser-range-value tui-image-editor-range-value" value="0" />
        </li>
        <li class="tui-image-editor-partition only-left-right">
            <div></div>
        </li>
        <li class="tie-eraser-button tui-image-editor-newline" style="margin-top: 22px;margin-bottom: 5px">
            <div class="tui-image-editor-button apply">
                ${makeSvgIcon(['normal', 'active'], 'apply')}
                <label>
                    ${locale.localize('Apply')}
                </label>
            </div>
        </li>
    </ul>
`;
