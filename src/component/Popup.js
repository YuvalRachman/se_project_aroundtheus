export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);

    this._closeButton = document.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    // Close the popup when users click on the shaded area outside the modal
    this._popupElement.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });

    this._closeButton.addEventListener("click", () => this.close());
  }
}
