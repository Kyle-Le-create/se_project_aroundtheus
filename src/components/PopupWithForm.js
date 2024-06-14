import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelector(".modal__input");
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

  setEventListerners() {
    super.setEventListerners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const userInfo = this._getInputValues();
      this._handleFormSubmit(userInfo);
      evt.target.reset();
    });
  }
}
