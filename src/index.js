import Card from "./component/Card.js";
import Section from "./component/Section.js";
import PopupForm from "./component/PopupForm.js";
import "./pages/index.css";
import * as constants from "./component/utils/constants.js";
import FormValidator from "./component/FormValidator.js";
import { PopupImage } from "./component/PopupImage.js";
import UserInfo from "./component/UserInfo.js";

// Define modalAddCard
const modalAddCard = document.querySelector(".profile__card-button");
const modalProfile = document.querySelector(".profile__button");
// Initialize UserInfo
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__subtitle",
});

// Initialize form validators
const profileFormValidator = new FormValidator(
  constants.formSettings,
  "#edit__profile__form"
);
const cardFormValidator = new FormValidator(
  constants.formSettings,
  "#add__card__form"
);

// Initialize PopupImage, PopupForm instances
const imagePopup = new PopupImage("#preview_image");
const editPopup = new PopupForm("#modalEdit", handleProfileFormSubmit);
const addCardPopup = new PopupForm("#modalAddCard", handleAddCardFormSubmit);

// Function to handle form submit for adding a card
function handleAddCardFormSubmit(data) {
  const newCard = renderCard(data);
  cardSection.addItem(newCard);
  addCardPopup.close();
  cardFormValidator.resetValidation();
}

// Function to handle form submit for profile edit
function handleProfileFormSubmit(data) {
  userInfo.setInfo(data);
  editPopup.close();
}
function handleImageClick() {
  imagePopup.open();
}
function renderCard(data) {
  const card = new Card(
    {
      data: data,
      handleImageClick: handleImageClick,
    },
    "#card-template"
  );
  return card.getView();
}
// Initialize card section
const cardSection = new Section(
  {
    items: constants.initialCards,
    renderer: (data) => {
      // Create a new card
      const cardElement = renderCard(data);

      // Display each card
      cardSection.addItem(cardElement);
    },
  },
  constants.formSettings.cardsList
);

// Render initial set of cards
cardSection.renderItems(constants.initialCards);

// Set event listeners for popups
editPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

// Enable form validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Now add the event listener to modalAddCard
modalAddCard.addEventListener("click", () => {
  addCardPopup.open();
});
modalProfile.addEventListener("click", () => {
  console.log(222);
  editPopup.open();
});
