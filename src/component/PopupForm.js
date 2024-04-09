import Popup from "./Popup.js";

export default class PopupForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector); // Pass an object with popupSelector as a property
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".input");
  }

  close() {
    super.close();
    // Assuming you meant to call `disableButton` on the formValidator instead of directly on the form
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

  setFormValidator(formValidator) {
    this._formValidator = formValidator;
  }

  _setEventListeners() {
    super._setEventListeners(); // Call the parent method to ensure event listeners are properly set up
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
