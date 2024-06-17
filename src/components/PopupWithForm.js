import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _handleEscClose(evt) {
    super._handleEscClose();
  }

  _getInputValues() {
    const formInputs = {};
    this._inputList.forEach((input) => {
      formInputs[input.name] = input.value;
    });
    return formInputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      evt.target.reset();
    });
  }
}
