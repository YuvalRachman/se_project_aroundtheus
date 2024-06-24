export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
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

  deleteCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
      headers: this.headers,
      method: "DELETE",
    });
  }

  addLike(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: this.headers,
      method: "PUT",
    }).then((data) => {
      return {
        ...data,
        isLiked: true, // Assuming server response includes `hasLike` information
      };
    });
  }

  removeLike(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: this.headers,
      method: "DELETE",
    }).then((data) => {
      return {
        ...data,
        isLiked: false, // Assuming server response includes `hasLike` information
      };
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
        name,
        about,
      }),
    });
  }

  updateAvatar(avatar) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    });
  }

  showPromiseStatus() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]).then(
      (res) => {
        return { initialCards: res[0], fetchedUserInfo: res[1] };
      }
    );
  }
}