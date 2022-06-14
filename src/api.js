export function loadPrices(mainCurrencies, vsCurrencies) {
  const mainArrToString = mainCurrencies.join("%2C");
  const vsArrToString = vsCurrencies.join("%2C");
  return fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${mainArrToString}&vs_currencies=${vsArrToString}`
  )
    .then((response) => response.json())
    .then((data) => Object.values(data));
}

export function loadChartData(mainCur, vsCur) {
  return fetch(
    `https://api.coingecko.com/api/v3/coins/${mainCur}/market_chart?vs_currency=${vsCur}&days=14`
  )
    .then((response) => response.json())
    .then((data) => data.prices.map((item) => [item[0], item[1].toFixed(8)]));
}
