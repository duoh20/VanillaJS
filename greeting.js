const form = document.querySelector(".js-form"),
   input = form.querySelector("input"),
   greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function handleSubmit(event){
    event.preventDefault(); //preventDefault : 기본으로 설정되어 있는 이벤트를 실행하지 못하도록 막음
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){ 
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //she is not
        askForName();
    } else {
         //she is
         paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();