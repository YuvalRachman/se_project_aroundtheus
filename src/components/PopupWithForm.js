import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");

    this._formInputs = this._popupForm.querySelectorAll("input");

    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonOriginalText = this._submitButton.textContent;
  }

  // Method to show the loading state
  showLoading() {
    this._submitButton.textContent = "Saving...";
  }

  // Method to hide the loading state
  hideLoading() {
    this._submitButton.textContent = this._submitButtonOriginalText;
  }

  // Collects data from all the input fields and returns the data as an object
  _getInputValues() {
    // Make a input data object
    const inputObject = {};
    // Name each input by its value
    this._formInputs.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    // Return the data as an object
    return inputObject;
  }

  setEventListeners() {
    // Add the 'click' event listener to the close icon
    super.setEventListeners();

    // Add the 'submit' event handler to the form
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
    });
  }
}
