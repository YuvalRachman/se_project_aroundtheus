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
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "59d50a7d-5cbc-4141-92cc-d4a1e1821930",
    "Content-Type": "application/json",
  },
});

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
imagePopup.setEventListeners();
function handleImageClick(name, link) {
  // Assuming imagePopup is defined elsewhere
  imagePopup.open(name, link);
}
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
/*                                Card Section                                */
/* -------------------------------------------------------------------------- */
let cardSection;

// Define handleImageClick function

function renderCard(data) {
  // Create a new Card instance with appropriate parameters
  const card = new Card(data, handleImageClick, "#card-template", api);
  return card.getView(); // Return the card view
}

api
  .getInitialCards() // Corrected: Remove the argument from getInitialCards
  .then((initialCards) => {
    // Create a new Section instance for cards
    cardSection = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          // Render each card and add it to the card section
          const cardElement = renderCard(item);
          cardSection.addItem(cardElement);
        },
      },
      ".cards__list"
    );

    // Render items in the card section
    cardSection.renderItems();
  })
  .catch((error) => {
    console.error("Error fetching initial cards:", error);
  });

// Function to handle submission of new card form
function handleAddCardSubmit(data) {
  // Call the API to render a new card
  api
    .renderCard(data.name, data.link)
    .then((newCardData) => {
      // Render the new card and add it to the card section
      const newCardElement = renderCard(newCardData);
      cardSection.addItem(newCardElement);
      addCardPopup.close();
    })
    .catch((error) => {
      console.error("Error rendering new card:", error);
    });
}

// Set event listeners for the profile popup modal
profilePopup.setEventListeners();

// // Load additional data using _loadData() method
// api
//   ._loadData()
//   .then((additionalData) => {
//     // Handle additional data if needed
//   })
//   .catch((error) => {
//     console.error("Error loading additional data:", error);
//   });

// }
/* -------------------------------------------------------------------------- */
/*                                  Add Crad  Form                            */
/* -------------------------------------------------------------------------- */

function openCardForm() {
  // Open the add card form
  addCardPopup.open();
}
// Open the modal when users click on the add button
addCardBut.addEventListener("click", () => {
  openCardForm();
});

const addCardPopup = new PopupWithForm("#modalAddCard", handleAddCardSubmit);

// Set add form event listeners
addCardPopup.setEventListeners();

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
