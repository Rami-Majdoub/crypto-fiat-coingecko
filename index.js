require('dotenv').config();

if(process.env.API_KEY == undefined){
  console.log("Envirement variable API_KEY is required");
  return;
}

const axios = require('axios');

const { tokens } = require('minimist')(process.argv.slice(2));

// https://coinmarketcap.com/api/documentation/v1/#operation/getV2ToolsPriceconversion
getConversionRate = async (from, to = "USD") => {
  let response;
  try {
    response = await axios.get(
      `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?convert=${to}&symbol=${from}&amount=1`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.API_KEY || 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
        },
      }
    );
  } catch(ex) {
    console.log(`"${from}" => "${to}":  ${ex.message}`);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(`1 ${json.data[0].symbol.padEnd(10)} = ${json.data[0].quote[to].price} ${to}`);
  }
}

(async () => {
	tokens.split(", ").forEach(async currency => await getConversionRate(...currency.split(":")))
})();
