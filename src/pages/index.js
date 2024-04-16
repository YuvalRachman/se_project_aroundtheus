import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css";
import {
  validationSettings,
  formSettings,
  initialCards,
} from "../utils/contants.js";

import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const editButton = document.querySelector(".profile__button");
const modalInputTitle = document.querySelector("#profile-title-input");
const modalInputSubtitle = document.querySelector("#profile-subtitle-input");
const addCardBut = document.querySelector(".profile__card-button");

const addCardForm = document.forms["formAddCard"];
const profileForm = document.forms["profileForm"];

/* -------------------------------------------------------------------------- */
/*                               Form Validation                              */
/* -------------------------------------------------------------------------- */

// Create a form validators object
const formValidator = {};

// Create validator instances for all forms
const enableValidation = (validationSettings) => {
  // Create an array of all forms
  const formList = Array.from(
    document.querySelectorAll(validationSettings.modalSelector)
  );

  // Create a validator for each form
  formList.forEach((formElement) => {
    // Create a validator instance for the current instance
    const validator = new FormValidator(validationSettings, formElement);
    const formName = formElement.getAttribute("name");
    // Store the current form validator in the validators object
    formValidator[formName] = validator;

    // Enable validation for the current form
    validator.enableValidation();
  });
};
enableValidation(validationSettings);
/* -------------------------------------------------------------------------- */
/*                                 Popup Image                                */
/* -------------------------------------------------------------------------- */

// Create image popup instance
const imagePopup = new PopupWithImage(formSettings.modalImage);

// Close image popup preview

// Initialize PopupWithImage, PopupForm instances
/* -------------------------------------------------------------------------- */
/*                                Card Section                                */
/* -------------------------------------------------------------------------- */
function renderCard(data) {
  const card = new Card(
    data,
    (imageData) => {
      imagePopup.open(imageData);
    },
    "#card-template"
  );
  return card.getView();
}

// Initialize card section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      // Create a new card
      const cardElement = renderCard(data);

      // Display each card
      cardSection.addItem(cardElement);
    },
  },
  formSettings.cardList
);

// Enable validation for all forms

/* -------------------------------------------------------------------------- */
/*                                  Add Crad  Form                            */
/* -------------------------------------------------------------------------- */

// Create the add form instance
const addCardPopup = new PopupWithForm(formSettings.modalAddCard, (data) => {
  // Create a new card
  const newCard = renderCard(data);
  // Close the add form
  addCardPopup.close();
  // Add the new card to the section
  cardSection.addItem(newCard);
});

// Open the modal when users click on the add button
addCardBut.addEventListener("click", () => {
  // Open the add card form
  addCardPopup.open();
  formValidator[addCardForm.getAttribute("name")].resetValidation();
});

// Set add form event listeners
addCardPopup.setEventListeners();
/* -------------------------------------------------------------------------- */
/*                             Profile Information                            */
/* -------------------------------------------------------------------------- */

// Create the user info instance
const userInfo = new UserInfo(
  formSettings.profileName,
  formSettings.profileSubtitle
);
// Create the edit form instance
const profilePopup = new PopupWithForm(formSettings.modalProfile, (values) => {
  // Add the form's input to the profile section
  userInfo.setUserInfo(values.name, values.subtitle);

  // Close the edit form
  profilePopup.close();
});

/* -------------------------------------------------------------------------- */
/*                                  Edit Form                                 */
/* -------------------------------------------------------------------------- */

// Open the modal when users click on the edit button
editButton.addEventListener("click", () => {
  // Get profile info and add to the form fields

  const profileInfo = userInfo.getUserInfo();

  // Add the profile info on the page to the form's fields
  modalInputTitle.value = profileInfo.name;
  modalInputSubtitle.value = profileInfo.subtitle;

  profilePopup.open();
  // Disable button each time it opens
  formValidator[profileForm.getAttribute("name")].disableButton();
  // Reset validation for the add card form
  formValidator[addCardForm.getAttribute("name")].resetValidation();
});

// Set edit form event listeners
profilePopup.setEventListeners();
cardSection.renderItems(initialCards);
