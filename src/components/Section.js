export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._data = items;
    this._renderer = renderer;
    this._classSelector = classSelector;
  }

  renderItems() {
    this._data.forEach((item) => {
      const cardElement = this._renderer(item);
      this._classSelector.prepend(cardElement);
    });
  }

  addItem() {
    const newCard = this._renderer(this._data);
    this._classSelector.prepend(newCard);
  }
}
