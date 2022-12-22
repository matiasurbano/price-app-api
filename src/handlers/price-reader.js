const { DynamoDB } = require("aws-sdk")

const db = new DynamoDB.DocumentClient()
const TABLE_NAME = 'Prices';

const getPrices = () => {
  let queryParams = {
    TableName: TABLE_NAME,
    FilterExpression: '#DateUpdated BETWEEN :startTime AND :endTime',
    ExpressionAttributeValues: {
      ':startTime': '2022-12-20T18:10:00.000Z',
      ':endTime': '2022-12-24T18:10:00.000Z'
    },
    ExpressionAttributeNames: { '#DateUpdated': 'DateUpdated' },
    ScanIndexForward: false
  };

  return db
  .scan(queryParams)
  .promise()
};

exports.priceReaderLambdaHandler = async (event, context) => {
  const asset = event.pathParameters?.assetId || "assetDefault";
  const period = event.queryStringParameters?.period || "periodDefault";

  try {
    const pricesResults = await getPrices();
    return {
      "statusCode": 201,
      "body": JSON.stringify(pricesResults)
    };
  } catch (err) {
    console.error(err);
  }



};
