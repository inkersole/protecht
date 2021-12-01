const {
    lex,
    lexParams
} = require('../config/aws-config');

function handleNewResponse(id, message) {
    return new Promise((resolve, reject) => {
        let paramsClone = {...lexParams};

        paramsClone.userId = id;
        paramsClone.inputText = message;

        lex.postText(paramsClone, (err, data) => {

            if (err) {
                console.log('lex error... uh oh', err, err.stack);
                resolve({success: false, msg: 'something went wrong.... teeehee :3'});
            } else {
                console.log(data.sentimentResponse);
                resolve({success: true, sentiment: data.sentimentResponse});
            };
        });
    });
};

module.exports = {
    handleNewResponse
};