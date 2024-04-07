export default class Card {
  constructor({ data, handleImageClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = null; // Initialize _cardElement as null
    console.log(this._cardSelector);
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
    // Assign _cardElement at the beginning of the method
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    const cardImageEL = this._cardElement.querySelector(".card__image");
    const cardTitleEL = this._cardElement.querySelector(".card__title");

    cardTitleEL.textContent = this._name;
    cardImageEL.src = this._link;
    cardImageEL.alt = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
