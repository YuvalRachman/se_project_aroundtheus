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
(function () {
  // Modal elements
  const modals = Array.from(document.querySelectorAll(".modal"));
  const modalPreview = document.querySelector("#preview_image");

  const modalContainers = document.querySelectorAll(".modal__container");
  const modalEdit = document.querySelector("#modalEdit");
  const modalAddCard = document.querySelector("#modalAddCard");
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
  const profilleSubtitleInput = document.querySelector(
    "#profile-subtitle-input"
  );
  const modalButtons = document.querySelectorAll(".modal__button");
  const previewContainer = document.querySelector(".preview__container");

  // Function to open modals
  function openModal(modal) {
    modal.classList.add("modal_opened");
    // Add event listener for Escape key press
    document.addEventListener("keydown", closeModalOnEscape);
  }

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
        openModal(modalPreview);
      });
    }
  }

  // Function to delete a card
  function deleteCard(cardElement) {
    cardElement.remove();
  }

  // Function to toggle like on a card
  function toggleLike(likeButton) {
    likeButton.classList.toggle("card__like-button_active");
  }

  // Function to get a card element
  function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEL = cardElement.querySelector(".card__image");
    const cardTitleEL = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__trash-button");

    cardTitleEL.textContent = cardData.name;
    cardImageEL.src = cardData.link;
    cardImageEL.alt = cardData.name;

    likeButton.addEventListener("click", () => toggleLike(likeButton));
    deleteButton.addEventListener("click", () => deleteCard(cardElement));
    previewImage(cardData, cardElement);
    return cardElement;
  }

  // Function to handle card form submission
  function handleCardSubmit(e) {
    e.preventDefault();
    const name = cardTitle.value;
    const link = cardUrl.value;
    const cardData = { name, link };
    const newCard = getCardElement(cardData);
    cardList.prepend(newCard);
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

  // Function to close modals
  function closeModal(modal) {
    modal.classList.remove("modal_opened");
    // Remove event listener for Escape key press
    document.removeEventListener("keydown", closeModalOnEscape);
  }

  // Define the event handler function for Escape key press
  function closeModalOnEscape(event) {
    if (event.key === "Escape") {
      // Find the currently active modal
      const activeModal = document.querySelector(".modal_opened");
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  }

  function handleCloseButtonClick() {
    const buttonsClose = document.querySelectorAll(".modal__close");
    buttonsClose.forEach((button) => {
      button.addEventListener("click", () => {
        const popup = button.closest(".modal");
        closeModal(popup);
      });
    });
  }

  // Immediately invoke the function to attach event listeners to close buttons
  handleCloseButtonClick();

  // Event listener for clicking outside the modal to close it
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
})();
