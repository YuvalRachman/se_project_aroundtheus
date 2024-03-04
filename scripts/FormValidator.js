export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.parentElement.querySelector(
      `.${this._config.errorClass}`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorVisibleClass);
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.parentElement.querySelector(
      `.${this._config.errorClass}`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorVisibleClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState(inputList, buttonElement) {
    const isFormValid = Array.from(inputList).every(
      (input) => input.validity.valid
    );

    if (isFormValid) {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    } else {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    }
  }

  _setEventListeners() {
    const inputList = this._formElement.querySelectorAll(
      this._config.inputSelector
    );
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }
}

// Usage:
const formElement = document.querySelector(".modal__form");
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error",
  errorVisibleClass: "modal__input-error_visible",
};

const formValidator = new FormValidator(config, formElement);
formValidator._setEventListeners();
