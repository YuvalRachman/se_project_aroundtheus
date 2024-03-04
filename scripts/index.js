import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
const modals = Array.from(document.querySelectorAll(".modal"));

const modalEdit = document.querySelector("#modalEdit");
const modalAddCard = document.querySelector("#modalAddCard");

const addCardEditForm = modalAddCard.querySelector(".modal__form");
const cardTitle = modalAddCard.querySelector(".modal__input_type_title");
const cardUrl = modalAddCard.querySelector(".modal__input_type_url");

const cardList = document.querySelector(".cards__list");
const plusEdit = document.querySelector(".profile__card-button");
const penEdit = document.querySelector("#profileButton");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profilleTitleInput = document.querySelector("#profile-title-input");
const profilleSubtitleInput = document.querySelector("#profile-subtitle-input");

// Function to open modals
export function openModal(modal) {
  modal.classList.add("modal_opened");
  // Add event listener for Escape key press
  document.addEventListener("keydown", closeModalOnEscape);
}

// Function to handle profile form submission
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profilleTitleInput.value;
  profileSubtitle.textContent = profilleSubtitleInput.value;
  closeModal(modalEdit); // Close the modal after form submission
}

// Function to handle card form submission
function handleCardSubmit(e) {
  e.preventDefault();
  const name = cardTitle.value;
  const link = cardUrl.value;
  const cardData = { name, link };
  const newCard = getCardElement(cardData);
  cardList.prepend(newCard);
  e.target.reset();
  closeModal(modalAddCard); // Close the modal after form submission
}

// Event listener for opening the add card modal
plusEdit.addEventListener("click", () => {
  openModal(modalAddCard);
});

// Event listener for opening the edit profile modal
penEdit.addEventListener("click", () => {
  openModal(modalEdit);
  profilleTitleInput.focus();
  profilleTitleInput.value = profileTitle.textContent;
  profilleSubtitleInput.value = profileSubtitle.textContent;
});
modalEdit.addEventListener("submit", handleProfileEditSubmit);

// Event listener for card form submission
addCardEditForm.addEventListener("submit", handleCardSubmit);

// Function to close modals
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  // Remove event listener for Escape key press
  document.removeEventListener("keydown", closeModalOnEscape);
}

// Define the event handler function for Escape key press
function closeModalOnEscape(event) {
  if (event.key === "Escape") {
    // Find the currently active modal
    const activeModal = document.querySelector(".modal_opened");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}
function handleCloseButtonClick() {
  const buttonsClose = document.querySelectorAll(".modal__close");
  buttonsClose.forEach((button) => {
    button.addEventListener("click", () => {
      const popup = button.closest(".modal");
      closeModal(popup);
    });
  });
}

// Immediately invoke the function to attach event listeners to close buttons
handleCloseButtonClick();

// Event listener for clicking outside the modal to close it
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

// Initialize card elements from initialCards data
const showInputError = (inputElement, errorMessage, validationOptions) => {
  const errorElement = inputElement.parentElement.querySelector(
    `.${validationOptions.errorClass}`
  );
  inputElement.classList.add(validationOptions.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationOptions.errorVisibleClass); // Make error visible
};

const hideInputError = (inputElement, validationOptions) => {
  const errorElement = inputElement.parentElement.querySelector(
    `.${validationOptions.errorClass}`
  );
  inputElement.classList.remove(validationOptions.inputErrorClass);
  errorElement.textContent = ""; // Clear error message
  errorElement.classList.remove(validationOptions.errorVisibleClass); // Hide error
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

  toggleButtonState(inputList, buttonElement, validationOptions);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, validationOptions);
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
