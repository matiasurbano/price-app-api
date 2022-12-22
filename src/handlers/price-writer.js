const https = require('https');
const { DynamoDB } = require("aws-sdk")

const db = new DynamoDB.DocumentClient()
const TABLE_NAME = 'Prices';

const getRequest = (asset) => {
  const url = `https://api.coinbase.com/v2/exchange-rates?currency=${asset}`;

  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on('error', err => {
      reject(new Error(err));
    });
  });
}

const insertAssetPrice = (assetKey, price) => {
  const data = {
    TableName: TABLE_NAME,
    Item: {
      Asset: assetKey,
      DateUpdated: (new Date()).getTime(),
      metaData: {
        price
      },

    },
  };
  return db
  .put(data)
  .promise()

};

exports.priceWriterLambdaHandler = async (event, context, callback) => {
  try {
    const btcResult = await getRequest('BTC');
    const btcPrice = btcResult.data.rates['USD'];
    const btcUsdKey = 'USD_BTC';
    
    const ethResult = await getRequest('ETH');
    const ethPrice = ethResult.data.rates['USD'];
    const ethUsdKey = 'USD_ETH';

    try {
      await insertAssetPrice(btcUsdKey, btcPrice);
      await insertAssetPrice(ethUsdKey, ethPrice);
      callback(null)
    } catch (err) {
      callback(null)
      console.error(err);
    }
  } catch (error) {
    console.log('Error is: 👉️', error);
    callback(null)
  }
};
