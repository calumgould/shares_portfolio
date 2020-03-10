const baseURL = 'http://localhost:3000/api/closeprices/'

export default {

  getPrices() {
    return fetch(baseURL)
    .then(res => res.json())
  },

  addPrice(price) {
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(price),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json());
  },
  updatePrice(price) {
    return fetch(baseURL, {
      method: 'PATCH',
      body: JSON.stringify(price),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
