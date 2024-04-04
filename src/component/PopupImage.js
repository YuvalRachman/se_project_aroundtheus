import Popup from "../component/Popup.js";

export class PopupImage extends Popup {
  open({ name, link }) {
    this._popupElement.querySelector(".modal__image-title").textContent = name;
    const image = this._popupElement.querySelector(".modal__image");
    image.src = link;
    image.alt = name;
    super.open();
  }
}
