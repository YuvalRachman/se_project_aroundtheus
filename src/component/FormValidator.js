// FormValidator.js
import { formSettings } from "../component/utils/constants.js";

export default class FormValidator {
  constructor(options) {
    this._formEl = formSettings.formSelector;
    this._formOptions = options;
    this._inputSelector = formSettings.inputSelector;
    this._submitButtonSelector = formSettings.submitButtonSelector;
    this._inactiveButtonClass = formSettings.inactiveButtonClass;
    this._submitButton = document.querySelector(this._submitButtonSelector);
    this._inputs = Array.from(document.querySelectorAll(this._inputSelector));
  }

  _showInputError(inputEl) {
    const errorEl = document.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._formOptions.inputErrorClass);
    errorEl.textContent = inputEl.validationMessage;
    errorEl.classList.add(this._formOptions.errorClass);
  }

  _hideInputError(inputEl) {
    const errorEl = document.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._formOptions.inputErrorClass);
    errorEl.classList.remove(this._formOptions.errorClass);
    errorEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (inputEl.validity.valid) {
      this._hideInputError(inputEl);
    } else {
      this._showInputError(inputEl);
    }
    return inputEl.validity.valid; // Return the validity status
  }

  _checkFormValidity() {
    return this._inputs.every((inputEl) => this._checkInputValidity(inputEl));
  }

  _toggleButtonState() {
    const isFormValid = this._checkFormValidity();
    if (!isFormValid) {
      this.disableButton();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputs.forEach((_inputEl) => {
      _inputEl.addEventListener("input", () => {
        this._checkInputValidity(_inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidator() {
    document.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  disableButton() {
    this._submitButton.setAttribute("disabled", true);
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.removeEventListener(
      "click",
      this._submitButtonClickHandler
    );
  }
}
