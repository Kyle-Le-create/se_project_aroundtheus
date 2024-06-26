export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._data = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._data.forEach((item) => {
      // const cardElement = this._renderer(item);
      this.addItem(item);
    });
  }

  addItem(item) {
    const newItem = this._renderer(item);
    this._container.prepend(newItem);
    // this._container.prepend(item);
  }
}
