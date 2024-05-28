export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
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

  getUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, { headers: this.headers });
  }

  updateUser(name, about) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }
}
