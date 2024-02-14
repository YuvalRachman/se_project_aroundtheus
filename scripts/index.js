//sample data for initial cards
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

// Modal elements
const modals = Array.from(document.querySelectorAll(".modal"));
const modalPreview = document.querySelector("#preview_image");

const modalContainers = document.querySelectorAll(".modal__container");
const modalEdit = document.querySelector("#modalEdit");
const modalAddCard = document.querySelector("#modalAddCard");
const modalPreviewClose = document.querySelector("#preview_close");
const modalAddCardCloseButton = modalAddCard.querySelector(".modal__close");
const modalEditClose = modalEdit.querySelector(".modal__close");
const profileEditForm = modalEdit.querySelector(".modal__form");
const addCardEditForm = modalAddCard.querySelector(".modal__form");
const cardTitle = modalAddCard.querySelector(".modal__input_type_title");
const cardUrl = modalAddCard.querySelector(".modal__input_type_url");
const cardCreate = document.querySelector("#createButton");
const previewModalPicture = document.querySelector(".preview__image");
const previewCaptionModal = document.querySelector(".preview__caption");
const cardList = document.querySelector(".cards__list");
const plusEdit = document.querySelector(".profile__card-button");
const penEdit = document.querySelector("#profileButton");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profilleTitleInput = document.querySelector("#profile-title-input");
const profilleSubtitleInput = document.querySelector("#profile-subtitle-input");

const previewContainer = document.querySelector(".preview__container");

// Event  bubbling for delete card
cardList.addEventListener("click", function (e) {
  if (e.target.className == "card__trash-button") {
    const li = e.target.parentElement;
    cardList.removeChild(li);
  }
});
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
// Function to open modals and focus on an element
function openModal(modal) {
  modal.classList.add("modal_opened");
}

// Function to handle profile form submission
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profilleTitleInput.value;
  profileSubtitle.textContent = profilleSubtitleInput.value;
  closeModal(modalEdit);
}

// Function to handle image preview

function previewImage(cardData, previewContainer) {
  const cardImageEL = previewContainer.querySelector(".card__image");

  if (cardImageEL) {
    cardImageEL.addEventListener("click", () => {
      previewModalPicture.src = cardData.link;
      previewCaptionModal.textContent = cardData.name;
      previewModalPicture.alt = `Photo of ${cardData.name}`;
      console.log("aa");
      openModal(modalPreview);
    });
  }
}
function deleteCard(cardElement) {
  cardElement.remove();
}
function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_active");
}

//openPopup(modalPreview);
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitleEL.textContent = cardData.name;
  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;

  // Attach the like button event listener directly for the specific card

  likeButton.addEventListener("click", () => toggleLike(likeButton));

  previewImage(cardData, cardElement);
  return cardElement;
}

// Modify handleCardSubmit to trigger the deleteCard function
function handleCardSubmit(e) {
  e.preventDefault();
  const name = cardTitle.value;
  const link = cardUrl.value;
  const cardData = { name, link };
  const newCard = getCardElement(cardData);
  cardList.prepend(newCard); // Append the new card to the cardList container
  cardTitle.value = "";
  cardUrl.value = "";
  closeModal(modalAddCard); // Close the modal after form submission
}

// Event listener for opening the add card modal
plusEdit.addEventListener("click", () => {
  openModal(modalAddCard);
});

// Event listener for opening the edit profile modal
penEdit.addEventListener("click", () => {
  openModal(modalEdit);
  profilleTitleInput.focus();
  profilleTitleInput.value = profileTitle.textContent;
  profilleSubtitleInput.value = profileSubtitle.textContent;
});
modalEdit.addEventListener("submit", handleProfileEditSubmit);
// Event listener for card form submission
addCardEditForm.addEventListener("submit", handleCardSubmit);

// Event listener for closing the preview modal
modalPreviewClose.addEventListener("click", () => {
  closeModal(modalPreview);
});

// Event listener for closing the add card modal
modalAddCardCloseButton.addEventListener("click", () => {
  closeModal(modalAddCard);
});

// Event listener for closing the edit profile modal
modalEditClose.addEventListener("click", () => {
  closeModal(modalEdit);
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
});
