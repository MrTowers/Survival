const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("resize", resize);


let fps = 0;


function randomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function inRange(input, min, max) {
    if (input <= max && input >= min) {
        return true;
    }
    else {
        return false;
    }
}

function wait() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 0)
    })
}

function resize() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    ctx.imageSmoothingEnabled = false;
    console.log(`${canvas.width}, ${canvas.height}`);
    app.camera.renderDist = Math.max(canvas.width / 1.75, canvas.height / 1.75);
}

function sortAlg(a, b) {
    return a.pos.z - b.pos.z;
}