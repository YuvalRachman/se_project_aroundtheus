export const initialCards = [
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

export const formSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error",
  errorVisibleClass: "modal__input-error_visible",
  cardsList: ".cards__list",
  cardTemplate: "#card-template",
};

// Instead of directly accessing DOM elements, export selectors and retrieve them dynamically when needed.
export const modals = () => Array.from(document.querySelectorAll(".modal"));

export const modalEdit = () => document.querySelector("#modalEdit");
export const modalAddCard = () => document.querySelector("#modalAddCard");
export const cardTitle = () =>
  modalAddCard().querySelector(".modal__input_type_title");
export const cardUrl = () =>
  modalAddCard().querySelector(".modal__input_type_url");
export const plusEdit = () => document.querySelector(".profile__card-button");
export const editProfileForm = () => document.querySelector("#profileButton");
export const profileTitle = () => document.querySelector(".profile__title");
export const profileSubtitle = () =>
  document.querySelector(".profile__subtitle");
export const profilleTitleInput = () =>
  document.querySelector("#profile-title-input");
export const profilleSubtitleInput = () =>
  document.querySelector("#profile-subtitle-input");

//
