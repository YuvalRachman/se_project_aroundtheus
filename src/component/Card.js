export default class Card {
  constructor({ name, link }, handleImageClick, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;

    this._handleImageClick = handleImageClick;
    // Initialize _cardElement as null
  }
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLike);

    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => this._deleteCard());

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick({ link: this._link, name: this._name })
      );
  }
  _handleLike = () => {
    const likeButton = this._cardElement.querySelector(".card__like-button");

    likeButton.classList.toggle("card__like-button_active");
  };

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    // Create card template
    this._cardElement = this._getTemplate();

    // Set the image link
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = `Photo of ${this._name}`;

    // Set the card title
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardTitle.textContent = this._name;

    // Set the event listeners after creating the card element
    this._setEventListeners();

    return this._cardElement;
  }
}
