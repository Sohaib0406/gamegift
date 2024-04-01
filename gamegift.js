const dinosaur = document.getElementById('dinosaur');
const obstacle = document.getElementById('obstacle');
let isJumping = false;
let isStarted = false;
let score = 0;
const jumpMessages = ['I love you', 'Goodjob my girl', 'Thats my love', 'Good girl', 'My princess' ,'I am proud of you', 'Goodjob my baby' , 'you are so cute' , 'you are so beautiful' , 'risk it for some biscuits' ];

const scoreThresholds = [100, 212, 600,  825, 918, 1115, 1500, 2006, 2250, 2500, 2750 , 3000 , 3250 , 3500, 3750, 4500, 6000, 6500, 15000, 17000, 19000, 21000, 30000];
const specialTexts = ['btw thats you my love jumping, you look so cute', '02/12, our anniversary' ,  ' keep going honey' , '08/25, Happy birthday my girl' , '09/18, Happy birthday my princess', '11/15, dont forget please' , 'I love you so much' , '2006, the year you were born on' ,'you are the cutest girl alive'  , 'I am sorry' , 'I miss you so much' ,  'do you love me?' , 'do you really love me?' , 'I love you more;)' , 'shhhh, I love you more' , 'good girl that you are still playing' , 'woah you made it this far?' , 'if you text me instead of keep playing' , 'It hurts and I need you' ,'but we cant and I start to hate myself more' , 'I love you so much and it hurts' , 'I love you deena' , 'Goodbye'];

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (!isStarted) {
            isStarted = true;
            startGame();
        }
        if (!isJumping) {
            isJumping = true;
            jump();
            showRandomJumpMessage();
        }
    }
});

function startGame() {
    const startText = document.createElement('div');
    startText.textContent = 'Press Space to Jump';
    startText.style.position = 'absolute';
    startText.style.top = '50%';
    startText.style.left = '50%';
    startText.style.transform = 'translate(-50%, -50%)';
    startText.style.fontSize = '24px';
    document.body.appendChild(startText);
    setTimeout(() => {
        document.body.removeChild(startText);
    }, 2000);
}

function jump() {
    let position = 0;
    const jumpInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (position === 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
                position -= 10;
                dinosaur.style.bottom = position + 'px';
            }, 20);
        }
        position += 10;
        dinosaur.style.bottom = position + 'px';

        const dinosaurBottom = parseInt(window.getComputedStyle(dinosaur).getPropertyValue('bottom'));
        const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
        if (obstacleLeft < 90 && obstacleLeft > 40 && dinosaurBottom <= 50) {
            showText('you dont love me, you hit it');
        }
    }, 20);
}

function showText(text) {
    const textElement = document.createElement('div');
    textElement.textContent = text;
    textElement.style.position = 'absolute';
    textElement.style.top = `${window.innerHeight / 2}px`;
    textElement.style.left = `${window.innerWidth / 2}px`;
    textElement.style.fontSize = '24px';
document.body.appendChild(textElement);
    setTimeout(() => {
        document.body.removeChild(textElement);
    }, 1000);
}

function showRandomJumpMessage() {
    const randomIndex = Math.floor(Math.random() * jumpMessages.length);
    const message = jumpMessages[randomIndex];
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'absolute';
    messageElement.style.top = '20px';
    messageElement.style.fontSize = '24px';
    messageElement.style.left = `${window.innerWidth / 2}px`;
    document.body.appendChild(messageElement);
    setTimeout(() => {
        document.body.removeChild(messageElement);
    }, 1000);
}

setInterval(() => {
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    if (obstacleLeft <= -30) {
        obstacle.style.left = '100%';
    } else {
        obstacle.style.left = obstacleLeft - 4 + 'px';
    }
}, 20);

setInterval(() => {
    if (isStarted) {
        score += 1;
        updateScore();
        checkScoreThresholds();
    }
}, 100);

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Score: ' + score;
    scoreElement.style.fontSize = '24px';
}

function checkScoreThresholds() {
    for (let i = 0; i < scoreThresholds.length; i++) {
        if (score === scoreThresholds[i]) {
            showSpecialText(specialTexts[i]);
        }
    }
}

function showSpecialText(text) {
    const specialText = document.createElement('div');
    specialText.textContent = text;
    specialText.style.position = 'absolute';
    specialText.style.top = '30%';
    specialText.style.left = '50%';
    specialText.style.fontSize = '24px';
    specialText.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(specialText);
    setTimeout(() => {
        document.body.removeChild(specialText);
    }, 3000);
}