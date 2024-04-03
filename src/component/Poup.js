export default class Popup {
  constructor({ popupSelector, openSelector = "", preOpenHandler = () => {} }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
    if (openSelector !== "") {
      this._preOpenHandler = preOpenHandler;
      this._openElement = document.querySelector(openSelector);
      this._openElement.addEventListener("click", () => {
        this._preOpenHandler();
        this.open();
      });
    }
    this.closeModalByEscape = this.closeModalByEscape.bind(this); // Binding closeModalByEscape to the class instance
    this.clickOutside = this.clickOutside.bind(this); // Binding clickOutside to the class instance
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this.closeModalByEscape);
    this._closeButton.addEventListener(
      "click",
      this._handleCloseBtn.bind(this)
    ); // Binding handleCloseBtn to the class instance
    document.addEventListener("click", this.clickOutside); // Adding click event listener for outside click to close the modal
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.closeModalByEscape);
    this._closeButton.removeEventListener(
      "click",
      this._handleCloseBtn.bind(this)
    );
    document.removeEventListener("click", this.clickOutside);
  }

  closeModalByEscape(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  clickOutside(event) {
    if (event.target.classList.contains("modal_opened")) {
      this.close();
    }
  }

  _handleCloseBtn() {
    this.close();
  }
}
