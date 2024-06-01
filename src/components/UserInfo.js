export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutSelector.textContent,
      avatar: this.getAvatar(),
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutSelector.textContent = about;
  }

  setUserAvatar({ avatar }) {
    this._avatarElement.src = avatar;
  }

  getAvatar() {
    return this._avatarElement.src;
  }
}
