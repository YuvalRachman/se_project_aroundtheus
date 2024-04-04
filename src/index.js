import Card from "./component/Card.js";
import Section from "./component/Section.js";
import PopupForm from "./component/PopupForm.js";
import "./pages/index.css";
import * as constants from "./component/utils/constants.js";
import FormValidator from "./component/FormValidator.js";
import { PopupImage } from "./component/PopupImage.js";

// Initialize popups
const editPopup = new PopupForm("#modalEdit");
const addCardPopup = new PopupForm("#modalAddCard");
const imagePopup = new PopupImage("#preview_image");

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
// addCardPopup.enableValidator();
// addCardPopup.disableButton();
// imagePopup.setEventListeners();

constants.plusEdit.addEventListener("click", () => {
  editPopup.open();
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

function createCard(cardData) {
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

  return card;
}

function createAndPrependCard(cardData) {
  const card = createCard(cardData);
  const cardElement = card.getView();
  constants.cardsList.prepend(cardElement);
}

constants.initialCards.forEach(createAndPrependCard);
