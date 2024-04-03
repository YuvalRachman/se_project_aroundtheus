import { openModal, closeModalOnEscape, closeModal } from "../index.js";
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
