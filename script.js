const c = (e) => document.querySelector(e);
const cs = (e) => document.querySelectorAll(e);

function shoot() {
    c('.shot').style.top = event.clientY - 26 + "px";
    c('.shot').style.left = event.clientX - 26 + "px";

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

c('body').addEventListener('mousedown', shoot);