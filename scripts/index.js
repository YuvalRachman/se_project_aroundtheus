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
const modalButtons = document.querySelectorAll(".modal__button");
const previewContainer = document.querySelector(".preview__container");
const closeButtons = document.querySelectorAll(".popup__close");
function openModal(modal) {
  modal.classList.add("modal_opened");
}

// Function to close modals
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Event listener to handle Escape key press
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    // Iterate over each modal and close it
    modals.forEach(closeModal);
    // Remove the event listener for "keydown" when Esc is pressed
    modals.forEach((modal) => {
      modal.removeEventListener("keydown", closeModalOnEscape);
    });
  }
});
modalButtons.forEach((modal) => {
  modal.addEventListener("mousedown", () => {
    closeModal(modal);
  });
});

// Function to handle profile form submission
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profilleTitleInput.value;
  profileSubtitle.textContent = profilleSubtitleInput.value;
  closeModal(modalEdit); // Close the modal after form submission
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
  const deleteButton = cardElement.querySelector(".card__trash-button"); // Select the delete button

  cardTitleEL.textContent = cardData.name;
  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;

  // Attach the like button event listener directly for the specific card
  likeButton.addEventListener("click", () => toggleLike(likeButton));

  // Add event listener to delete button
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

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
  e.target.reset();
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

function closePopup(popup) {
  if (popup) {
    popup.classList.remove("modal_opened");
  }
}

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  if (popup) {
    button.addEventListener("click", () => closePopup(popup));
  }
});
modalPreviewClose.addEventListener("click", () => closePopup(modalPreview));
modalEditClose.addEventListener("click", () => closePopup(modalEdit));
modalAddCardCloseButton.addEventListener("click", () =>
  closePopup(modalAddCard)
);
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
});
