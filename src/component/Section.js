export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach(this._renderer);
    const cardElement = this._renderer(item);
    this._container.append(cardElement);
  }
  addItem(item) {
    this._container.prepend(item);
  }
}
