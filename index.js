require('dotenv').config();
const { tokens, apiKey } = require('minimist')(process.argv.slice(2));

if(process.env.API_KEY == undefined && apiKey == undefined){
  console.log("Argument apiKey is required (usage: --apiKey=\"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\" get your api key from https://pro.coinmarketcap.com/account)");
  return;
}

if(tokens == undefined){
  console.log("Argument tokens is required (usage: --tokens=\"ETH\")");
  return;
}

const axios = require('axios');

// https://coinmarketcap.com/api/documentation/v1/#operation/getV2ToolsPriceconversion
getConversionRate = async (from, to = "USD") => {
  let response;
  try {
    response = await axios.get(
      `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?convert=${to}&symbol=${from}&amount=1`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey || process.env.API_KEY,
        },
      }
    );
  } catch(ex) {
    console.log(`1 ${from.padEnd(10)} = ${to}: error(${ex.message})`);
  }
  if (response) {
    // success
    const [ result ] = response.data.data;
    console.log(`1 ${result.symbol.padEnd(10)} = ${result.quote[to].price} ${to}`);
  }
}

(async () => {
	tokens.replaceAll(" ", "").split(",").forEach(async currency => await getConversionRate(...currency.split(":")))
})();
