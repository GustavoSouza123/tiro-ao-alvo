const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);

// game space size
var game = c('.game').getBoundingClientRect();
const gameWidth = game.width;
const gameHeight = game.height;

// duck move
let duckAnimation;
function duckMove(speed) {
    let initialPos = -100;
    let duckLeft = initialPos;
    c('.duck').style.left = duckLeft + "px";
    c('.duck').style.top = (gameHeight/4.3) + "px";
    duckAnimation = setInterval(anim, 1);
    function anim() {
        if(duckLeft == gameWidth-2 || duckLeft == gameWidth-1 || duckLeft == gameWidth || duckLeft == gameWidth+1 || duckLeft == gameWidth+2) {
            duckLeft = initialPos;
            c('.duck').style.left = duckLeft + "px";
        } else {
            duckLeft += speed;
            c('.duck').style.left = duckLeft + "px";
        }
    }
}

let speed = 1;
duckMove(speed);

// modify a CSS variable
function setCSSVariable(variable, value) {
    c(':root').style.setProperty(variable, value);
}

// score
let score = 0;

// shoot the duck
let initialShotLeft = parseInt((gameWidth/2) - 7);
let initialShotTop = parseInt(gameHeight * 0.8);
let finalShotLeft, finalShotTop, distance, animationTime, shotAnimInterval, shotAnimClearInterval;
c('.shot').style.left = initialShotLeft + "px";
c('.shot').style.top = initialShotTop + "px";
function shoot() {
    finalShotLeft = event.clientX-26;
    finalShotTop = event.clientY-26;
    distance = Math.sqrt((initialShotLeft-finalShotLeft)**2 + (initialShotTop-finalShotTop)**2);
    animationTime = distance / 800;

    setCSSVariable('--initialLeft', (initialShotLeft)+'px');
    setCSSVariable('--initialTop', (initialShotTop)+'px');
    setCSSVariable('--finalLeft', (finalShotLeft)+'px');
    setCSSVariable('--finalTop', (finalShotTop)+'px');
    c('.shot').classList.add('shotAnimation');
    c('.shotAnimation').style.animationDuration = animationTime + 's';

    shotAnimInterval = setInterval(verifyWin, 5);

    shotAnimClearInterval = () => {
        c('.shot').style.left = initialShotLeft + "px";
        c('.shot').style.top = initialShotTop + "px";
        c('.shot').classList.remove('shotAnimation');
        c('.shot').style.display = 'block';
        clearInterval(shotAnimInterval);
    }

    setTimeout(shotAnimClearInterval, animationTime*1000);
}

function verifyWin() {
    let duck = c('.duck').getBoundingClientRect();
    let shot = c('.shot').getBoundingClientRect();
    if(shot.left >= duck.left && shot.left <= duck.left+70-15 
        && shot.top >= duck.top && shot.top <= duck.top+80-15) {
        score++;
        c('.score span').innerHTML = score;
        clearInterval(duckAnimation);
        if(score < 3) speed = 1;
        else if(score < 7) speed = 2;
        else if(score < 10) speed = 3;
        else {
            alert("VOCÊ GANHOU!!!");
            clearInterval(duckAnimation);
            speed = 0;
        }
        duckMove(speed);

        c('.shot').style.display = 'none';
        setTimeout(() => {
            shotAnimClearInterval();
        }, 100);
    }
}

c('body').addEventListener('mousedown', shoot);