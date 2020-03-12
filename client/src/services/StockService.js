const baseURL = 'http://localhost:3000/api/shares/'

export default {

  getStocks() {
    return fetch(baseURL)
    .then(res => res.json())
  },

  addStock(payload) {
    const symbol = payload.symbol
    const stock = 'stock/'
    return fetch(baseURL + stock + symbol, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json());
  },
  updateStock(payload) {
    const id = payload._id
    const newPayload = {
      name: payload.name,
      symbol: payload.symbol,
      shares: parseInt(payload.shares),
      totalValue: parseInt(payload.latestCloseValue * payload.shares)
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
