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

const editButton = document.querySelector(".profile__button");
const modalInputTitle = document.querySelector("#profile-title-input");
const modalInputSubtitle = document.querySelector("#profile-subtitle-input");
const addCardBut = document.querySelector(".profile__card-button");

const addCardModal = document.forms["formAddCard"];
const profileModal = document.forms["profileForm"];
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
    document.querySelectorAll(validationSettings.modalSelector)
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
enableValidation(validationSettings);
/* -------------------------------------------------------------------------- */
/*                                 Popup Image                                */
/* -------------------------------------------------------------------------- */

// Create image popup instance
const imagePopup = new PopupImage(formSettings.modalImage);

// Close image popup preview
imagePopup.close();
// Initialize PopupImage, PopupForm instances
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
    items: constants.initialCards,
    renderer: (data) => {
      // Create a new card
      const cardElement = renderCard(data);

      // Display each card
      cardSection.addItem(cardElement);
    },
  },
  formSettings.cardList
);
cardSection.renderItems(constants.initialCards);
// Enable validation for all forms

/* -------------------------------------------------------------------------- */
/*                                  Add Form                                  */
/* -------------------------------------------------------------------------- */

// Create the add form instance
const addCardPopup = new PopupForm(formSettings.modalAddCard, (data) => {
  // Create a new card
  const newCard = renderCard(data);
  // Close the add form
  addCardPopup.close();
  // Add the new card to the section
  cardSection.addItem(newCard);
});

// Open the modal when users click on the add button
addCardBut.addEventListener("click", () => {
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
const userInfo = new UserInfo(
  formSettings.profileName,
  formSettings.profileSubtitle
);
// Create the edit form instance
const profile = new PopupForm(formSettings.modalProfile, (values) => {
  // Add the form's input to the profile section
  userInfo.setInfo(values.name, values.subtitle);

  // Close the edit form
  profile.close();
});

/* -------------------------------------------------------------------------- */
/*                                  Edit Form                                 */
/* -------------------------------------------------------------------------- */

// Open the modal when users click on the edit button
editButton.addEventListener("click", () => {
  // Get profile info and add to the form fields
  const profileInfo = userInfo.getInfo();

  // Add the profile info on the page to the form's fields
  modalInputTitle.value = profileInfo.name;
  modalInputSubtitle.value = profileInfo.subtitle;

  // Disable button each time it opens
  formValidators[profileModal.getAttribute("name")].disableButton();

  // Open modal
  profile.open();
});

// Set edit form event listeners
profile.setEventListeners();
