import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    const previewImageDisplay = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    const previewImageText = this._popupElement.querySelector(
      ".modal__image-title"
    );
  }

  open(data) {
    this._previewImageDisplay.src = data.link;
    this._previewImageDisplay.alt = data.name;
    this._previewImageText.textContent = data.name;
    super.open();
  }

  // close() {
  //   super.close();
  // }

  // setEventListeners() {
  //   super.setEventListeners();
  // }
}
