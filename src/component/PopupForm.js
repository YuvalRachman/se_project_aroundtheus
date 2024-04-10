import Popup from "./Popup.js";

export default class PopupForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector); // Pass an object with popupSelector as a property
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    console.log(this._popupForm);
    this._inputList = this._popupForm.querySelectorAll("input");
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners(); // Call the parent method to ensure event listeners are properly set up
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
