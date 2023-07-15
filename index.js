require('dotenv').config();
const { tokens } = require('minimist')(process.argv.slice(2));

if(tokens == undefined){
  console.log("Argument tokens is required (usage: --tokens=\"bitcoin\")");
  return;
}

const axios = require('axios');

getConversionRate = async (from, to="usd") => {
  let response;
  try {
    response = await axios.get(`https://api.coingecko.com/api/v3/coins/${from.toLowerCase()}`);
  } catch(ex) {
    console.log(`1 ${from.padEnd(10)} = ${to.toUpperCase()}: error(${ex.message})`);
  }
  if (response) {
    // success
    const resNameTo = to.toUpperCase();
    const resNameFrom = response.data.symbol.toUpperCase();
    const resPrice = response.data.market_data.current_price[to.toLowerCase()];
    console.log(`1 ${resNameFrom.padEnd(10)} = ${resPrice} ${resNameTo}`);
  }
}

(async () => {
	tokens.replaceAll(" ", "").split(",").forEach(async currency => await getConversionRate(...currency.split(":")))
})();
