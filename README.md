installation

	npm install -g crypto-fiat-coingecko

token symbol (API id)

[![token symbol](https://user-images.githubusercontent.com/37843591/185834401-7730e94b-a158-44fb-8053-c57e93844f59.png)](https://www.coingecko.com/en/coins/bitcoin)

get 1 token price in usd

	crypto-fiat-coingecko --tokens="ethereum"
	# 1 ETH        = 1938.54 USD

get multiple token prices in usd

	crypto-fiat-coingecko --tokens="bitcoin, ethereum, matic-network"
	# 1 ETH        = 1938.54 USD
	# 1 MATIC      = 0.812917 USD
	# 1 BTC        = 30339 USD

1 BTC = ? ETH

	crypto-fiat-coingecko --tokens="bitcoin:eth"
	# 1 BTC        = 15.65162 ETH

1 ETH = ? EUR

	crypto-fiat-coingecko --tokens="ethereum:eur"
	# 1 ETH        = 1724.9 EUR

[List of supported currencies](https://api.coingecko.com/api/v3/simple/supported_vs_currencies)
