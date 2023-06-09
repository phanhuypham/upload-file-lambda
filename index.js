const { generateSignS3URL } = require('./generateSignURL.js');

const handler = async(event) => {
    // TODO implement
    // console.log('query', event.queryStringParameters.key)
    const signURL = await generateSignS3URL('demouploadphan', event.queryStringParameters.key)

    const response = {
                statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        },
        body: JSON.stringify(signURL),
    };
    return response;
};

module.exports = { handler };
