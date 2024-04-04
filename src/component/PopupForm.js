import Popup from "./Popup.js";

export default class PopupForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formValidator = null;
    this._inputList = this._popupElement.querySelectorAll(".input");
  }

  setFormValidator(formValidator) {
    this._formValidator = formValidator;
  }

  open() {
    super.open(this._popupForm);
    if (this._formValidator) {
      this._formValidator.enableValidator();
    }
  }

  close() {
    super.close(this._popupForm);
    if (this._formValidator) {
      this._formValidator.disableButton();
    }
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => e.preventDefault());
    const data = this._getInputValues();
    this._handleFormSubmit(data);
  }
}
