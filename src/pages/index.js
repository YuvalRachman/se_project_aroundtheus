import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css";
import { validationSettings, formSettings } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";

// DOM Elements

const editButton = document.querySelector(".profile__button");
const modalInputTitle = document.querySelector("#profile-title-input");
const modalInputAbout = document.querySelector("#profile-subtitle-input");
const modalInputAvatar = document.querySelector("#profile-avatar-input");
const addCardButton = document.querySelector(".profile__card-button");
const editAvatar = document.querySelector(".profile__avatar");
const creatCardButton = document.querySelector(".modal__button");
const addCardForm = document.forms["formAddCard"];
const profileForm = document.forms["profileForm"];
const profileAvatarForm = document.forms["profileAvatarForm"];
const resetButton = document.querySelector("#resetButton");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "16081f5d-5388-4376-aa61-c2dcfd9d649c",
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
    profilePopup.showLoading();
    api
      .updateUser(name, about)
      .then((data) => {
        userInfo.setUserInfo(data);
        profilePopup.close();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      })
      .finally(() => {
        profilePopup.hideLoading();
      });
  }
);

const avatarPopup = new PopupWithForm("#modalAvatar", ({ avatar }) => {
  avatarPopup.showLoading();
  api
    .updateAvatar(avatar)
    .then((data) => {
      userInfo.setAvatarInfo({ avatar: data.avatar });
      avatarPopup.close();
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    })
    .finally(() => {
      avatarPopup.hideLoading();
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

const existingCardIds = new Set();

function createCard(data) {
  if (existingCardIds.has(data._id)) {
    return null; // Card already exists, do not create a duplicate
  }

  const card = new Card(
    data,
    handleImageClick,
    "#card-template",
    api,
    handleDelete
  );
  const cardElement = card.getView();
  cardElement.dataset.id = data._id;
  existingCardIds.add(data._id);
  return cardElement;
}

function handleDelete(cardId, cardElement) {
  handleConfirmationOpen(cardId, cardElement);
}

const deletePopup = new PopupWithConfirm(
  "#verify__card__delete",
  (cardId, cardElement) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deletePopup.close();
        existingCardIds.delete(cardId); // Remove from Set when card is deleted
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  }
);

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      if (cardElement) {
        cardSection.addItem(cardElement);
      }
    },
  },
  ".cards__list"
);

const addCardPopup = new PopupWithForm("#modalAddCard", (data) => {
  addCardPopup.showLoading(); // Show loading before API call
  api
    .renderCard(data.name, data.link)
    .then((newCardData) => {
      const cardElement = createCard(newCardData);
      if (cardElement) {
        cardSection.addItem(cardElement);

        const formName = document
          .querySelector("#modalAddCard .modal__form")
          .getAttribute("name");
        formValidator[formName].resetValidation();
        addCardPopup.close();
      }
    })
    .catch((error) => {
      console.error("Error creating new card:", error);
    })
    .finally(() => {
      addCardPopup.hideLoading();
    });
});
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

api
  .showPromiseStatus()
  .then(({ initialCards, fetchedUserInfo }) => {
    userInfo.setUserInfo(fetchedUserInfo);
    userInfo.setAvatarInfo(fetchedUserInfo);
    initialCards.forEach((card) => {
      const cardElement = createCard(card);
      if (cardElement) {
        cardSection.addItem(cardElement);
      }
    });
    cardSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.error(err);
  });

/* -------------------------------------------------------------------------- */
/*                              exponential backoff                           */
/* -------------------------------------------------------------------------- */

// // Define the exponential backoff function with retries and initial delay
// const exponentialBackoff = (fn, retries = 3, initialDelay = 3000) => {
//   return new Promise((resolve, reject) => {
//     const attempt = (retryCount) => {
//       fn()
//         .then(resolve)
//         .catch((err) => {
//           if (retryCount <= 0) {
//             reject(err); // Reject if no more retries left
//           } else {
//             setTimeout(() => {
//               attempt(retryCount - 1); // Retry after delay
//             }, initialDelay * Math.pow(2, retries - retryCount)); // Exponential delay
//           }
//         });
//     };
//     attempt(retries); // Start attempt with maximum retries
//   });
// };

// // DOM Elements
// const cardList = document.querySelector(".cards__list");

// // Event listener for reset button
// resetButton.addEventListener("click", () => {
//   const cardElements = Array.from(cardList.querySelectorAll(".card"));
//   resetCards(cardElements);
// });

// // Function to reset cards with exponential backoff and delay between deletions
// function resetCards(cardElements) {
//   let index = 0;

//   const deleteNextCard = () => {
//     if (index >= cardElements.length) return; // Exit if all cards deleted

//     const cardElement = cardElements[index];
//     const cardId = cardElement.dataset.id;

//     exponentialBackoff(() => api.deleteCard(cardId)) // Using the exponential backoff function
//       .then(() => {
//         cardElement.remove(); // Remove card from DOM after successful deletion
//         existingCardIds.delete(cardId); // Remove from Set when card is deleted
//       })
//       .catch((err) => {
//         console.error(`Error deleting card ${cardId}:`, err); // Log error if deletion fails
//       })
//       .finally(() => {
//         index++; // Move to next card
//         setTimeout(deleteNextCard, 1000); // Delay before deleting next card (1 second)
//       });
//   };

//   deleteNextCard(); // Start the deletion process
// }
/* -------------------------------------------------------------------------- */
/*                                  Edit Form                                 */
/* -------------------------------------------------------------------------- */

function openEditForm() {
  const profileInfo = userInfo.getUserInfo();
  modalInputTitle.value = profileInfo.name;
  modalInputAbout.value = profileInfo.about;
  modalInputAvatar.value = profileInfo.avatar;

  profilePopup.open();
}

function resetProfileForm() {
  const profileValidator = formValidator[profileForm.getAttribute("name")];
  profileValidator.resetValidation();
  profileValidator.disableButton();
}

function resetAddCardForm() {
  const addCardValidator = formValidator[addCardForm.getAttribute("name")];
  addCardValidator.resetValidation();
  addCardValidator.disableButton();
}

function resetAvatarForm() {
  const avatarValidator = formValidator[profileAvatarForm.getAttribute("name")];
  avatarValidator.resetValidation();
  avatarValidator.disableButton();
}

editButton.addEventListener("click", () => {
  openEditForm();
  resetProfileForm();
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
