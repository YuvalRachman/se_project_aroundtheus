export default class Card {
  constructor({ name, link }, handleImageClick, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._element = this._getTemplate(); // Initialize _element once
    this._likeButton = this._element.querySelector(".card__like-button"); // Initialize _likeButton once
    this._cardImage = this._element.querySelector(".card__image"); // Initialize _cardImage once
    this._trashButton = this._element.querySelector(".card__trash-button"); // Initialize _trashButton once

    this._setEventListeners(); // Call _setEventListeners once
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLike);
    this._trashButton.addEventListener("click", () => this._deleteCard());
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({ link: this._link, name: this._name })
    );
  }

  _handleLike = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _deleteCard() {
    this._element.remove();
    this._element = null;
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
