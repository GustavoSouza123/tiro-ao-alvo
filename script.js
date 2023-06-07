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
let shotAnimation;
let shotLeft = parseInt((gameWidth/2) - 7);
let shotTop = parseInt(gameHeight * 0.8);
c('.shot').style.left = shotLeft + "px";
c('.shot').style.top = shotTop + "px";
function shotMove(cursorX, cursorY) {
    shotAnimation = setInterval(() => { anim(cursorX, cursorY) }, 1);
    function anim(x, y) {
        if(shotLeft != x-2 && shotLeft != x-1 && shotLeft != x && shotLeft != x+1 && shotLeft != x+2) {
            if(shotLeft > x) shotLeft-=3; else shotLeft+=3;
            c('.shot').style.left = shotLeft + "px";
        }

        if(shotTop != y-2 && shotTop != y-1 && shotTop != y && shotTop != y+1 && shotTop != y+2) {
            if(shotTop > y) shotTop-=3; else shotTop+=3;
            c('.shot').style.top = shotTop + "px";
        }

        if(shotLeft == x && shotTop == y) {
            clearInterval(shotAnimation);
        }
    }
}

// shoot the duck
function shoot() {
    shotMove(event.clientX-26, event.clientY-26);
    /*c('.shot').style.left = event.clientX-26 + "px";
    c('.shot').style.top = event.clientY-26 + "px";*/

    if(parseInt(c('.shot').style.left) >= parseInt(c('.duck').style.left) && 
    parseInt(c('.shot').style.left) <= parseInt(c('.duck').style.left)+70-15 && 
    parseInt(c('.shot').style.top) >= parseInt(c('.duck').style.top) && 
    parseInt(c('.shot').style.top) <= parseInt(c('.duck').style.top)+70-15) {
        clearInterval(duckAnimation);
    }

    console.log("cursor:")
    console.log(event.clientX);
    console.log(event.clientY);
    console.log("shot:")
    console.log(c('.shot').style.left);
    console.log(c('.shot').style.top);
    console.log("duck:");
    console.log(c('.duck').style.left);
    console.log(c('.duck').style.top);
}


/*
let hit = false;
while(!hit) {

}*/

c('body').addEventListener('mousedown', shoot);