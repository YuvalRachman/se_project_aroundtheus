import Popup from "../component/Popup.js";

export class PopupImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".preview__image");
    this._caption = this._popupElement.querySelector(".preview__caption");
    super.setEventListeners();
  }

  // Define openImage as a regular method
  open(imageData) {
    this._caption.textContent = imageData.name;
    this._image.src = imageData.link;
    this._image.alt = `image ${imageData.name}`;
    super.open();
  }
}
