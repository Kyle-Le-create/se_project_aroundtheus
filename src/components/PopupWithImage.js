import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    const previewImageDisplay = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    const previewImageText = this._popupElement.querySelector(
      ".modal__image-title"
    );
    previewImageDisplay.src = data.link;
    previewImageDisplay.alt = data.name;
    previewImageText.textContent = data.name;
    super.open();
  }

  close() {
    super.close();
  }

  setEventListerners() {
    super.setEventListerners();
  }
}
