export default class Api {
  constructor(options) {
    console.log(options.headers);
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    console.log(this.headers);
  }
  deleteCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
      headers: this.headers,
      method: "DELETE",
    });
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, { headers: this.headers });
  }
  _loadData() {
    return this.getInitialCards();
  }
  renderCard(name, link) {
    return this._request(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  addLike(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: this.headers,
      method: "PUT",
    });
  }
  removeLike(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: this.headers,
      method: "DELETE",
    });
  }
  //   updateAvatar() {
  //     method: "PACH";
  //   }
}
