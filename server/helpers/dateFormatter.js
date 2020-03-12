const formatDates = function(date){
  if (!date) return;
  const UTCStartDate = date.split('-')
  UTCStartDate[1] = UTCStartDate[1] - 1
  return Date.UTC(...UTCStartDate)
}

module.exports = formatDates;
