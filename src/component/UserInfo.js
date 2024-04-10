export default class UserInfo {
  constructor({ title, subtitle }) {
    this._name = document.querySelector(title);
    this._subtitle = document.querySelector(subtitle);
  }
  getInfo() {
    return {
      name: this._name.textContent,
      subtitle: this._subtitle.textContent,
    };
  }
  setInfo(data) {
    this._name.textContent = data.name;
    this._subtitle.textContent = data.subtitle;
  }
}
