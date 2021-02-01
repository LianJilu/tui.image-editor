import DrawingMode from '../interface/drawingMode';
import { drawingModes, componentNames as components } from '../consts';

/**
 * EraserDrawingMode class
 * @class EraserDrawingMode
 * @extends {DrawingMode}
 * @ignore
 */
class EraserDrawingMode extends DrawingMode {
  constructor() {
    super(drawingModes.ERASER);
  }

  /**
   * start this drawing mode
   * @param {Graphics} graphics - Graphics instance
   * @param {{width: ?number, color: ?string}} [options] - Brush width & color
   * @override
   */
  start(graphics, options) {
    const eraser = graphics.getComponent(components.FREE_DRAWING);
    eraser.start(options);
  }

  /**
   * stop this drawing mode
   * @param {Graphics} graphics - Graphics instance
   * @override
   */
  end(graphics) {
    const eraser = graphics.getComponent(components.FREE_DRAWING);
    eraser.end();
  }
}

export default EraserDrawingMode;
