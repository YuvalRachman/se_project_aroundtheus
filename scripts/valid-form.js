const showInputError = (inputElement, errorMessage, validationOptions) => {
  const errorElement = inputElement.parentElement.querySelector(
    `.${validationOptions.errorClass}`
  );
  inputElement.classList.add(validationOptions.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationOptions.errorVisibleClass);
};

const hideInputError = (inputElement, validationOptions) => {
  const errorElement = inputElement.parentElement.querySelector(
    `.${validationOptions.errorClass}`
  );
  inputElement.classList.remove(validationOptions.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationOptions.errorVisibleClass);
};

const checkInputValidity = (inputElement, validationOptions) => {
  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      inputElement.validationMessage,
      validationOptions
    );
  } else {
    hideInputError(inputElement, validationOptions);
  }
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationOptions) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationOptions.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(validationOptions.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement, validationOptions) => {
  const inputList = formElement.querySelectorAll(
    validationOptions.inputSelector
  );
  const buttonElement = formElement.querySelector(
    validationOptions.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, validationOptions);
      toggleButtonState(inputList, buttonElement, validationOptions);
    });
  });
};

const enableValidation = (validationOptions) => {
  const formList = document.querySelectorAll(validationOptions.formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationOptions);
  });
};

// Validation options object
const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error",
  errorVisibleClass: "modal__input-error_visible",
};

// Enable validation with the provided options
enableValidation(validationOptions);
