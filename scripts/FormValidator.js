export default class FormValidator {
  constructor(setting, formElement) {
    this._setting = setting;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._setting.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._setting.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.parentElement.querySelector(
      `.${this._setting.errorClass}`
    );
    inputElement.classList.add(this._setting.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._setting.errorVisibleClass);
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.parentElement.querySelector(
      `.${this._setting.errorClass}`
    );
    inputElement.classList.remove(this._setting.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._setting.errorVisibleClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const isFormValid = this._inputList.every((input) => input.validity.valid);

    if (isFormValid) {
      this._buttonElement.classList.remove(this._setting.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    } else {
      this._buttonElement.classList.add(this._setting.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "disabled");
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidator() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export const settingModalEdit = {
  formSelector: "#modalEdit .modal__form",
  inputSelector: "#modalEdit .modal__input",
  submitButtonSelector: "#modalEdit .modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error",
  errorVisibleClass: "modal__input-error_visible",
};

// Define settings for modalAddCard form
export const settingModalAddCard = {
  formSelector: "#modalAddCard .modal__form",
  inputSelector: "#modalAddCard .modal__input",
  submitButtonSelector: "#modalAddCard .modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error",
  errorVisibleClass: "modal__input-error_visible",
};

// Initialize FormValidator for modalEdit form
const modalEditFormElement = document.querySelector(
  settingModalEdit.formSelector
);
const modalEditFormValidator = new FormValidator(
  settingModalEdit,
  modalEditFormElement
);
modalEditFormValidator.enableValidator();

// Initialize FormValidator for modalAddCard form
const modalAddCardFormElement = document.querySelector(
  settingModalAddCard.formSelector
);
const modalAddCardFormValidator = new FormValidator(
  settingModalAddCard,
  modalAddCardFormElement
);
modalAddCardFormValidator.enableValidator();
