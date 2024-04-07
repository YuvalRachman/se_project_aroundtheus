import Popup from "../component/Popup.js";

export class PopupImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popupElement.querySelector(".preview__image");
    this._caption = this._popupElement.querySelector(".preview__caption");
  }

  // Use a different method name to avoid conflict with the 'open' method from the parent class
  openImage = (data) => {
    super.open();
    this._caption.textContent = data.title;
    this._image.src = data.link;
    this._image.alt = data.title;
  };
}
