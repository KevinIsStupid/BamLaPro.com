const cvs = document.getElementById("canvas1");
const ctx = cvs.getContext("2d");
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
window.addEventListener("resize", function() {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
});
let partz = [];
let times = 300;
let r = 255;
let g = 0;
let b = 0;
let toDo = "g+";
let check = true;
let needAnm;
let mouse = {
    x: undefined,
    y: undefined,
};
let counter = 0;
let com = false;
let a = document.getElementById("vid");
a.pause();
let lmao = document.getElementById("lmao");
lmao.click();
class smallOne {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.velX = Math.random() * 3 - 1.5;
        this.velY = Math.random() * 3 - 1.5;
        this.size = Math.random() * 7 + 5;
        this.color = `RGB(${r},${g},${b})`;
    };
    update() {
        this.x += this.velX;
        this.y += this.velY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    };
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 360);
        ctx.fill();
        ctx.closePath();
    }
};
cvs.addEventListener("click", () => {
    a.style.visibility = "visible";
    a.pause();
    a.play();
    cvs.style.visibility = "hidden";
    com = true;
});

function checkRGB() {
    switch (toDo) {
        case "r+":
            r += 5;
            break;
        case "r-":
            r -= 5;
            break;
        case "g+":
            g += 5;
            break;
        case "g-":
            g -= 5;
            break;
        case "b+":
            b += 5;
            break;
        case "b-":
            b -= 5;
            break;
    }
}

function checkToDo() {
    if (r == 255 && g == 0 && b == 0) {
        toDo = "g+";
    } else if (g == 255 && r == 0 && b == 0) {
        toDo = "b+";
    } else if (b == 255 && r == 0 && g == 0) {
        toDo = "r+";
    };
    if (r == 255 && g == 255) {
        toDo = "r-";
    } else if (g == 255 && b == 255) {
        toDo = "g-";
    } else if (r == 255 && b == 255) {
        toDo = "b-";
    }
}

function run() {
    for (var a = 0; a < partz.length; a++) {
        partz[a].update();
        partz[a].draw();
        for (var y = a; y < partz.length; y++) {
            const dx = partz[a].x - partz[y].x;
            const dy = partz[a].y - partz[y].y;
            const dis = Math.sqrt(dx * dx + dy * dy);
            if (dis < 50) {
                ctx.beginPath();
                ctx.moveTo(partz[y].x, partz[y].y);
                ctx.strokeStyle = partz[y].color;
                ctx.strokeWidth = partz[y].size / 10;
                ctx.lineTo(partz[a].x, partz[a].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (partz[a].size <= 0.3) {
            partz.splice(a, 1);
            a--;
        }
    }
};
if (check) {
    cvs.addEventListener("mousemove", function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
        for (var z = 0; z < 5; z++) {
            partz.push(new smallOne());
        }
    });


};

function animate() {
    ctx.fillStyle = "RGB(" + 0 + "," + 0 + "," + 0 + ")";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    checkToDo();
    checkRGB();
    run();
    needAnm = window.requestAnimationFrame(animate);
};
if (check) {
    animate();
};