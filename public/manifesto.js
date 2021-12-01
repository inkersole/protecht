let backgroundContainer = document.getElementById("background-container");
let whichGan = rando(10, 1);
backgroundContainer.style.backgroundImage = `url('/assets/gan${whichGan}.png')`;

let main = document.getElementsByTagName('main')[0];
let openSections = [];

function rando(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

questions.forEach((question, i, arr) => {
    let div = document.createElement('div');
    div.classList.add('question-container');
    let p = document.createElement('p');
    p.innerHTML = `${question.q.match(/^.+\?/)[0]}&nbsp;&nbsp;<span class="open">^</span>`;
    p.classList.add('question');
    p.addEventListener('click', (e) => handleQuestionClick(e, i));
    div.appendChild(p);
    main.appendChild(div);
});

function handleQuestionClick(e, id) {
    console.log(e);
    if (!openSections.includes(id)) {
        openSections.push(id);
        fetchQuestionData(id);
        document.getElementsByTagName('span')[id].classList.remove('open');
        document.getElementsByTagName('span')[id].classList.add('close');
    } else {
        console.log(e.target.parentNode.getElementsByClassName('question-inner')[0]);
        e.target.parentNode.getElementsByClassName('question-inner')[0].remove();
        if (e.target.parentNode.getElementsByTagName('button')[0]) {
            e.target.parentNode.getElementsByTagName('button')[0].remove();
        };
        openSections = openSections.filter(item => item !== id);
        document.getElementsByTagName('span')[id].classList.remove('close');
        document.getElementsByTagName('span')[id].classList.add('open');
    };
    console.log(openSections);
};

function fetchQuestionData(id, lastEvaluatedKey, appendingMore) {
    console.log(id, lastEvaluatedKey);
    axios.get(`/answers/${id}${lastEvaluatedKey ? `?pk=${lastEvaluatedKey.PK}&sk=${lastEvaluatedKey.SK}` : ''}`).then((response) => {
        const {
            Items,
            LastEvaluatedKey
        } = response.data.data;

        if (Items.length) {
            let div = appendingMore ? document.getElementById(`q${id}`) : document.createElement('div');

            if (!appendingMore) {
                div.id = `q${id}`;
                div.classList.add('question-inner');
            };

            Items.forEach(elem => {

                console.log(elem.sentiment_obj.sentimentScore.replace(/[^0-9]/g,''));

                let responseContainer = document.createElement('div');
                responseContainer.classList.add('response-container');

                let answer = document.createElement('p');
                answer.classList.add('answer');
                if (id === 0 || id === 1 || id === 9) {
                    if (elem.answer === 'very happy') {
                        answer.innerText = '😁';
                    } else if (elem.answer === 'puzzled') {
                        answer.innerText = '🤔';
                    } else if (elem.answer === 'meh') {
                        answer.innerText = '🙁';
                    } else {
                        answer.innerText = '😡';
                    };
                } else if(elem.choices.length) {
                    elem.choices.forEach((elem, i, arr) => {
                        if (i === arr.length - 1) {
                            answer.innerText = answer.innerText + elem;
                        } else {
                            answer.innerText = answer.innerText + elem + ', '
                        };
                    });
                } else {
                    answer.innerText = elem.answer;
                };

                let sentiment = document.createElement('p');
                sentiment.innerText = elem.sentiment_obj.sentimentLabel;
                responseContainer.classList.add(elem.sentiment_obj.sentimentLabel.toLowerCase());

                let date = new Date(elem.created_at);
                let formattedDate = moment(date).format('DD/MM/YY H:mm');
                let createdAt = document.createElement('p');
                createdAt.innerText = formattedDate;

                let header = document.createElement('div');
                header.classList.add('header');

                header.appendChild(sentiment);
                header.appendChild(createdAt);
                responseContainer.appendChild(header);
                responseContainer.appendChild(answer);
                div.appendChild(responseContainer);

            });

            document.getElementsByClassName('question-container')[id].appendChild(div);

            if (LastEvaluatedKey) {
                let getMoreButton = document.createElement('div');
                getMoreButton.classList.add('getMoreButton')
                getMoreButton.innerText = 'show more';

                function getMoreResults() {
                    getMoreButton.removeEventListener('click', getMoreResults);
                    getMoreButton.parentElement.removeChild(getMoreButton);
                    fetchQuestionData(id, LastEvaluatedKey, true);
                };

                getMoreButton.addEventListener('click', getMoreResults);

                document.getElementsByClassName('question-container')[id].appendChild(getMoreButton);
            };

        };
    });
}