export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._data = items;
    this._renderer = renderer;
    this._classSelector = document.querySelector(classSelector);
  }

  renderItems() {
    this._data.forEach((item) => {
      const cardElement = this._renderedItem;
      this._classSelector.prepend(cardElement);
      // this.addItem;
    });
  }

  addItem(item) {
    const newCard = this._renderer(this._data);
    this._classSelector.prepend(newCard);
    // this._container.prepend(item);
  }
}
