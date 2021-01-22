import fabric from 'fabric';
import Component from '../interface/component';
import { componentNames, defaultEraserRangeValues } from '../consts';

/**
 * Eraser
 * @class Eraser
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
class Eraser extends Component {
  constructor(graphics) {
    super(componentNames.ERASER, graphics);

    /**
     * Brush width
     * @type {number}
     */
    this.width = defaultEraserRangeValues.value;

    /**
     * fabric.Color instance for brush color
     * @type {fabric.Color}
     */
    this.oColor = new fabric.Color('rgba(0,0,0,0.5)');
  }

  /**
   * Start eraser drawing mode
   * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
   */
  start(setting) {
    const canvas = this.getCanvas();

    canvas.isDrawingMode = true;
    this.setBrush(setting);
  }

  /**
   * Set brush
   * @param {{width: ?number, color: ?string}} setting - Brush width & color
   */
  setBrush(setting) {
    const brush = this.getCanvas().freeDrawingBrush;

    setting = setting || {};
    this.width = setting.width || this.width;
    if (setting.color) {
      this.oColor = new fabric.Color(setting.color);
    }
    brush.width = this.width;
    brush.color = this.oColor.toRgba();
  }

  /**
   * End eraser drawing mode
   */
  end() {
    const canvas = this.getCanvas();

    canvas.isDrawingMode = false;
  }
}

export default Eraser;
