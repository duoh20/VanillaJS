const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImgLoad() {
    console.log("finished loading");
}

function genRandom() {
    const number = Math.floor(Math.random() * 3);
    return number;
} //랜덤한 이미지 출력을 위해 난수 추출

function paintImage(imgNumber) {
    const img = new Image();
    img.src = `background/${imgNumber + 1}.jpg`;
    img.classList.add("bgImage");
    body.appendChild(img);
} //추출된 난수의 배경 이미지를 불러오는 함수


function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();