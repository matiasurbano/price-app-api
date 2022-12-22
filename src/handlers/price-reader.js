exports.priceReaderLambdaHandler = async (event, context) => {
  const asset = event.pathParameters?.assetId || "assetDefault";
  const period = event.queryStringParameters?.period || "periodDefault";


  return {
    "statusCode": 201,
    "body": JSON.stringify({
      message: `Period ${period}, Asset ${asset}`
    })
  };
};
