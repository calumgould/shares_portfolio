
const totalValueCalc = function(stock){
  if (!stock) return;
  const latestCloseValue = stock.closeValues[99]
  const shares = stock.shares
  const totalValue = latestCloseValue * shares
  return parseInt(totalValue.toFixed(2))

}

module.exports = totalValueCalc;
