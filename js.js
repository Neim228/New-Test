const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let w, h, particlesArr, prop;
prop = {
    backColor       : 'black',
    particleColor   : '#1d88d6',
    lineColor       : '#1d88d6',
    lineWidth       : '.1',
    radius          : 4,
    partCount       : 30,
    speed           : 0.5,
    lineLen         : 150
}
particlesArr = []

body.style.background = prop.backColor

function sizeCanvas() {
    w = innerWidth
    h = innerHeight
    
    canvas.width = w
    canvas.height = h
}
$(window).resize(sizeCanvas)

sizeCanvas()
addNumber()
renderArrPart()

function Part() {
    let th = this;
    th.x = Math.random() * w
    th.y = Math.random() * h
    th.color = prop.particleColor
    th.speedX = Math.random() * (prop.speed * 2) - prop.speed
    th.speedY = Math.random() * (prop.speed * 2) - prop.speed

    th.update = function () {
        th.x += this.speedX
        th.y += this.speedY
    }
    
    th.render = function () {


        context.beginPath();
        context.arc(th.x, th.y, prop.radius, 0, Math.PI * 2);
        context.closePath();
        context.fillStyle = th.color;
        context.fill();
    }
    th.border = function border() {
        if(th.x <= 0) th.speedX = -th.speedX
        if(th.y <= 0) th.speedY = -th.speedY
        if(th.x >= w) th.speedX = -th.speedX
        if(th.y >= h) th.speedY = -th.speedY
    }
}
function addNumber() {
    for (let i = 0; i < prop.partCount; i++) {
        particlesArr.push(new Part)
    }
}
function partClear() {
    context.clearRect(0, 0, w, h);
    
}
function line() {
    let x1,y1,x2,y2,lenght,opacity;
    for (let i in particlesArr) {
        for ( let j in particlesArr) {
            x1 = particlesArr[i].x
            y1 = particlesArr[i].y
            x2 = particlesArr[j].x
            y2 = particlesArr[j].y

            lenght = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
            if (lenght < prop.lineLen) {
                context.lineWidth= prop.lineWidth;
                context.strokeStyle = prop.lineColor;
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.closePath();
                context.stroke();  
            }
        }
    }
}
function renderArrPart() {
    requestAnimationFrame(renderArrPart)
    partClear()
    particlesArr.map((el) => {
        el.update()
        el.border()
        line()
        el.render()
    })
}


