const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);

// game space size
var game = c('.game').getBoundingClientRect();
const gameWidth = game.width;
const gameHeight = game.height;

// duck move
let duckAnimation;
function duckMove() {
    let initialPos = -100;
    let duckLeft = initialPos;
    c('.duck').style.left = duckLeft + "px";
    c('.duck').style.top = (gameHeight/4.3) + "px";
    duckAnimation = setInterval(anim, 1);
    function anim() {
        if(duckLeft == gameWidth) {
            duckLeft = initialPos;
            c('.duck').style.left = duckLeft + "px";
        } else {
            duckLeft += 1;
            c('.duck').style.left = duckLeft + "px";
        }
    }
}

duckMove();

// modify a CSS variable
function setCSSVariable(variable, value) {
    c(':root').style.setProperty(variable, value);
}

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
        setTimeout(() => {
            c('.shot').style.left = initialShotLeft + "px";
            c('.shot').style.top = initialShotTop + "px";
            c('.shot').classList.remove('shotAnimation');
            clearInterval(shotAnimInterval);
        }, animationTime*1000);
    }

    shotAnimClearInterval();
}

function verifyWin() {
    let duck = c('.duck').getBoundingClientRect();
    let shot = c('.shot').getBoundingClientRect();
    if(shot.left >= duck.left && shot.left <= duck.left+70-15 
        && shot.top >= duck.top && shot.top <= duck.top+70-15) {
        clearInterval(duckAnimation);
        shotAnimClearInterval();
    }
}

/*
let hit = false;
while(!hit) {

}
*/

c('body').addEventListener('mousedown', shoot);