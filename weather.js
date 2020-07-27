const weather = document.querySelector(".js-weather");

const API_KEY = "a2869686c071f3ded47347513248fbd5";//날씨 정보 API key
const COORDS = 'coords' //coordinate: 좌표

function getWeather(lat, lon) {
     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response) { //"then"을 사용하여 함수를 호출하는데, 데이터가 완전히 넘어온 다음, 즉, fetch가 완료된 후에 다음 함수를 호출해준다.
        return response.json(); //fetxch된 데이터가 담긴 "response"에서 .json()을 사용해 jason 데이터만 가져온다.
     }).then(function(json) {
         const temperature = json.main.temp; 
         const place = json.name;
         weather.innerText = `${temperature} @ ${place}`
     });
}
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){ //좌표를 가져오는 것을 성공헀을 때 사용하는 함수
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //객체에 변수 이름과 객체의 key의 이름을 같게 저장할 때에는 latitude : latitude 대신 latitude로 축약해서 적어도 됨
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

function handleGeoErr() {
    console.log("Can't access geo location");
}

function askForCoords() { //좌표를 받아오는 기능
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErr)
    //geolocation은 Object이고 하위의 getCurrentPosition()를 호출
}

function loadCoords() { //로컬에 저장된 위도, 경도 정보가 없을 때
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else { //이미 로컬에 저장된 좌표 정보가 있을 떄
        const parseCoords = JSON.parse(loadedCoords); //json형식의 스트링을 object로 변환
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}



function init() {
    loadCoords();
}

init();