import Api from "../API/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css";
import {
  validationSettings,
  formSettings,
  initialCards,
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";

// DOM Elements
const editButton = document.querySelector(".profile__button");
const modalInputTitle = document.querySelector("#profile-title-input");
const modalInputSubtitle = document.querySelector("#profile-subtitle-input");
const addCardButton = document.querySelector(".profile__card-button");
const editAvatar = document.querySelector(".profile__avatar");
const addCardForm = document.forms["formAddCard"];
const profileForm = document.forms["profileForm"];
const profileAvatarForm = document.forms["profileAvatarForm"];

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
  formSettings.profileSubtitle,
  formSettings.avatarSelector
);

const profilePopup = new PopupWithForm(
  formSettings.modalProfile,
  ({ name, about }) => {
    api
      .updateUser(name, about)
      .then(() => {
        userInfo.setUserInfo({ name, about });
        profilePopup.close();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  }
);
const avatarPopup = new PopupWithForm("#modalAvatar", ({ avatar }) => {
  api
    .updateAvatar(avatar)
    .then(() => {
      userInfo.setUserAvatar({ avatar });
      avatarPopup.close();
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    });
});

/* -------------------------------------------------------------------------- */
/*                                 Popup Image                                */
/* -------------------------------------------------------------------------- */

const imagePopup = new PopupWithImage(formSettings.modalImage);

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

/* -------------------------------------------------------------------------- */
/*                                Card Section                                */
/* -------------------------------------------------------------------------- */

function handleConfirmationOpen(cardId, cardElement) {
  deletePopup.open(cardId, cardElement);
}

function createCard(data) {
  const card = new Card(
    data,
    handleImageClick,
    "#card-template",
    api,
    handleConfirmationOpen
  );
  return card.getView();
}

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

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

const addCardPopup = new PopupWithForm("#modalAddCard", handleAddCardSubmit);

function handleAddCardSubmit(data) {
  api
    .renderCard(data.name, data.link)
    .then((newCardData) => {
      const newCardElement = createCard(newCardData);
      cardSection.addItem(newCardElement);
      addCardPopup.close();
    })
    .catch((error) => console.error("Error creating new card:", error));
}

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Fetch and render initial cards from the server
api.getInitialCards().then((initialCardsFromServer) => {
  initialCardsFromServer.forEach((item) => {
    const cardElement = createCard(item);
    cardSection.addItem(cardElement);
  });
});
// .catch((error) => console.error("Error fetching initial cards:", error));
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
function resetAddCardForm() {
  const cardValidator = formValidator[addCardForm.getAttribute("name")];
  cardValidator.resetValidation();
  cardValidator.disableButton();
}

function resetAvatarForm() {
  const avatarValidator = formValidator[profileAvatarForm.getAttribute("name")];
  avatarValidator.resetValidation();
  avatarValidator.disableButton();
}

/* -------------------------------------------------------------------------- */
/*                                 Setting popup                             */
/* -------------------------------------------------------------------------- */
editButton.addEventListener("click", () => {
  openEditForm();
  resetProfileForm();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
  resetAddCardForm();
});
editAvatar.addEventListener("click", () => {
  avatarPopup.open();
  resetAvatarForm();
});
imagePopup.setEventListeners();
deletePopup.setEventListeners();
addCardPopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();
