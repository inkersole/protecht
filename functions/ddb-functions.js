const {
    docClient
} = require('../config/aws-config');

const insertResponse = resp => {
    return new Promise((resolve, reject) => {
        const {
            PK,
            value,
            choices,
            sentiment_obj
        } = resp;

        console.log('choices', choices);

        let now = Date.now();

        let insertParams = {
            TableName: process.env.TABLE_NAME,
            Item: {
                PK,
                SK: 'answer/' + now,
                answer: value,
                choices: choices,
                created_at: now,
                sentiment_obj
            }
        };

        console.log('insertParams', insertParams);

        docClient.put(insertParams, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    success: true
                });
            };
        });
    });
};

const getAnswers = (PK, lastEvaluatedKey) => {
    return new Promise((resolve, reject) => {
        let getParams = {
            TableName: process.env.TABLE_NAME,
            KeyConditionExpression: 'PK = :pk and begins_with(SK, :skp)',
            ExpressionAttributeValues: {
                ':pk': PK,
                ':skp': "answer/"
            },
            Limit: 20,
            ExclusiveStartKey: !!lastEvaluatedKey ? lastEvaluatedKey : null
        };

        docClient.query(getParams, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            };
        });
    });
};

module.exports = {
    insertResponse,
    getAnswers
};