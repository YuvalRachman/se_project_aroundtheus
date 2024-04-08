export default class Popup {
  constructor(popupSelector) {
    console.log(popupSelector);
    this._popupElement = document.querySelector(`${popupSelector}`);
  }

  open = () => {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  };

  close = () => {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    // Close the popup when users click on the shaded area outside the modal
    this._popupElement.addEventListener("mousedown", (event) => {
      if (!event.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
  }
}
