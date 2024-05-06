import Api from "../API/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css";
import { validationSettings, formSettings } from "../utils/contants.js";

import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const editButton = document.querySelector(".profile__button");
const modalInputTitle = document.querySelector("#profile-title-input");
const modalInputSubtitle = document.querySelector("#profile-subtitle-input");
const addCardBut = document.querySelector(".profile__card-button");

const addCardForm = document.forms["formAddCard"];
const profileForm = document.forms["profileForm"];

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/",
  headers: {
    authorization: "7020a5bf-3cd5-49cf-ad16-b85b65f2938f",
    "Content-Type": "application/json",
  },
});
console.log(this.headers);

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
api
  .getInitialCards()
  .then((cards) => {
    const cardSection = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      formSettings.cardList
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.error("Error fetching initial cards:", err);
  });
// function createCard(cardData) {
//   const cardElement = cardData;
//   cardSection.addItem(cardElement);
// }
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
  formValidator[addCardForm.getAttribute("name")].disableButton();
});

function openCardForm() {
  // Open the add card form
  addCardPopup.open();
}
// Open the modal when users click on the add button
addCardBut.addEventListener("click", () => {
  openCardForm();
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
const profilePopup = new PopupWithForm(
  formSettings.modalProfile,
  ({ name, subtitle }) => {
    // Add the form's input to the profile section
    userInfo.setUserInfo(name, subtitle);

    // Close the edit form
    profilePopup.close();
  }
);

/* -------------------------------------------------------------------------- */
/*                                  Edit Form                                 */
/* -------------------------------------------------------------------------- */

// Function to open the edit modal and populate form fields with profile info
function openEditForm() {
  const profileInfo = userInfo.getUserInfo();
  modalInputTitle.value = profileInfo.name;
  modalInputSubtitle.value = profileInfo.subtitle;
  profilePopup.open();
}

// Function to disable buttons and reset validation
function resetProfileForm() {
  const profileValidator = formValidator[profileForm.getAttribute("name")];
  profileValidator.resetValidation();
  profileValidator.disableButton();
}

// Event listener for edit button click
editButton.addEventListener("click", () => {
  openEditForm();
  resetProfileForm();
});

// Set event listeners for the profile popup modal
profilePopup.setEventListeners();
