import { assignmentForDestroy, getRgb } from '../util';
import Colorpicker from './tools/colorpicker';
import Range from './tools/range';
import Submenu from './submenuBase';
import templateHtml from './template/submenu/eraser';
import { defaultEraserRangeValues } from '../consts';
const ERASER_OPACITY = 0.7;

/**
 * Eraser ui class
 * @class
 * @ignore
 */

class Eraser extends Submenu {
  constructor(subMenuElement, { locale, makeSvgIcon, menuBarPosition, usageStatistics }) {
    super(subMenuElement, {
      locale,
      name: 'eraser',
      makeSvgIcon,
      menuBarPosition,
      templateHtml,
      usageStatistics,
    });

    this._els = {
      eraserColorPicker: new Colorpicker(
        this.selector('.tie-eraser-color'),
        '#00a9ff',
        this.toggleDirection,
        this.usageStatistics
      ),
      eraserRange: new Range(
        {
          slider: this.selector('.tie-eraser-range'),
          input: this.selector('.tie-eraser-range-value'),
        },
        defaultEraserRangeValues
      ),
      apply: this.selector('.tie-eraser-button .apply'),
    };

    this.color = this._els.eraserColorPicker.color;
    this.width = this._els.eraserRange.value;
  }

  /**
   * Destroys the instance.
   */
  destroy() {
    this._removeEvent();
    this._els.eraserColorPicker.destroy();
    this._els.eraserRange.destroy();

    assignmentForDestroy(this);
  }

  /**
   *Add event for eraser
   * @param {Object} actions - actions for eraser
   *   @param {Function} actions.setEraserMode - set eraser mode
   */
  addEvent(actions) {
    this.actions = actions;

    const apply = this._apply.bind(this);

    this.eventHandler = {
      apply,
    };

    this._els.eraserColorPicker.on('change', this._changeEraserColor.bind(this));
    this._els.eraserRange.on('change', this._changeEraserRange.bind(this));
    this._els.apply.addEventListener('click', apply);
  }

  /**
   * Remove event
   * @private
   */
  _removeEvent() {
    this._els.eraserColorPicker.off();
    this._els.eraserRange.off();
    this._els.apply.removeEventListener('click', this.eventHandler.apply);
  }

  /**
   * set eraser mode - action runner
   */
  setEraserMode() {
    this.actions.setEraserMode({
      width: this.width,
      color: getRgb(this.color, ERASER_OPACITY),
    });
  }

  /**
   *  Returns the menu to its default state.
   */
  changeStandbyMode() {
    this.actions.stopEraseringMode();
    this.actions.changeSelectableAll(true);
  }

  /**
   * Executed when the menu starts.
   */
  changeStartMode() {
    this.setEraserMode();
  }

  /**
   * Change erasering color
   * @param {string} color - select erasering color
   * @private
   */
  _changeEraserColor(color = 'transparent') {
    this.color = color;
    this.setEraserMode();
  }

  /**
   * Change erasering Range
   * @param {number} value - select erasering range
   * @private
   */
  _changeEraserRange(value) {
    this.width = value;
    this.setEraserMode();
  }

  /**
   * Apply Eraser
   * @private
   */
  _apply() {
    this.actions.applyEraser();
  }
}

export default Eraser;
