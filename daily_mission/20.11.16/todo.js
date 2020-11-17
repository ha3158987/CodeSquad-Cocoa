// global func ver.

const toDoForm = document.querySelector(".js-toDoForm"), //class명으로 가져옴
toDoInput = toDoForm.querySelector("input"),    //태그로 가져옴
toDoList = document.querySelector(".js-toDoList");

const TODOS_LOCALSTORAGE = 'toDos';  //로컬 스토리지에 value를 요청할 key 값

function paintToDo(text){
    console.log(text);
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const icon = `<ion-icon name="trash-outline"></ion-icon>`;
    delBtn.innerHTML = icon;
    // delBtn.innerHTML = "🙅🏻‍♀️";
    const span = document.createElement("span");
    span.innerText = text; //input text가 된다.
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
}

function handleSubmit(event) {
    event.preventDefault();   //현재 이벤트의 기본 동작을 중단한다. a 태그면 링크를 여는 행위를 실행하지 않음.
    const currentValue = toDoInput.value; //입력된 text 가져오기
    paintToDo(currentValue);
    toDoInput.value = ""; //다시 입력창을 빈칸으로 되돌려줌.
}

function loadToDos () {
    const toDos = localStorage.getItem(TODOS_LOCALSTORAGE);  //반환되는 key는 배열?
    if (toDos !== null){ //toDos가  null이 아닐때만

    }
}

function init (){
    loadToDos (); //로컬 스토리지로부터 로드 해야하기 때문에
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
