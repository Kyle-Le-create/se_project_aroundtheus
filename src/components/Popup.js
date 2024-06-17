export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      // use the close method of modal
      // closeModal(openModal);
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("modal__close")) {
        this.close();
      }
    });
  }
}
