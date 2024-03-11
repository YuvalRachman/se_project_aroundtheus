import Card from "./Card.js";
import FormValidator, {
  settingModalEdit,
  settingModalAddCard,
} from "./FormValidator.js";
const modals = Array.from(document.querySelectorAll(".modal"));

const modalEdit = document.querySelector("#modalEdit");
const modalAddCard = document.querySelector("#modalAddCard");
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
}
// Function to handle profile form submission
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profilleTitleInput.value;
  profileSubtitle.textContent = profilleSubtitleInput.value;
  closeModal(modalEdit); // Close the modal after form submission
}
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");

  cardTitleEL.textContent = cardData.name;
  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;

  return cardElement;
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
modalAddCard.addEventListener("submit", handleCardSubmit);

// Function to close modals
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  // Remove event listener for Escape key press
  document.removeEventListener("keydown", closeModalOnEscape);
}

// Define the event handler function for Escape key press

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
