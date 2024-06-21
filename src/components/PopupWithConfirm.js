import Popup from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleDelete) {
    super({ popupSelector });
    this._handleDelete = handleDelete;
    this._confirmDeleteButton = this._popupElement.querySelector("#deleteCard");

    this.setEventListeners();
  }

  // Override open method to accept cardId and cardElement
  open(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  }

  // Handle delete confirmation
  _handleEnterRemove = () => {
    this._handleDelete(this._cardId, this._cardElement);
  };

  // Override setEventListeners to add delete confirmation logic
  setEventListeners() {
    super.setEventListeners();
    this._confirmDeleteButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleDelete(this._cardId, this._cardElement);
    });
  }

  // Ensure to remove the Enter key event listener when the popup is closed
  close() {
    super.close();
    document.removeEventListener("keydown", this._handleEnterRemove);
  }
}
