const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const lex = new AWS.LexRuntime();
const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

const lexParams = {
    botAlias: process.env.BOT_ALIAS,
    botName: process.env.BOT_NAME,
    inputText: null,
    userId: null,
    requestAttributes: {},
    sessionAttributes: {}
};

module.exports = {
    lex,
    lexParams,
    docClient
};

