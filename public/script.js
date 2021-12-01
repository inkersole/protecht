(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener('error', (e) => window.alert(JSON.stringify(e.message, null, 4)));

    let scene, camera, renderer;
    let form = null;

    let backgroundContainerInner = document.getElementById("background-container-inner");
    let bgInnerGrad = document.getElementById("background-inner-gradient");
    let bgOuterGrad = document.getElementById("background-outer-gradient");
    let enterScreen = document.getElementById('enter-screen');
    let enterButton = document.getElementById('enter-button');
    let main = document.getElementsByTagName('main')[0];
    let question = document.getElementById("question");
    let response = document.getElementById("response");
    let input = document.getElementsByTagName("textarea")[0];
    let sendButton = document.getElementsByClassName('send-button')[0];
    let freeResponseContainer = document.getElementById("free-response-container");
    let optionsContainer = document.getElementById("options-container");
    let endScreen = document.getElementById('end-screen');
    let progressbar = document.querySelector('#progress-bar div');

    let iAmThinking = false;
    let totalSentiment = 0;
    let positiveKeywords = [
        'identity',
        'deleting',
        'signing',
        'changing',
        'boycotting',
        'community',
        'transparency',
        'always',
        'evolving',
        'love',
        '100%',
        'authentic',
        'professional',
        'personal',
        'projects',
        'creativity',
        'self expression',
        'inspiration',
        'education',
        'connecting',
        'networking',
        'collaborating'
    ];

    let negativeKeywords = [
        'theft',
        'bullying',
        'censorship',
        'revenge',
        'echo chambers',
        'isolation',
        'none',
        'toxic',
        'detached',
        'stalking',
        'comparing',
        'hate'
    ];
    let neutralKeywords = [
        'data',
        'privacy',
        'online',
        'porn',
        'never considered it',
        'other',
        'anonymity',
        'online',
        'irl',
        'love',
        'perform',
        'curate',
        'i’m not sure',
        'curation',
        'performance'
    ];

    autosize(input);

    let WAITING = false;

    let whichGan = rando(10, 1);
    backgroundContainerInner.style.backgroundImage = `url('/assets/gan${whichGan}.png')`;

    function backgroundShift() {
        console.log("shift");
        let x = rando(2, 1);
        let y = rando(2, 1);
        let directionX = x === 1 ? "" : "-";
        let directionY = y === 1 ? "" : "-";
        let duration = rando(25, 5);
        backgroundContainerInner.style.transition = `transform ${duration}s linear`;
        backgroundContainerInner.style.transform = `rotateX(${directionX}${rando(
      10,
      1
    )}deg) rotateY(${directionY}${rando(10, 1)}deg)`;
        console.log(backgroundContainerInner.style.transform);
        setTimeout(() => {
            backgroundShift();
        }, duration * 1000);
    }
    backgroundShift();

    function promiseTimeout(timeout) {
        return new Promise((resolve, reject) => setTimeout(resolve, timeout));
    }

    function rando(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function enter() {
        gsap.to(enterScreen, {
            duration: 0.8,
            opacity: 0,
            ease: "back.out(3)",
            onComplete: function() {
                enterScreen.style.display = 'none';
                console.log('yeet');
            }
        });
        main.style.display = 'block';
        gsap.from(main, {
            duration: 0.8,
            delay: 1,
            opacity: 0,
            ease: "back.out(3)",
        });
        threeInit();
        bgInnerGrad.style.display = 'block';
        bgOuterGrad.style.display = 'block';
    };


    enterButton.addEventListener('click', enter);

    let thinkContainer = document.getElementById('thinking-container');
    let thinkText = document.getElementById('thinking-text');
    let thinkInt;
    let thinkCount = 0;

    let thinking = [
    `（^-^）`,
    `（^-^）.`,
    `（^-^）.｡`,
    `（^-^）.｡o`,
    `（^-^）.｡oO`,
    `（^-^）.｡oO（?）`,
    `（'-'）.｡oO（?）`,
    `（^-^）.｡oO（?）`,
    `（'-'）.｡oO（?）`,
    ];

    function think() {

        thinkText.innerText = thinking[thinkCount];
        thinkCount++;
        if (thinkCount === thinking.length) {
            thinkCount = 0;
        };

    };

    // MESSAGES ===================================================

    let stage = "introduction";
    let qCount = 0;

    const handleNewMessage = async (msg) => {
        question.innerHTML = msg;
        gsap.from("#question", {
            duration: 0.8,
            delay: 0.5,
            y: -100,
            opacity: 0,
            ease: "back.out(3)",
        });
    };

    const handleButtonClick = async (e, type, value) => {
        console.log(e);
        if (WAITING) return;

        WAITING = true;
        e.target.classList.add('selected');

        let responseValue;

        if (type == 'free') {
            input.value = '';

            if (!value || !/\S/.test(value)) {
                handleNewMessage("you didn't say anything...?");
                await promiseTimeout(3000);
                handleNewMessage(questions[qCount].q);
                await promiseTimeout(1000);
                WAITING = false;
                return;
            };

            responseValue = value.trim();
        } else if (type === 'choose-one') {
            if (value === '😁') {
                responseValue = 'very happy';
            } else if (value === '🤔') {
                responseValue = 'puzzled';
            } else if (value === '🙁') {
                responseValue = 'meh';
            } else if (value === '😡') {
                responseValue = 'very angry';
            } else {
                responseValue = value;
            };
        } else {

            if (!choices.length) {
                handleNewMessage("you didn't select anything... :(");
                await promiseTimeout(3000);
                handleNewMessage(questions[qCount].q);
                await promiseTimeout(1000);
                WAITING = false;
                return;
            };

            let str = '';
            value.forEach(elem => {
                str = str + ' ' + elem;
            });
            let arr = str.split(/(\s+)/).filter(item => item !== " ");
            console.log('>>>', arr);

            let posCount = 0;
            let negCount = 0;
            let neuCount = 0;

            arr.forEach(item => {
                if (positiveKeywords.includes(item.toLowerCase())) {
                    posCount++;
                };
            });

            arr.forEach(item => {
                if (negativeKeywords.includes(item.toLowerCase())) {
                    negCount++;
                };
            });

            arr.forEach(item => {
                if (neutralKeywords.includes(item.toLowerCase())) {
                    neuCount++;
                };
            });

            let max = Math.max(posCount, negCount, neuCount);

            responseValue = posCount === max ? 'positive' : negCount === max ? 'negative' : 'neutral';
        };

        console.log('valueXX', responseValue);
        thinkContainer.style.display = 'flex';
        thinkInt = setInterval(think, 75);
        iAmThinking = true;
        axios
            .post("/new-response", {
                value: responseValue,
                id: qCount,
                choices: choices
            })
            .then((response) => {
                WAITING = false;
                choices = [];

                const {
                    success,
                    msg
                } = response.data;

                // console.log('success', success, 'msg', msg);
                console.log('data', response.data);
                if (msg === 'POSITIVE') {
                    totalSentiment += 40;
                } else if (msg === 'NEGATIVE') {
                    totalSentiment -= 40;
                };

                backgroundContainerInner.style.filter = `hue-rotate(${totalSentiment}deg)`;

                optionsContainer.innerHTML = null;
                qCount++;
                iAmThinking = false;
                thinkContainer.style.display = "none";
                clearInterval(thinkInt);
                thinkCount = 0;
                thinkText.innerText = '';
                askQuestion();

            });
    };

    const askQuestion = async () => {
        if (questions[qCount]) {
            let progress = ((qCount+1)/questions.length)*100
            progressbar.style.transform = `translateX(-${100-progress}%)`;
            if (sendButton.classList.contains('selected')) {
                sendButton.classList.remove('selected');
            };

            let q = questions[qCount];
            if (q.type === "free") {
                freeResponseContainer.style.display = 'flex';
                optionsContainer.style.display = 'none';
            } else {
                freeResponseContainer.style.display = 'none';
                optionsContainer.style.display = 'flex';
                q.options.forEach((option) => {
                    let p = document.createElement("p");
                    p.classList.add("option-button");
                    p.innerText = option;
                    if (q.type === 'choose-one') {
                        p.addEventListener('click', (e) => handleButtonClick(e, 'choose-one', option));
                    } else {
                        p.addEventListener('click', (e) => multipleChoice(e));
                    }
                    optionsContainer.appendChild(p);
                    gsap.from(p, {
                        duration: 0.8,
                        delay: 1,
                        y: 100,
                        opacity: 0,
                        ease: "back.out(3)",
                    });
                });

                if (q.type === 'choose-multiple') {
                    let div = document.createElement('div');
                    div.classList.add('multiple-send-button');
                    div.addEventListener('click', (e) => handleButtonClick(e, 'choose-multiple', choices));
                    let sP = document.createElement('p');
                    sP.innerText = '>';
                    div.appendChild(sP);
                    setTimeout(() => {
                        optionsContainer.prepend(div);
                    }, 1800);
                };

            };
            handleNewMessage(q.q);

        } else {
            console.log('end!');
            endScreen.style.display = 'flex';
            question.style.display = 'none';
            response.style.display = 'none';
        }
    };

    let choices = [];

    const multipleChoice = (e) => {
        if (e.target.classList.contains('selected')) {
            e.target.classList.remove('selected');
            choices = choices.filter(item => item !== e.target.innerText);
            console.log(choices);
        } else {
            e.target.classList.add('selected');
            choices.push(e.target.innerText);
            console.log(choices);
        };
    };


    sendButton.addEventListener('click', (e) => handleButtonClick(e, 'free', input.value));

    // 3333333333333333333333.js ======================================

    function threeInit() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        renderer = new THREE.WebGLRenderer({
            alpha: true
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(2, 2, 2);
        scene.add(directionalLight);

        var geometry = new THREE.SphereGeometry(1, 128, 128);

        let loader = new THREE.TextureLoader();
        loader.load(`/assets/gan${whichGan}.png`, (tx) => {
            tx.mapping = THREE.EquirectangularReflectionMapping;
            let material = new THREE.MeshLambertMaterial({
                // color: 0x111111,
                emissive: 0x444444,
                emissiveIntensity: 2,
                reflectivity: 1,
                envMap: tx,
                transparent: true,
                // opacity: 0,
                wireframe: false,
            });

            let formMaterial = new THREE.MeshPhongMaterial({
                envMap: tx
            });

            form = new THREE.Mesh(geometry, material);
            form.position.set(0, 0.5, 0);
            form.scale.set(1, 1, 1);
            form.scale.x = -1;
            form.castShadow = true;
            form.receiveShadow = true;
            scene.add(form);

            setTimeout(() => {
                askQuestion();
            }, 1000);
        });

        camera.position.set(0, 0, 4);

        var simplex = new SimplexNoise();
        var update = function () {
            var time;
            if (iAmThinking) {
                time = performance.now() * 0.001;
            } else {
                time = performance.now() * 0.00005;
            }
            var k = 1;
            for (var i = 0; i < form.geometry.vertices.length; i++) {
                var p = form.geometry.vertices[i];
                p.normalize().multiplyScalar(
                    1 + 0.2 * simplex.noise2D(p.x * k + time, p.y * k + time)
                );
            }
            form.geometry.verticesNeedUpdate = true;
            form.geometry.computeVertexNormals();
            form.geometry.normalsNeedUpdate = true;
        };

        var animate = function () {
            requestAnimationFrame(animate);
            // form.rotation.x -= 0.0005;
            // TWEEN.update();
            if (form) {
                update();
                form.rotation.y -= 0.0008;
            }
            renderer.render(scene, camera);
        };

        let canvas = document.getElementsByTagName('canvas')[0];
        gsap.to(canvas, {
            duration: 2,
            delay: 0.5,
            opacity: 1,
            ease: "back.out(3)",
        });

        animate();
    }

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    };

})();