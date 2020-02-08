const body = document.querySelector('body');

const IMG_NUMBER = 9;

function paintBgImage(imgNumber) {
    const image = new Image();
    image.src = `img/${imgNumber + 1}.jpg`;
    image.classList.add('bgImage');
    body.prepend(image);
    // body.appendChild(image);
}
function getRandom() {
    const randomNum = Math.floor(Math.random() * IMG_NUMBER);
    return randomNum;
}

function init() {
    const number = getRandom();
    paintBgImage(number);
}

init();