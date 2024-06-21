export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Method to render items using the provided renderer
  renderItems(items) {
    console.log("Rendering items:", items); // Logging items for debugging
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Method to add a new item to the container
  addItem(element) {
    this._container.prepend(element);
  }
}
