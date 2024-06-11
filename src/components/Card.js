import UserInfo from "./UserInfo.js";
import Api from "../API/Api.js";

export default class Card {
  constructor(
    { name, link, _id, owner, likes },
    handleImageClick,
    cardSelector,
    api,
    handleDelete,
    userInfo,
    userHasLiked
  ) {
    this._name = name;
    this._link = link;
    this._cardId = _id;
    this._owner = owner;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._api = api;
    this._handleDelete = handleDelete;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._trashButton = this._element.querySelector(".card__trash-button");
    this._likeCount = this._element.querySelector(".card__like-num");
    this.userInfo = userInfo;
    this._userHasLiked = userHasLiked;
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
      .then((data) => {
        this._likes = data.likes;
        this._likeCount.textContent = this._likes.length;
        this._handleLike();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  _removeLike = () => {
    this._api
      .removeLike(this._cardId)
      .then((data) => {
        this._likes = data.likes;
        this._likeCount.textContent = this._likes.length;
        this._handleLike();
      })
      .catch((error) => {
        console.error(error.message);
      });
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
    this._likeCount.textContent = Array.isArray(this._likes)
      ? this._likes.length
      : 0;

    if (this._userHasLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    if (this._owner !== this.userInfo.getUserInfo().id) {
      this._trashButton.style.display = "none";
    }

    return this._element;
  }
}
