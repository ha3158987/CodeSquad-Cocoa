// global func ver.

const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
addButton = toDoForm.querySelector("a"),
toDoList = document.querySelector(".js-toDoList");
const TODOS_LOCALSTORAGE = 'toDos';  //로컬 스토리지에 value를 요청할 key 값
let toDos = [];

addButton.addEventListener("click", handleSubmit);

function deleteToDo (event) {
    // 각 요소의 부모요소인 li는 id를 가지고 있음.
    const btn = event.target.parentNode;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    }); //id가 서로 일치가 안되는 것들만 다시 배열로 받음. 지워진 값들을 빼고!
    toDos = cleanToDos;
    saveToDos(); //중요: replace한 다음에 save한다.
}

function saveToDos() {
    localStorage.setItem(TODOS_LOCALSTORAGE, JSON.stringify(toDos));
}

function renderToDo(text){
    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    const labelName = document.createElement("label");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;
    const icon = `<ion-icon name="trash-outline"></ion-icon>`;
    delBtn.innerHTML = icon;
    span.innerText = text; //input text가 된다.
    delBtn.addEventListener("click", deleteToDo);
    li.appendChild(checkBox);
    li.appendChild(labelName);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId  //index는 0부터 시작하기 때문에 차례대로 넘버링.
    }
    toDos.push(toDoObj);
    saveToDos(); //로컬 스토리지에 저장
}

function handleSubmit(event) {
    event.preventDefault();   //현재 이벤트의 기본 동작을 중단
    const currentValue = toDoInput.value;
    if (currentValue === ""){
        alert("입력칸이 비었습니다! 내용을 입력하세요.");
    } else {
        renderToDo(currentValue);
    }
    toDoInput.value = "";
}

function loadToDos () {
    const loadedToDos = localStorage.getItem(TODOS_LOCALSTORAGE);

    if (loadedToDos !== null){ //null이 아닐때만(추가된 내용이 있을 때)
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (eachToDo){
            renderToDo(eachToDo.text);
        })
    }
}

function init (){
    loadToDos (); //로컬 스토리지로부터 저장된 toDos 객체를 불러옴.
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
