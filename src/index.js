import Card from "./component/Card.js";
import Section from "./component/Section.js";
import PopupForm from "./component/PopupForm.js";
import "./pages/index.css";
import * as constants from "./component/utils/constants.js";
import FormValidator from "./component/FormValidator.js";
import { PopupImage } from "./component/PopupImage.js";

// Initialize popups
const editPopup = new PopupForm("#modalEdit");
const addCardPopup = new PopupForm("#modalAddCard");
const imagePopup = new PopupImage("#preview_image");

// Initialize form validators
const profileFormValidator = new FormValidator(
  "#edit__profile__form",
  constants.formSettings
);
const cardFormValidator = new FormValidator(
  "#add__card__form",
  constants.formSettings
);

// Enable validators and disableButton profile form
profileFormValidator.enableValidator();
profileFormValidator.disableButton();
addCardPopup.enableValidator();
addCardPopup.disableButton();
imagePopup.setEventListeners();
// Event listeners
constants.plusEdit.addEventListener("click", () => {
  editPopup.open();
});

constants.editProfileForm.addEventListener("click", () => {
  editPopup.open();
});
const newCardList = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);

cardSection.renderItems();

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

constants.cardsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    const cardElement = event.target.closest(".card");
    const cardData = cardElement.dataset;
    handleImageClick(cardData);
  }
});

// Function to handle image click
function handleImageClick(data) {
  imagePopup.open(data.link, data.name);
}

newCardList.renderItems();

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}
function handleProfileInputValues() {
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link });
  cardFormValidator.disableButton();
  addCardPopup.close();
}
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profilleTitleInput.value;
  profileSubtitle.textContent = profilleSubtitleInput.value;
  closeModal(modalEdit); // Close the modal after form submission
}

// Event listener for clicking outside the modal to close it
constants.modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

// Initialize FormValidator for modalForms form

// function createCard(cardData) {
//   const card = new Card(cardData, "#card-template", () => {
//     const { name, link } = cardData;
//     const modalPreview = document.querySelector("#preview_image");

//     if (modalPreview) {
//       const previewCaptionModal =
//         modalPreview.querySelector(".preview__caption");
//       const previewModalPicture = modalPreview.querySelector(".preview__image");

//       if (previewModalPicture && previewCaptionModal) {
//         previewModalPicture.src = link || ""; // Ensure link is set or set to empty string if undefined
//         previewCaptionModal.textContent = name || ""; // Ensure name is set or set to empty string if undefined
//         previewModalPicture.alt = `Photo of ${name || ""}`; // Ensure name is set or set to empty string if undefined
//       }
//     }
//   });

//   return card;
// }

function createAndPrependCard(cardData) {
  const card = createCard(cardData);
  const cardElement = card.getView();
  constants.cardsList.prepend(cardElement);
}

function handleCardSubmit(e) {
  e.preventDefault();
  const name = cardTitle.value;
  const link = cardUrl.value;
  const cardData = { name, link };
  cardFormValidate.disableButton();
  closeModal(modalAddCard);
  createAndPrependCard(cardData);
  modalAddCardFormValidator.toggleButtonState();
}

constants.initialCards.forEach(createAndPrependCard);
