import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";
import Section from "../components/Section.js";

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const previewImageModal = document.querySelector(".modal__preview");
const modalImage = previewImageModal.querySelector(".modal__image-preview");
const modalTitle = document.querySelector(".modal__image-title");
const modalImageCloseButton = previewImageModal.querySelector(
  "#modal__image-close-button"
);

const createCard = (data) => {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);
cardSection.renderItems();

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardSubmit,
});
addCardPopup.setEventListeners();
// call seteventlisteners for each modal

const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
editProfilePopup.setEventListeners();

const imagePreviewPopup = new PopupWithImage(".modal__preview");
imagePreviewPopup.setEventListeners();

function handleImagePress(data) {
  imagePreviewPopup.open(data);
}

// Form data

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

// Functions

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscape);
//   modal.removeEventListener("mousedown", handlePopupClose);
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscape);
//   modal.addEventListener("mousedown", handlePopupClose);
// }

function handleImageClick(cardData) {
  // modalImage.src = cardData.link;
  // modalImage.alt = cardData.name;
  // modalTitle.textContent = cardData.name;
  imagePreviewPopup.open(cardData);
}

// function renderCard(cardData) {
//   const cardElement = createCard(cardData);
//   cardSection.addItem(cardElement);
// }

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageElement = cardElement.querySelector(".card__image");
//   const cardTitleElement = cardElement.querySelector(
//     ".card__description-title"
//   );
//   const likeButton = cardElement.querySelector(".card__like-button");

//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   const trashButton = cardElement.querySelector(".card__trash-button");
//   trashButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   cardImageElement.addEventListener("click", () => {
//     modalImage.src = cardData.link;
//     modalImage.alt = cardData.name;
//     modalTitle.textContent = cardData.name;
//     imagePreviewPopup.open();
//   });

//   cardImageElement.src = cardData.link;
//   cardTitleElement.textContent = cardData.name;
//   cardImageElement.alt = cardData.name;
//   return cardElement;
// }

function handleProfileEditSubmit(data) {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editProfilePopup.close();
}

function handleAddCardSubmit(inputValues) {
  // const name = cardTitleInput.value;
  // const link = cardUrlInput.value;
  cardSection.addItem({ name: inputValues.title, link: inputValues.url });
  addCardFormElement.reset();
  addCardPopup.close();
  // cardTitleInput.value = "";
  // cardUrlInput.value = "";
  addCardFormValidator.disableButton();
}

// function handleEscape(e) {
//   if (e.key === "Escape") {
//     const openModal = document.querySelector(".modal_opened");
//     closeModal(openModal);
//   }
// }

// // function handlePopupClose(evt) {
// //   if (
// //     evt.target === evt.currentTarget ||
// //     evt.target.classList.contains("modal__close")
// //   ) {
// //     closeModal(evt.currentTarget);
// //   }
// }

// Profile Form

const userInfo = new UserInfo(".profile__title", ".profile__description");

function handleProfileformSubmit(userData) {
  profilePopupForm.close();
  userInfo.setUserInfo(userData);
}

// Event Listeners

// remove submission
// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// addCardFormElement.addEventListener("submit", handleAddCardSubmit);

profileEditButton.addEventListener("click", () => {
  const { title, description } = userInfo.getUserInfo();
  profileTitleInput.value = title;
  profileDescriptionInput.value = description;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => addCardPopup.open());

// For loop that inserts a card

// initialCards.forEach((cardData) => renderCard(cardData, cardListElement));

// Enbale Validation

const addCardFormValidator = new FormValidator(config, addCardFormElement);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(config, profileEditForm);
editProfileFormValidator.enableValidation();
