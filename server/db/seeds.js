use shares;
db.dropDatabase();

db.shares.insertMany([
  {
    name: 'Apple Inc.',
    symbol: 'AAPL',
    shares: 75
  },
  {
    name: 'Microsoft',
    symbol: 'MSFT',
    shares: 54
  },
  {
    name: 'Google',
    symbol:'GOOG',
    shares: 32
  }
]);
