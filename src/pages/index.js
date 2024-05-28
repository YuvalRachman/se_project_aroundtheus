import Api from "../API/Api.js";
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
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";

// DOM Elements
const editButton = document.querySelector(".profile__button");
const modalInputTitle = document.querySelector("#profile-title-input");
const modalInputSubtitle = document.querySelector("#profile-subtitle-input");
const addCardButton = document.querySelector(".profile__card-button");

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

const formValidator = {};

const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.modalSelector)
  );

  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    const formName = formElement.getAttribute("name");
    formValidator[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationSettings);

/* -------------------------------------------------------------------------- */
/*                             Profile Information                            */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo(
  formSettings.profileName,
  formSettings.profileSubtitle
);

const profilePopup = new PopupWithForm(
  formSettings.modalProfile,
  ({ name, subtitle }) => {
    userInfo.setUserInfo(name, subtitle);
    profilePopup.close();
  }
);

/* -------------------------------------------------------------------------- */
/*                                 Popup Image                                */
/* -------------------------------------------------------------------------- */

const imagePopup = new PopupWithImage(formSettings.modalImage);
imagePopup.setEventListeners();

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

/* -------------------------------------------------------------------------- */
/*                                Card Section                                */
/* -------------------------------------------------------------------------- */

let cardSection;

function handleConfirmationOpen(cardId, cardElement) {
  deletePopup.open(cardId, cardElement);
}

function renderCard(data) {
  const card = new Card(
    data,
    handleImageClick,
    "#card-template",
    api,
    handleConfirmationOpen
  );
  return card.getView();
}
console.log(111);
const deletePopup = new PopupWithConfirm(
  "#verify__card__delete",
  (cardId, cardElement) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deletePopup.close();
      })
      .catch((error) => console.error(error.message));
  }
);
deletePopup.setEventListeners();

console.log(333);
function renderInitialCards() {
  cardSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const cardElement = renderCard(item);
        cardSection.addItem(cardElement);
      },
    },
    ".cards__list"
  );
  cardSection.renderItems();
}

// Render initial cards from the array
renderInitialCards();

// Fetch and render initial cards from the server
api
  .getInitialCards()
  .then((initialCardsFromServer) => {
    initialCardsFromServer.forEach((item) => {
      const cardElement = renderCard(item);
      cardSection.addItem(cardElement);
    });
  })
  .catch((error) => console.error("Error fetching initial cards:", error));

function handleAddCardSubmit(data) {
  api
    .createCard(data.name, data.link)
    .then((newCardData) => {
      const newCardElement = renderCard(newCardData);
      cardSection.addItem(newCardElement);
      addCardPopup.close();
    })
    .catch((error) => console.error("Error creating new card:", error));
}

const addCardPopup = new PopupWithForm("#modalAddCard", handleAddCardSubmit);
addCardPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                  Edit Form                                 */
/* -------------------------------------------------------------------------- */

function openEditForm() {
  const profileInfo = userInfo.getUserInfo();
  modalInputTitle.value = profileInfo.name;
  modalInputSubtitle.value = profileInfo.subtitle;
  profilePopup.open();
}

function resetProfileForm() {
  const profileValidator = formValidator[profileForm.getAttribute("name")];
  profileValidator.resetValidation();
  profileValidator.disableButton();
}

editButton.addEventListener("click", () => {
  openEditForm();
  resetProfileForm();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
