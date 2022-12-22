# Price App API

### Get Prices

Retrives prices by asset and filtered by period
GET https://mkk2t6zoqg.execute-api.ap-southeast-2.amazonaws.com/Prod/asset/bitcoin/price_changes?period=today

### Update Price

A cron task is triggered every 5 minutes to fetch updated prices for ETH and BTC from Coinbase.
