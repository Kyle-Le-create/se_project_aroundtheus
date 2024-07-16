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

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "f1ea8f6c-9474-4887-8313-31aaa6ff9aab",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

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

function handleImageClick(cardData) {
  imagePreviewPopup.open(cardData);
}

function handleProfileEditSubmit(data) {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editProfilePopup.close();
}

function handleAddCardSubmit(inputValues) {
  cardSection.addItem({ name: inputValues.title, link: inputValues.url });
  addCardFormElement.reset();
  addCardPopup.close();
  addCardFormValidator.disableButton();
}

// Profile Form

const userInfo = new UserInfo(".profile__title", ".profile__description");

function handleProfileformSubmit(userData) {
  profilePopupForm.close();
  userInfo.setUserInfo(userData);
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  const { title, description } = userInfo.getUserInfo();
  profileTitleInput.value = title;
  profileDescriptionInput.value = description;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => addCardPopup.open());

// Enbale Validation

const addCardFormValidator = new FormValidator(config, addCardFormElement);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(config, profileEditForm);
editProfileFormValidator.enableValidation();
