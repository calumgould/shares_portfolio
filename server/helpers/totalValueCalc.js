
const totalValueCalc = function(stock){
  if (!stock) return;
  const latestCloseValue = stock.closeValues[99][1]
  const shares = stock.shares
  const totalValue = latestCloseValue * shares
  return parseInt(totalValue)

}

module.exports = totalValueCalc;
