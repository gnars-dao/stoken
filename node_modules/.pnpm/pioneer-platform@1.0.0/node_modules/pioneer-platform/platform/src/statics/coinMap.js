import coins from './coins'

export default coins.reduce((map, coin) => {
  map[coin.symbol] = coin
  return map
}, {})
