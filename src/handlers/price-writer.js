exports.priceWriterLambdaHandler = async (event, context) => {
  return {
    "statusCode": 201,
    "body": JSON.stringify({
      message: `Price Writer`
    })
  };
};
