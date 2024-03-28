import Popup from "./Poup";
export default class PopupForm extends Popup {
  constructor(popupSelector, handelFormSubmit) {
    super({ popupSelector });
    this._handelForm = handelFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = [...this._popupForm.querySelectorAll("input")];
  }
  reset() {
    if (this._popupForm) {
      this._popupForm.reset();
    }
  }

  close = () => {
    this.reset();
    super.close();
  };
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
  setEventListeners() {
    super.setEventListeners(); // Call superclass method
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleForm(this._getInputValues());
    });
  }
}

const newCardPopup = new PopupForm("#modalAddCard", () => {});
