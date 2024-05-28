import Popup from "./Popup.js";

export default class Card {
  constructor(
    { name, link, _id },
    handleImageClick,
    cardSelector,
    api,
    handleDelete
  ) {
    this._name = name;
    this._link = link;
    this._cardId = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._api = api;
    this._handleDelete = handleDelete;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._trashButton = this._element.querySelector(".card__trash-button");
    this._likeCount = this._element.querySelector(".card__like-num");

    this._setEventListeners();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("card__like-button_active")) {
        this._removeLike();
      } else {
        this._addLike();
      }
    });

    this._trashButton.addEventListener("click", () =>
      this._handleDelete(this._cardId, this._element)
    );
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

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _addLike = () => {
    this._api
      .addLike(this._cardId)
      .then(() => {
        this._countLikesAdd();
        this._handleLike();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  _removeLike = () => {
    this._api
      .removeLike(this._cardId)
      .then(() => {
        this._countLikesRemove();
        this._handleLike();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  _countLikesAdd = () => {
    const currentLikes = parseInt(this._likeCount.textContent, 10);
    this._likeCount.textContent = currentLikes + 1;
  };

  _countLikesRemove = () => {
    const currentLikes = parseInt(this._likeCount.textContent, 10);
    this._likeCount.textContent = currentLikes - 1;
  };

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
