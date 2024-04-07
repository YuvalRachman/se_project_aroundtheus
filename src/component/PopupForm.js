import Popup from "./Popup.js";

export default class PopupForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });

    this._handleFormSubmit = handleFormSubmit;
    this._formValidator = null;
    this._inputList = this._popupElement.querySelectorAll(".input");
  }

  setFormValidator(formValidator) {
    this._formValidator = formValidator;
  }

  open() {
    super.open();
    if (this._formValidator) {
      this._formValidator.enableValidator();
    }
    this._setEventListeners(); // Moved here to ensure event listeners are added when the popup is opened
  }

  close() {
    super.close();
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
    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = this._getInputValues();
      this._handleFormSubmit(formData);
    });
  }
}
