import Card from "./component/Card.js";
import Section from "./component/Section.js";
import PopupForm from "./component/PopupForm.js";
import "./pages/index.css";
import {
  validationSettings,
  formSettings,
} from "./component/utils/constants.js";
import * as constants from "./component/utils/constants.js";

import FormValidator from "./component/FormValidator.js";
import { PopupImage } from "./component/PopupImage.js";
import UserInfo from "./component/UserInfo.js";

const addCardModal = document.forms["addCardModal"];
const profileModal = document.forms["profileModal"];

console.log(profileModal);
// Define modalAddCard
const modalAddCard = document.querySelector(".profile__card-button");

// Initialize UserInfo

/* -------------------------------------------------------------------------- */
/*                               Form Validation                              */
/* -------------------------------------------------------------------------- */

// Create a form validators object
const formValidators = {};

// Create validator instances for all forms
const enableValidation = (validationSettings) => {
  // Create an array of all forms
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );

  // Create a validator for each form
  formList.forEach((formElement) => {
    // Create a validator instance for the current instance
    const validator = new FormValidator(validationSettings, formElement);

    // Retrieve the form element by its name
    const formName = formElement.getAttribute("name");

    // Store the current form validator in the validators object
    formValidators[formName] = validator;

    // Enable validation for the current form
    validator.enableValidation();
  });
};

/* -------------------------------------------------------------------------- */
/*                                Card Section                                */
/* -------------------------------------------------------------------------- */

function renderCard(data) {
  const card = new Card(
    {
      data: data,
      handleImageClick: (imageData) => {
        imagePopup.open(imageData);
      },
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
  formSettings.cardsList
);

// Enable validation for all forms
enableValidation(validationSettings);

// Initialize PopupImage, PopupForm instances
const imagePopup = new PopupImage("#preview_image");

/* -------------------------------------------------------------------------- */
/*                                  Add Form                                  */
/* -------------------------------------------------------------------------- */

// Create the add form instance
const addCardPopup = new PopupForm(formSettings.modalAddCard, (formData) => {
  // Create a new card
  const newCard = renderCard(formData);
  // Close the add form
  addCardPopup.close();
  // Add the new card to the section
  cardSection.addItem(newCard);
});

// Open the modal when users click on the add button
modalAddCard.addEventListener("click", () => {
  // Reset validation for the add card form
  formValidators[addCardModal.getAttribute("name")].resetValidation();

  // Open the add card form
  addCardPopup.open();
});

// Set add form event listeners
addCardPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                             Profile Information                            */
/* -------------------------------------------------------------------------- */

// Create the user info instance
const userInfo = new UserInfo({
  title: ".profile__title",
  subtitle: ".profile__subtitle",
});
// Create the edit form instance
const profile = new PopupForm(formSettings.modalProfile, (values) => {
  // Add the form's input to the profile section
  userInfo.setUserInfo(values.name, values.subtitle);

  // Close the edit form
  profile.close();
});

/* -------------------------------------------------------------------------- */
/*                                  Edit Form                                 */
/* -------------------------------------------------------------------------- */
const editButton = document.querySelector(".profile__button");
const modalInputTitle = document.querySelector("#profile-title-input");
const modalInputSubtitle = document.querySelector("#profile-subtitle-input");
// Open the modal when users click on the edit button
editButton.addEventListener("click", () => {
  // Get profile info and add to the form fields
  const profileInfo = userInfo.getInfo();

  // Add the profile info on the page to the form's fields
  modalInputTitle.value = profileInfo.title;
  modalInputSubtitle.value = profileInfo.subtitle;

  // Disable button each time it opens
  formValidators[profileModal.getAttribute("name")].disableButton();

  // Open modal
  profile.open();
});

// Set edit form event listeners
profile.setEventListeners();

// Render initial set of cards
cardSection.renderItems(constants.initialCards);

// Set event listeners for popups

imagePopup.setEventListeners();
