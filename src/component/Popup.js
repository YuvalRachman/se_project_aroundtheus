export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    console.log(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    console.log(this._popupElement);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
