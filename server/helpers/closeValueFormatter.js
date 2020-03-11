
  const closeValuesResult = function(data){
    if (!data) return;
    const closeValues = []
    const stock = data['Time Series (Daily)']
    for (let date in stock) {
      let closeValue = stock[date]['4. close']
      closeValues.unshift(closeValue)
    }
    const result =  closeValues.map(function(value) {
      return parseFloat(value)
    })
    return result;
  };

  module.exports = closeValuesResult
