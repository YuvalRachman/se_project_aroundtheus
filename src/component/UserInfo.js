export default class UserInfo {
  constructor({ titleSelector, descriptionSelector }) {
    this._title = document.querySelector(titleSelector);
    this._description = document.querySelector(descriptionSelector);
  }
  getInfo() {
    return {
      title: this._title.textContent,
      description: this._description.textContent,
    };
  }
  setInfo({ title, description }) {
    this._title.textContent = title;
    this._description.textContent = description;
  }
}
