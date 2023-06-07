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

// shot animation

/*function shotMove(cursorX, cursorY) {
    shotAnimation = setInterval(() => { anim(cursorX, cursorY) }, 1);
    function anim(x, y) {
        let aux = 0;

        if(shotLeft != x-2 && shotLeft != x-1 && shotLeft != x && shotLeft != x+1 && shotLeft != x+2) {
            if(shotLeft > x) shotLeft-=3; else shotLeft+=3;
            c('.shot').style.left = shotLeft + "px";
            verifyWin();
        } else {
            aux++;
        }

        if(shotTop != y-2 && shotTop != y-1 && shotTop != y && shotTop != y+1 && shotTop != y+2) {
            if(shotTop > y) shotTop-=3; else shotTop+=3;
            c('.shot').style.top = shotTop + "px";
            verifyWin();
        } else {
            aux++;
        }

        if(aux == 2) {
            clearInterval(shotAnimation);
            shotAnimation = null;
            shotLeft = initialShotLeft;
            shotTop = initialShotTop;
            c('.shot').style.left = shotLeft + "px";
            c('.shot').style.top = shotTop + "px";
        }
    }
}*/

// modify a CSS variable
function setCSSVariable(variable, value) {
    c(':root').style.setProperty(variable, value);
}

// shoot the duck
let initialShotLeft = parseInt((gameWidth/2) - 7);
let initialShotTop = parseInt(gameHeight * 0.8);
let finalShotLeft, finalShotTop, distance, animationTime, shotAnimInterval;
c('.shot').style.left = initialShotLeft + "px";
c('.shot').style.top = initialShotTop + "px";
function shoot() {
    finalShotLeft = event.clientX-26;
    finalShotTop = event.clientY-26;
    distance = initialShotTop - finalShotTop;
    animationTime = distance / 640;

    setCSSVariable('--initialLeft', (initialShotLeft)+'px');
    setCSSVariable('--initialTop', (initialShotTop)+'px');
    setCSSVariable('--finalLeft', (finalShotLeft)+'px');
    setCSSVariable('--finalTop', (finalShotTop)+'px');
    c('.shot').classList.add('shotAnimation');
    c('.shotAnimation').style.animationDuration = animationTime + 's';

    shotAnimInterval = setInterval(verifyWin, 5);

    setTimeout(() => {
        c('.shot').style.left = initialShotLeft + "px";
        c('.shot').style.top = initialShotTop + "px";
        c('.shot').classList.remove('shotAnimation');
        clearInterval(shotAnimInterval);
    }, animationTime*1000);
}

function verifyWin() {
    if(parseInt(c('.shot').style.left) >= parseInt(c('.duck').style.left) && 
    parseInt(c('.shot').style.left) <= parseInt(c('.duck').style.left)+70-15 && 
    parseInt(c('.shot').style.top) >= parseInt(c('.duck').style.top) && 
    parseInt(c('.shot').style.top) <= parseInt(c('.duck').style.top)+70-15) {
        clearInterval(duckAnimation);
    }
}

/*
let hit = false;
while(!hit) {

}
*/

c('body').addEventListener('mousedown', shoot);