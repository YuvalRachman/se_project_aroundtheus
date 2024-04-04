import Card from "./component/Card.js";
import Section from "./component/Section.js";
import PopupForm from "./component/PopupForm.js";
import "./pages/index.css";
import * as constants from "./component/utils/constants.js";
import FormValidator from "./component/FormValidator.js";
import { PopupImage } from "./component/PopupImage.js";
import UserInfo from "./component/UserInfo.js";

// Initialize popups
const imagePopup = new PopupImage("#preview_image");
const editPopup = new PopupForm({
  popupSelector: "#modalEdit",
  handleFormSubmit: handleProfileFormSubmit,
});
const addCardPopup = new PopupForm({
  popupSelector: "#modalAddCard",
  handleFormSubmit: handleAddCardFormSubmit,
});

// Set event listeners for popups
editPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

// Initialize cards section
const cardsWrap = new Section(
  {
    items: constants.initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

// Initialize form validators
const profileFormValidator = new FormValidator(
  "#edit__profile__form",
  constants.formSettings
);
const cardFormValidator = new FormValidator(
  "#add__card__form",
  constants.formSettings
);

profileFormValidator.enableValidator();
profileFormValidator.disableButton();
cardFormValidator.enableValidator();
cardFormValidator.disableButton();

editPopup.setFormValidator(profileFormValidator);
addCardPopup.setFormValidator(cardFormValidator);

// Event listeners
constants.plusEdit.addEventListener("click", () => {
  addCardPopup.open();
});

constants.editProfileForm.addEventListener("click", () => {
  editPopup.open();
});

constants.cardsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    const cardElement = event.target.closest(".card");
    const cardData = cardElement.dataset;
    handleImageClick(cardData);
  }
});

// Function to handle image click
function handleImageClick(data) {
  imagePopup.open(data.link, data.name);
}
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__subtitle",
});

function handleProfileFormSubmit({ title, description }) {
  userInfo.setUserInfo({ title, description });
  profileEditPopup.close();
}
function handleAddCardFormSubmit({ name, link }) {
  const newCard = renderCard({ name, link });
  cardsWrap.addItem(newCard);
  newCardPopup.close();
  newCardPopup.reset();
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", () => {
    const { name, link } = cardData;
    const modalPreview = document.querySelector("#preview_image");

    if (modalPreview) {
      const previewCaptionModal =
        modalPreview.querySelector(".preview__caption");
      const previewModalPicture = modalPreview.querySelector(".preview__image");

      if (previewModalPicture && previewCaptionModal) {
        previewModalPicture.src = link || "";
        previewCaptionModal.textContent = name || "";
        previewModalPicture.alt = `Photo of ${name || ""}`;
      }
    }
  });

  return card.getView();
}
cardsWrap.renderItems();
