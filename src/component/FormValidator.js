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
    this._setEventListeners();
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
  }

  _toggleButtonState() {
    const isFormValid = this._inputs.every((inputEl) => inputEl.validity.valid);
    this._submitButton.disabled = !isFormValid;
    this._submitButton.classList.toggle(
      this._inactiveButtonClass,
      !isFormValid
    );
  }

  _setEventListeners() {
    this._inputs.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidator() {
    document.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._toggleButtonState();
  }

  _reset() {
    this._submitButton.setAttribute("disabled", true);
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  disableButton() {
    if (this._submitButton) {
      this._reset();
    }
  }
}
