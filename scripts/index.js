const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
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
];
const plusEdit = document.querySelector(".profile__button-plus");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const penEdit = document.querySelector("#penBth");
const modalEdit = document.querySelector("#modalEdit");
const modalAddCard = document.querySelector("#modalAddCard");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profilleTitleInpot = document.querySelector("#profile-title-inpot");
const profilleSubtitleInpot = document.querySelector("#profile-subtitle-inpot");
const modalPlusClose = modalAddCard.querySelector(".modal__close");
const modalEditClose = modalEdit.querySelector(".modal__close");
const profileEditForm = modalEdit.querySelector(".modal__form");
const cardList = document.querySelector(".cards__list");

const trashDelete = document.querySelector(".card__trash-button");
const addCardEditForm = modalAddCard.querySelector(".modal__form");

const cardTitle = modalAddCard.querySelector(".modal__input_type_title");
const cardUrl = modalAddCard.querySelector(".modal__input_type_url");
function buttonActiv() {
  const likeButton = document.querySelectorAll(".card__like-button");
  likeButton.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("card__like-button-activ");
    });
  });
}

function handleCardSubmit(e) {
  e.preventDefault();

  const name = cardTitle.value;
  const link = cardUrl.value;
  const newCard = getCardElement({
    name,
    link,
  });
  cardList.prepend(newCard);

  buttonActiv();
  closePopup();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  cardTitleEL.textContent = cardData.name;
  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;
  buttonActiv();
  closePopup();
  return cardElement;
}

function closePopup() {
  modalEdit.classList.remove("modal_opened");
  modalAddCard.classList.remove("modal_opened");
}

plusEdit.addEventListener("click", () => {
  modalAddCard.classList.add("modal_opened");
});

penEdit.addEventListener("click", () => {
  profilleTitleInpot.value = profileTitle.textContent;
  profilleSubtitleInpot.value = profileSubtitle.textContent;
  modalEdit.classList.add("modal_opened");
});

modalPlusClose.addEventListener("click", () => {
  closePopup();
});

modalEditClose.addEventListener("click", () => {
  closePopup();
});

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profilleTitleInpot.value;
  profileSubtitle.textContent = profilleSubtitleInpot.value;
  closePopup();
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardEditForm.addEventListener("submit", handleCardSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
  buttonActiv();
});
