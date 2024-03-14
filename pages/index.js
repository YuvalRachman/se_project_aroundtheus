import Card, {
  handleCardSubmit,
  createAndAppendCard,
  initialCards,
} from "../component/Card.js";

import FormValidator, {
  settingModalEdit,
  settingModalAddCard,
} from "../component/FormValidator.js";
const modals = Array.from(document.querySelectorAll(".modal"));

const modalEdit = document.querySelector("#modalEdit");
const modalAddCard = document.querySelector("#modalAddCard");

const plusEdit = document.querySelector(".profile__card-button");
const penEdit = document.querySelector("#profileButton");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
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

// Event listener for card form submission
modalEdit.addEventListener("submit", handleProfileEditSubmit);
modalAddCard.addEventListener("submit", handleCardSubmit);

// Function to close modals
function closeModal(modal) {
  modal.classList.remove("modal_opened");
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
