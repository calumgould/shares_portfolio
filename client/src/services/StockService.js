const baseURL = 'http://localhost:3000/api/shares/'

export default {

  getStocks() {
    return fetch(baseURL)
    .then(res => res.json())
  },

  addStock(stock) {
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(stock),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json());
  },
  updateStock(payload) {
    const id = payload._id
    console.log(id);
    // delete payload._id
    const newPayload = {
      name: payload.name,
      symbol: payload.symbol,
      shares: parseInt(payload.shares)
    }
    return fetch(baseURL + id, {
      method: 'PATCH',
      body: JSON.stringify(newPayload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
  }
}
