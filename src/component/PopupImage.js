import Popup from "./Poup.js";

export class PopupImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._cardImage = this._popupElement.querySelector(".preview__image");
    this._cardTitle = this._popupElement.querySelector(".preview__caption");
  }

  open(data) {
    console.log(999);
    super.open();
    this._cardImage.src = data.link;
    this._cardImage.alt = data.name;
    this._cardTitle.textContent = data.name;
  }
  setEventListeners() {
    super.setEventListeners();
  }
}
