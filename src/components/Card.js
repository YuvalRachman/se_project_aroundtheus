import Api from "../API/Api.js";

export default class Card {
  constructor(
    { name, link, _id, isLiked }, // Ensure isLiked is received here
    handleImageClick,
    cardSelector,
    api,
    handleDelete
  ) {
    this._name = name;
    this._link = link;
    this._cardId = _id;
    this._isLiked = isLiked; // Store isLiked property
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._api = api;
    this._handleDelete = handleDelete;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._trashButton = this._element.querySelector(".card__trash-button");

    this._setEventListeners();

    // Set initial like button state based on isLiked
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  _setEventListeners() {
    // Event listener for the like button
    this._likeButton.addEventListener("click", () => {
      if (this._isLiked) {
        this._removeLike();
      } else {
        this._addLike();
      }
    });

    // Event listener for the trash button (if available)
    if (this._trashButton) {
      this._trashButton.addEventListener("click", () => {
        this._handleDelete(this._cardId, this._element);
      });
    }

    // Event listener for the card image click
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({
        link: this._link,
        name: this._name,
        id: this._cardId,
      })
    );
  }

  // Method to handle like button state toggling
  _handleLike = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  // Method to add a like to the card
  _addLike() {
    this._api
      .addLike(this._cardId)
      .then((data) => {
        this._isLiked = data.hasLike; // Update isLiked state based on server response
        this._handleLike(); // Toggle visual state of like button
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  // Method to remove a like from the card
  _removeLike() {
    this._api
      .removeLike(this._cardId)
      .then((data) => {
        this._isLiked = data.hasLike; // Update isLiked state based on server response
        this._handleLike(); // Toggle visual state of like button
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  // Method to retrieve card template from the DOM
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // Method to update card view with data
  getView() {
    this._cardImage.src = this._link;
    this._cardImage.alt = `Photo of ${this._name}`;
    this._element.querySelector(".card__title").textContent = this._name;
    return this._element;
  }
}
