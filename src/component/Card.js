export default class Card {
  constructor({ data, handleImageClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    console.log(this._cardSelector);
    this._handleImageClick = handleImageClick;
    this._cardElement = null; // Initialize _cardElement as null
  }

  _setEventListeners() {
    if (this._cardElement) {
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

    // Set the event listeners
    this._setEventListeners();

    return this._cardElement;
  }
}
