import Popup from "./Popup.js";

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
    this._formValidator = null;
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
    const formInputs = Array.from(this._popupForm.querySelectorAll("input"));
    formInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this._formValidator && this._formValidator.checkValidity()) {
        // Ensure checkValidity exists
        this._handleFormSubmit(this._getInputValues());
      }
    });
  }
}
