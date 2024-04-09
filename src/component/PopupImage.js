import Popup from "../component/Popup.js";

export class PopupImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // Define openImage as a regular method
  openImage(data) {
    this._image = this._popupElement.querySelector(".preview__image");
    this._caption = this._popupElement.querySelector(".preview__caption");

    this._caption.textContent = data.title;
    this._image.src = data.link;
    this._image.alt = data.title;
    super.open();
  }
}
