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

// get shot direction
function getShotDirection(x, y){
    var d = Math.atan2(x, y) * (180 / Math.PI);
    if(d < 0) d = 180 - d;
    return d;
}

// score
let score = 0;

// shoot the duck
let initialShotLeft = parseInt((gameWidth/2) - 7);
let initialShotTop = parseInt(gameHeight * 0.8);
let finalShotLeft, finalShotTop, leftDistance, topDistance, distance, animationTime, rotation, shotAnimInterval, shotAnimClearInterval;
c('.shot').style.left = initialShotLeft + "px";
c('.shot').style.top = initialShotTop + "px";
function shoot() {
    c('.shot').style.display = 'flex';

    finalShotLeft = event.clientX-26;
    finalShotTop = event.clientY-26;

    leftDistance = initialShotLeft-finalShotLeft;
    topDistance = initialShotTop-finalShotTop
    distance = Math.sqrt((initialShotLeft-finalShotLeft)**2 + (initialShotTop-finalShotTop)**2);
    animationTime = distance / 800;

    rotation = getShotDirection(leftDistance, topDistance);
    rotation = (rotation > 180) ? rotation -= 180 : rotation *= -1;
    c('.gun').style.transform = `rotate(${rotation+90}deg)`;
    setTimeout(()=>{c('.gun').style.transform = `rotate(0deg)`;}, 300);
    c('.shot').style.transform = `rotate(${rotation}deg)`;

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
        c('.shot').style.display = 'none';
        clearInterval(shotAnimInterval);
    }

    setTimeout(shotAnimClearInterval, animationTime*1000);
}

// verify duck death and victory (score = 10)
function verifyWin() {
    let duck = c('.duck').getBoundingClientRect();
    let shot = c('.shot').getBoundingClientRect();
    if(shot.left >= duck.left && shot.left <= duck.left+70-15 
        && shot.top >= duck.top && shot.top <= duck.top+80-15) {
        score++;
        c('.score span').innerHTML = score;
        clearInterval(duckAnimation);
        c('.explosion').style.display = 'block';
        c('.explosion').style.left = duck.left + 'px';
        setTimeout(()=>{ c('.explosion').style.display = 'none'; }, 900);

        if(score < 3) speed = 1;
        else if(score < 7) speed = 2;
        else if(score < 10) speed = 3;
        else {
            clearInterval(duckAnimation);
            speed = 0;
            setTimeout(() => {
                c('.victory').style.display = 'flex';
                c('.game').style.backgroundColor = 'rgba(0, 0, 0, .5)';
        }, 1000);
        }
        duckMove(speed);
        shotAnimClearInterval();
    }
}

c('body').addEventListener('mousedown', shoot);

// play again
function playAgain() {
    location.reload();
}

c('.victory button').addEventListener('click', playAgain);