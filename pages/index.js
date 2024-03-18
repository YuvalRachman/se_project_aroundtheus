import Card, { initialCards } from "../component/Card.js";

import FormValidator, { formSettings } from "../component/FormValidator.js";
const modals = Array.from(document.querySelectorAll(".modal"));
const CardList = document.querySelector(".cards__list");
const modalEdit = document.querySelector("#modalEdit");
const modalAddCard = document.querySelector("#modalAddCard");
const cardTitle = modalAddCard.querySelector(".modal__input_type_title");
const cardUrl = modalAddCard.querySelector(".modal__input_type_url");
const plusEdit = document.querySelector(".profile__card-button");
const penEdit = document.querySelector("#profileButton");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profilleTitleInput = document.querySelector("#profile-title-input");
const profilleSubtitleInput = document.querySelector("#profile-subtitle-input");
export function closeModalOnEscape(event) {
  if (event.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

// Function to open modals
export function openModal(modal) {
  modal.classList.add("modal_opened");
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

// Event listener for opening the add card modal
plusEdit.addEventListener("click", () => openModal(modalAddCard));

// Event listener for opening the edit profile modal
penEdit.addEventListener("click", () => {
  openModal(modalEdit);
  profilleTitleInput.focus();
  profilleTitleInput.value = profileTitle.textContent;
  profilleSubtitleInput.value = profileSubtitle.textContent;
});

const addCardForm = document.getElementById("add__card__form");
addCardForm.addEventListener("submit", handleCardSubmit);

const editProfileForm = document.querySelector("#modalEdit .modal__form");
editProfileForm.addEventListener("submit", handleProfileEditSubmit);
// Function to close modals
export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  // Remove event listener for Escape key press
  document.removeEventListener("keydown", closeModalOnEscape);
}

// Event listener for clicking outside the modal to close it
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

// Event listener for close buttons
function handleCloseButtonClick() {
  const buttonsClose = document.querySelectorAll(".modal__close");
  buttonsClose.forEach((button) => {
    button.addEventListener("click", () => {
      const popup = button.closest(".modal");
      closeModal(popup);
    });
  });
}

// Attach event listeners to close buttons
handleCloseButtonClick();
// Initialize FormValidator for modalEdit form
const modalEditFormElement = document.querySelector(
  formSettings.modalEdit.formSelector
);
const modalEditFormValidator = new FormValidator(
  { ...formSettings.modalEdit, ...formSettings.common },
  modalEditFormElement
);
modalEditFormValidator.enableValidator();
// Initialize FormValidator for modalAddCard form
const modalAddCardFormElement = document.querySelector(
  formSettings.modalAddCard.formSelector
);
const modalAddCardFormValidator = new FormValidator(
  { ...formSettings.modalAddCard, ...formSettings.common },
  modalAddCardFormElement
);
modalAddCardFormValidator.enableValidator();
function createAndAppendCard(cardData) {
  const card = new Card(cardData, "#card-template", () => {
    const { name, link } = cardData;
    const previewCaptionModal = document.querySelector(".preview__caption");
    const previewModalPicture = document.querySelector(".preview__image");
    const modalPreview = document.querySelector("#preview_image");

    if (previewModalPicture && previewCaptionModal && modalPreview) {
      previewModalPicture.src = link;
      previewCaptionModal.textContent = name;
      previewModalPicture.alt = `Photo of ${name}`;
      openModal(modalPreview);
    }
  });

  const cardElement = card.getView();
  CardList.prepend(cardElement);
}

function handleCardSubmit(e) {
  e.preventDefault();
  const name = cardTitle.value;
  const link = cardUrl.value;
  const cardData = { name, link };
  e.target.reset();
  closeModal(modalAddCard);
  // initialCards.push(cardData);
  createAndAppendCard(cardData);
}
initialCards.forEach(createAndAppendCard);
