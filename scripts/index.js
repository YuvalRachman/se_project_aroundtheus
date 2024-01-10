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
const modalEdit = document.querySelector("#modalEdit");
const modalAddCard = document.querySelector("#modalAddCard");
const modalPreviewClose = document.querySelector("#preview_close");
const modalPlusClose = modalAddCard.querySelector(".modal__close");
const modalEditClose = modalEdit.querySelector(".modal__close");
const profileEditForm = modalEdit.querySelector(".modal__form");
const addCardEditForm = modalAddCard.querySelector(".modal__form");
const cardTitle = modalAddCard.querySelector(".modal__input_type_title");
const cardUrl = modalAddCard.querySelector(".modal__input_type_url");
const previewModal = document.querySelector(".modal_preview");
const previewCoptionModal = document.querySelector(".modal_coption");
const cardList = document.querySelector(".cards__list");
const plusEdit = document.querySelector(".profile__card-button");
const penEdit = document.querySelector("#profileButton");
const trashDelete = document.querySelector(".card__trash-button");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profilleTitleInpot = document.querySelector("#profile-title-inpot");
const profilleSubtitleInpot = document.querySelector("#profile-subtitle-inpot");

const previewContainerR = document.querySelector(".preview_image-container");
// Function to activate like button
function buttonActiv() {
  const likeButton = document.querySelectorAll(".card__like-button");
  likeButton.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("card__like-button-activ");
    });
  });
}

// Function to handle image preview
function previewImage(cardData, previewContainer) {
  const cardImageEL = previewContainer.querySelector(".card__image");

  if (cardImageEL) {
    cardImageEL.addEventListener("click", () => {
      previewModal.src = cardData.link;
      previewCoptionModal.textContent = cardData.name;
      previewModal.alt = `Photo of ${cardData.name}`;
      modalPreviewClose.style.visibility = "visible";
      previewContainerR.style.visibility = "visible";

      // Dynamically adjust the position of #preview_close
      //  adjustPreviewClosePosition();
    });
  }
}

function deleteCard(event) {
  if (event.target.classList.contains("card__trash-button")) {
    const cardElement = event.target.closest(".card");
    if (cardElement) {
      cardElement.remove();
    }
  }
}

// Attach the event listener to the cardList element
cardList.addEventListener("click", deleteCard);

// Modify handleCardSubmit to trigger the deleteCard function
function handleCardSubmit(e) {
  e.preventDefault();
  const name = cardTitle.value;
  const link = cardUrl.value;
  const cardData = { name, link };

  const newCard = getCardElement(cardData);
  cardList.prepend(newCard);

  // Trigger deleteCard for the new card
  deleteCard({ target: newCard });

  buttonActiv();
  closePopup();
}
// Function to create a new card element
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  const trashDelete = cardElement.querySelector(".card__trash-button");

  cardTitleEL.textContent = cardData.name;
  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;

  // Use deleteCard as the event listener
  trashDelete.addEventListener("click", deleteCard);

  previewImage(cardData, cardElement);

  return cardElement;
}

// Function to close modals and reset preview
function closePopup() {
  modalEdit.classList.remove("modal_opened");
  modalAddCard.classList.remove("modal_opened");
  previewModal.src = "";
  previewCoptionModal.textContent = "";
  previewModal.alt = "";
  modalPreviewClose.style.visibility = "hidden";
  previewContainerR.style.visibility = "hidden";
}

// Event listener for opening the add card modal
plusEdit.addEventListener("click", () => {
  modalAddCard.classList.add("modal_opened");
  setTimeout(() => {
    cardTitle.focus();
  }, 0);
});

// Event listener for opening the edit profile modal
penEdit.addEventListener("click", () => {
  profilleTitleInpot.value = profileTitle.textContent;
  profilleSubtitleInpot.value = profileSubtitle.textContent;
  setTimeout(() => {
    profilleTitleInpot.focus();
  }, 0);
  modalEdit.classList.add("modal_opened");
});

// Event listener for closing the preview modal
modalPreviewClose.addEventListener("click", () => {
  closePopup();
});

// Event listener for closing the add card modal
modalPlusClose.addEventListener("click", () => {
  closePopup();
});

// Event listener for closing the edit profile modal
modalEditClose.addEventListener("click", () => {
  closePopup();
});

// Function to handle profile form submission
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profilleTitleInpot.value;
  profileSubtitle.textContent = profilleSubtitleInpot.value;

  closePopup();
}

// Event listener for profile form submission
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Event listener for card form submission
addCardEditForm.addEventListener("submit", handleCardSubmit);

// Loop to initialize cards from the initialCards array
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
  buttonActiv();
});
