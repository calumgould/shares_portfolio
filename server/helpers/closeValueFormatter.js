const formatDates = require('./dateFormatter.js')

const closeValuesResult = function(data){
  if (!data) return;
  const closeValues = []
  const stock = data['Time Series (Daily)']
  for (let date in stock) {
    console.log('stock', stock);
    let closeValue = stock[date]['4. close']
    let currentDate = formatDates(date)
    let formattedCloseValue = parseFloat(closeValue)
    let dataPoint = [currentDate, formattedCloseValue]
    closeValues.unshift(dataPoint)
  }
  console.log('closevalues', closeValues)
  return closeValues
}

module.exports = closeValuesResult
