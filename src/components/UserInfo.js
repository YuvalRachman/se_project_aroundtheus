export default class UserInfo {
  constructor(nameSelector, subtitleSelctor) {
    this._name = document.querySelector(nameSelector);
    this._subtitle = document.querySelector(subtitleSelctor);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      subtitle: this._subtitle.textContent,
    };
  }

  setUserInfo(name, subtitle) {
    this._name.textContent = name;
    this._subtitle.textContent = subtitle;
  }
}
