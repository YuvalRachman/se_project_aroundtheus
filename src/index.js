import Card from "./component/Card.js";
import Section from "./component/Section.js";
import PopupForm from "./component/PopupForm.js";
import "./pages/index.css";
import * as constants from "./component/utils/constants.js";
import FormValidator from "./component/FormValidator.js";
import { PopupImage } from "./component/PopupImage.js";
import UserInfo from "./component/UserInfo.js";

// Initialize UserInfo
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__subtitle",
});
console.log(constants.formSettings.cardsList);
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
function handleProfileFormSubmit({ title, description }) {
  userInfo.setInfo({ title, description });
  editPopup.close();
}
// Function to render card
function renderCard(data) {
  const card = new Card(
    { data, handleImageClick: (imageData) => imagePopup.open(imageData) },
    constants.formSettings.cardTemplate
  );

  return card.getView();
}
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

console.log();
// Set event listeners for popups
editPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
// Initialize card section
// Enable form validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
