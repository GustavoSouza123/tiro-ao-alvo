const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);

// duck move
let duckAnimation;
function duckMove() {
    let initialPos = -100;
    let left = initialPos;
    c('.duck').style.left = left + "px";
    c('.duck').style.top = (window.innerHeight/4.5) + "px";
    animation = setInterval(anim, 2);
    function anim() {
        if(left == window.innerWidth) {
            left = initialPos;
            c('.duck').style.left = left + "px";
        } else {
            left++;
            c('.duck').style.left = left + "px";
        }
    }
}

duckMove();

// shoot the duck
function shoot() {
    c('.shot').style.top = event.clientY - 26 + "px";
    c('.shot').style.left = event.clientX - 26 + "px";

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
    // doesnt work:
    console.log("duck:");
    console.log(c('.duck').style.left);
    console.log(c('.duck').style.top);
}


/*
let hit = false;
while(!hit) {

}*/

c('body').addEventListener('mousedown', shoot);