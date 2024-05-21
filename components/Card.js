class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());

    this._trashButton.addEventListener("click", () => this._handleDeleteCard());

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle("card__like-button_active");
    this._likeButton.addEventListener("click", this._handleLikeButton);
  };

  _handleDeleteCard() {
    cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");

    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitleElement = this._cardElement.querySelector(
      ".card__description-title"
    );

    this._cardImageElement.src = this._cardData.link;
    this._cardTitleElement.textContent = this._cardData.name;
    this._cardImageElement.alt = this._cardData.name;

    this._setEventListeners();

    return cardElement;
  }
}

export default Card;
