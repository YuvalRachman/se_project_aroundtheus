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
const penEdit = document.querySelector("#penBth");
const modalEdit = document.querySelector("#modalEdit");
const modalClose = document.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profilleTitleInpot = document.querySelector("#profile-title-inpot");
const profilleSubtitleInpot = document.querySelector("#profile-subtitle-inpot");

const profileEditForm = modalEdit.querySelector(".modal__form");
const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
function getCsrdElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  cardTitleEL.textContent = cardData.name;
  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;
  return cardElement;
}
function closePopup() {
  modalEdit.classList.remove("modal_opened");
}

penEdit.addEventListener("click", () => {
  profilleTitleInpot.value = profileTitle.textContent;
  profilleSubtitleInpot.value = profileSubtitle.textContent;
  modalEdit.classList.add("modal_opened");
});
modalClose.addEventListener("click", () => {
  closePopup();
});

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profilleTitleInpot.value;
  profileSubtitle.textContent = profilleSubtitleInpot.value;
  closePopup();
}
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
initialCards.forEach((cardData) => {
  const cardElement = getCsrdElement(cardData);
  cardList.append(cardElement);
});
