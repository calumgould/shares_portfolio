const formatDate = function(data){
  if (!data) return;
  const date = data['Time Series (Daily)']
  const startDate = Object.keys(date)[Object.keys(date).length-1]
  const UTCStartDate = startDate.split('-')

  UTCStartDate[1] = UTCStartDate[1] - 1
  return Date.UTC(...UTCStartDate)
}

module.exports = formatDate;
