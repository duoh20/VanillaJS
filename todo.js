const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = []; //입력한 todo를 담을 배열을 생성

function saveToDos() { //로컬에 입력한 todo를 저장하는 함수
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
} //배열에 object로 담기기 때문에 JSON.stringify()를 사용해 String으로 형변환

function paintToDo(text) { //제출된 자료를 리스트 형식으로 출력하는 함수
    const li = document.createElement("li"); //문서에 요소를 생성함
    const delBtn = document.createElement("button"); //리스트 생성 시 삭제 버튼 생성
    const span = document.createElement("span");
    const newId = toDos.length + 1 //배열이 처음에는 비어있으므로 1을 더해줘야함
    delBtn.innerHTML  = "❌";
    span.innerText = text;//submit 함수에서 가져온 텍스트 값을 span으로 감싼다
    li.appendChild(delBtn); //li안에 delBtn을 넣음
    li.appendChild(span); //li안에 span을 넣음
    li.id = newId; //todo 리스트를 생성하여 개별 목록에 아이디 부여
    toDoList.appendChild(li); //toDoList에 li를 넣음
    const toDoObj = {
        text: text,
        id:newId
    };
    toDos.push(toDoObj);//array에 toDoObj를 추가
    saveToDos();//push한 후에 호출해야 저장될 내용이 있음 주의!
}

function handleSubmit(event) { //제출한 자료를 처리하는 함수
    event.preventDefault(); //기본 동작을 제한
    const currentValue = toDoInput.value;
    paintToDo(currentValue); //제출하면 데이터 출력 함수를 호출함
    toDoInput.value = ""; //제출한 텍스트를 지우고 플레이스 홀더가 나타나게 함
}

function loadedToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) { //이 form은 항상 노출하게 할 예정
        const parsedToDos = JSON.parse(loadedToDos); //String을 object로 변환
        parsedToDos.forEach(function(toDo) {
            //forEach() array에 담겨있는 것들을 각각 한 번씩 실행하는 함수, forEach는 기본적으로 함수를 실행함
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadedToDos(); //local storage에 저장된 to do를 불러옴
    toDoForm.addEventListener("submit",  handleSubmit); //to do를 생성
}

init();
