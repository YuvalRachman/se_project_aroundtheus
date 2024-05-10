import Api from "../API/Api.js";

export default class Card {
  constructor({ name, link, _id }, handleImageClick, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardId = _id;
    this._cardSelector = cardSelector;
    console.log(this._cardId);
    this._handleImageClick = handleImageClick;
    this._element = this._getTemplate(); // Initialize _element once
    this._likeButton = this._element.querySelector(".card__like-button"); // Initialize _likeButton once
    this._cardImage = this._element.querySelector(".card__image"); // Initialize _cardImage once
    this._trashButton = this._element.querySelector(".card__trash-button"); // Initialize _trashButton once

    this._setEventListeners();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLike);
    this._trashButton.addEventListener("click", () => this._deleteCard());

    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({
        link: this._link,
        name: this._name,
        id: this._cardId,
      })
    );
  }

  _handleLike = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _deleteCard() {
    // Instantiate Api class
    const api = new Api({
      baseUrl: `https://around-api.en.tripleten-services.com/v1`,
      headers: {
        authorization: "59d50a7d-5cbc-4141-92cc-d4a1e1821930",
        "Content-Type": "application/json",
      },
    });

    // Call deleteCard method of the Api class
    api
      .deleteCard(this._cardId)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardImage.src = this._link;
    this._cardImage.alt = `Photo of ${this._name}`;
    this._element.querySelector(".card__title").textContent = this._name;
    return this._element;
  }
}
