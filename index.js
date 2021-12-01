const port = process.env.PORT || 8080;

if (port === 8080) require('dotenv').config();

const express = require('express');
const app = express();

const {
    handleNewResponse
} = require('./functions/lex-functions');

const {
    insertResponse,
    getAnswers
} = require('./functions/ddb-functions');

app.use(express.static('./public'));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.get('/manifesto', (req, res) => res.sendFile(`${__dirname}/manifesto.html`));

app.get('/answers/:q_id', (req, res) => {
    if (isNaN(req.params.q_id)) {
        res.status(400).json({
            success: false,
            error: 'b4d r3qu3st'
        });
    } else {
        let parsedPK = parseInt(req.params.q_id);
        let lastEvaluatedKey = !!req.query.lek ? req.query.lek : null;

        getAnswers(parsedPK, lastEvaluatedKey).then(result => {
            res.status(200).json({
                success: true,
                data: result
            });
        }).catch(error => {
            res.status(500).json({
                success: false,
                error: 'int3rn4l s3rv3r 3rr0r'
            });
        });
    };
});

app.post('/new-response', (req, res) => {
    const {
        id,
        value,
        choices
    } = req.body;

    let ipAddress = req.socket.remoteAddress || req.headers['x-forwarded-for'];

    handleNewResponse(ipAddress, value).then(async result => {
        const {
            success,
            msg,
            sentiment
        } = result;

        let putResponse = null;
        try {
            putResponse = await insertResponse({
                PK: id,
                value,
                choices,
                sentiment_obj: sentiment
            });
        } catch (error) {
            console.error(error);
        };

        res.status(200).json({
            success,
            msg: success ? sentiment.sentimentLabel : msg,
            db_put_success: !!putResponse.success
        });
    });
});

app.get('*', (req, res) => res.redirect('/'));

app.listen(port, '0.0.0.0', () => console.log(`listening @ ${port}...`));