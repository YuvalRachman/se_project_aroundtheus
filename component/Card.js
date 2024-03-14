import { openModal, closeModalOnEscape } from "../pages/index.js";
const modalAddCard = document.getElementById("modalAddCard");
const cardTitle = modalAddCard.querySelector(".modal__input_type_title");
const cardUrl = modalAddCard.querySelector(".modal__input_type_url");

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  // Remove event listener for Escape key press
  document.removeEventListener("keydown", closeModalOnEscape);
}

export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    if (this._cardElement) {
      this._cardElement
        .querySelector(".card__like-button")
        .addEventListener("click", this._handleLike);

      this._cardElement
        .querySelector(".card__trash-button")
        .addEventListener("click", this._deleteCard);

      this._cardElement
        .querySelector(".card__image")
        .addEventListener("click", this._handleImageClick);
    }
  }

  _handleLike = () => {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (likeButton) {
      likeButton.classList.toggle("card__like-button_active");
    }
  };

  _deleteCard = () => {
    this._cardElement.remove();
  };

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    if (this._cardElement) {
      this._setEventListeners();

      const cardImageEL = this._cardElement.querySelector(".card__image");
      const cardTitleEL = this._cardElement.querySelector(".card__title");

      cardTitleEL.textContent = this._name;
      cardImageEL.src = this._link;
      cardImageEL.alt = this._name;
    }

    return this._cardElement;
  }
}

// Initialize card elements from initialCards data
const cardList = document.querySelector(".cards__list");
export const initialCards = [
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

export function createAndAppendCard(cardData) {
  const handleImageClick = () => {
    const { name, link } = cardData;
    const previewCaptionModal = document.querySelector(".preview__caption");
    const previewModalPicture = document.querySelector(".preview__image");
    const modalPreview = document.querySelector("#preview_image");

    if (previewModalPicture && previewCaptionModal && modalPreview) {
      previewModalPicture.src = link;
      previewCaptionModal.textContent = name;
      previewModalPicture.alt = `Photo of ${name}`;
      openModal(modalPreview);
    }
  };

  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardList.append(cardElement);
}

export function handleCardSubmit(e) {
  e.preventDefault();
  const name = cardTitle.value;
  const link = cardUrl.value;
  const cardData = { name, link };
  const card = new Card(cardData, "#card-template", this._handleImageClick);
  e.target.reset();
  closeModal(modalAddCard);
  initialCards.push(cardData);
  createAndAppendCard(cardData);
}

initialCards.forEach(createAndAppendCard);
