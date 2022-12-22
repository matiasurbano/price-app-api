# Price App API

## Endpoints

public URL:
https://jnjm2xbk0i.execute-api.ap-southeast-2.amazonaws.com/Prod/asset

### Get Prices

Retrives prices by asset and filtered by period
GET https://jnjm2xbk0i.execute-api.ap-southeast-2.amazonaws.com/Prod/asset/bitcoin/price_changes?period=today

### Update Price

Endpoint to manually trigger the price update

POST https://jnjm2xbk0i.execute-api.ap-southeast-2.amazonaws.com/Prod/asset/update
