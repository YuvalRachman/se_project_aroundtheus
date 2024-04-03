import Popup from "./Poup.js";
export default class PopupForm extends Popup {
  constructor(
    popupSelector,
    handleFormSubmit,
    openSelector = "",
    handleOpen = () => {}
  ) {
    super({ popupSelector, openSelector, handleOpen });
    this._popupForm = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open(this._popupForm);
  }

  close() {
    super.close(this._popupForm);
  }

  _getInputValues() {
    const formValues = {};
    const formInputs = Array.from(document.querySelectorAll(".modal__input"));
    formInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
