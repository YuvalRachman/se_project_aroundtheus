export default class UserInfo {
  constructor(nameSelctor, subtitleSelctor) {
    this._name = document.querySelector(nameSelctor);
    this._subtitle = document.querySelector(subtitleSelctor);
  }

  getInfo() {
    return {
      name: this._name.textContent,
      subtitle: this._subtitle.textContent,
    };
  }

  setInfo(name, subtitle) {
    this._name.textContent = name;
    this._subtitle.textContent = subtitle;
  }
}
