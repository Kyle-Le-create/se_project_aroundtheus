import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import { config } from "../utils/constants.js";

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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "65e7222e-9077-40ab-ad47-86d360e310e2",
    "Content-Type": "application/json",
  },
});

const editAvatarPopup = new PopupWithForm({
  popupSelector: "#edit-avatar-modal",
  handleFormSubmit: handleAvatarFormSubmit,
});
editAvatarPopup.setEventListeners();

const profileAvatarForm = document.forms["avatar-form"];
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const avatarFormValidator = new FormValidator(config, profileAvatarForm);
avatarFormValidator.enableValidation();

let userId;

profileAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  avatarFormValidator.resetValidation();
});

const createCard = (data) => {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeCard
  );
  return card.getView();
};

// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: createCard,
//   },
//   ".cards__list"
// );
// cardSection.renderItems();

let cardSection;

api
  .getAppData()
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });
    userInfo.setUserAvatar({ avatar: userData.avatar });
    userId = userData._id;

    cardSection = new Section(
      { items: initialCards, renderer: createCard },
      ".cards__list"
    );

    cardSection.renderItems();
  })
  .catch(console.error);

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
  // data is an object with name and subtitle
  editProfilePopup.renderLoading(true);
  api
    .updateProfileInfo(data)
    .then(() => {
      userInfo.setUserInfo({ title: data.name, description: data.subtitle });
      // profileTitle.textContent = profileTitleInput.value;
      // profileDescription.textContent = profileDescriptionInput.value;
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
      alert(`${err}, Could not update user info!`);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
}

function handleAddCardSubmit(inputValues) {
  // addCardFormElement.reset();
  // addCardPopup.close();
  // addCardFormValidator.disableButton();
  addCardPopup.renderLoading(true);
  api
    .addCard({ name: inputValues.title, link: inputValues.url })
    .then((newCardData) => {
      cardSection.addItem(newCardData);
      addCardFormElement.reset();
      addCardFormValidator.resetValidation();
      addCardPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
}

function handleAvatarFormSubmit(data) {
  editAvatarPopup.renderLoading(true);
  api
    .updateProfileAvatar(data.url)
    .then((res) => {
      userInfo.setUserAvatar(res);
      editAvatarPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    });
}

const deleteCardPopup = new PopupDeleteCard({
  popupSelector: "#delete-card-modal",
});
deleteCardPopup.setEventListeners();

// Profile Form

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

// function handleProfileformSubmit(userData) {
//   // profilePopupForm.close();
//   // userInfo.setUserInfo(userData);
//   api
//     .updateProfileInfo({
//       name: userData.title,
//       description: userData.description,
//     })
//     .then((updatedUserData) => {
//       userInfo.setUserInfo({
//         title: updatedUserData.name,
//         description: updatedUserData.about,
//       });
//       profilePopup.close();
//     })
//     .catch(console.error);
// }

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

function handleDeleteCard(cardId, card) {
  deleteCardPopup.open();
  deleteCardPopup.handleDeleteConfirm(() => {
    deleteCardPopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        card.handleDeleteCard();
        deleteCardPopup.close();
      })
      .catch(console.error)
      .finally(() => {
        deleteCardPopup.renderLoading(false);
      });
  });
}

function handleLikeCard(cardId, cardElement) {
  if (cardElement.getIsLikedState()) {
    api
      .unlikeCard(cardId)
      .then((updatedCardData) => {
        cardElement.flipLikeState();
        cardElement.updateLikes(updatedCardData.isLiked);
      })
      .catch(console.error);
  } else {
    api
      .likeCard(cardId)
      .then((updatedCardData) => {
        cardElement.flipLikeState();
        cardElement.updateLikes(updatedCardData.isLiked);
      })
      .catch(console.error);
  }
}
