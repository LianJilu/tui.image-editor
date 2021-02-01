import commandFactory from '../factory/command';
import { componentNames, commandNames, objectType } from '../consts';

const { IMAGE_LOADER } = componentNames;

const command = {
  name: commandNames.APPLY_ERASER,

  /**
   * Load a background (main) image keep objects without eraser
   * @param {Graphics} graphics - Graphics instance
   * @param {string} imageName - Image name
   * @param {string} imgUrl - Image Url
   * @returns {Promise}
   */
  execute(graphics, imageName, imgUrl) {
    const loader = graphics.getComponent(IMAGE_LOADER);
    const prevImage = loader.getCanvasImage();
    const objects = graphics.getObjects().filter((objectItem) => objectItem.type !== 'cropzone');

    objects.forEach((objectItem) => {
      objectItem.evented = true;

      if (objectItem.type === objectType.ERASER) {
        graphics.remove(objectItem);
      }
    });

    this.undoData = {
      name: loader.getImageName(),
      image: prevImage,
      objects,
    };

    return loader.load(imageName, imgUrl);
  },

  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo(graphics) {
    const loader = graphics.getComponent(IMAGE_LOADER);
    const { objects, name, image } = this.undoData;

    graphics.removeAll(true);
    graphics.add(objects);

    return loader.load(name, image);
  },
};

commandFactory.register(command);

export default command;
