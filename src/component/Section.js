export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const cardElement = this._renderer(item);
      this._container.append(cardElement);
    });
  }

  addItem(item) {
    // Ensure item is a valid DOM element or node
    if (item instanceof Node) {
      this._container.appendChild(item);
    } else {
      console.error("addItem: Invalid item provided.");
    }
  }
}
