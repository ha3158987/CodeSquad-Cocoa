//ES Class 사용 ver.
let toDoData = [];

/************************************1st module: todolist 데이터를 관리하는 Model Class*****************************/

class Model {

    saveNewData() {
        localStorage.setItem('toDoList', JSON.stringify(toDoData));
    }

    loadToDoData () {
        const loadedToDoData = localStorage.getItem('toDoList');

        if (loadedToDoData !== null) {
            const parsedToDoData = JSON.parse(loadedToDoData);
            return parsedToDoData;
        }
    }
}


/************************************2nd module: DOM 및 UI를 핸들링하는 View Class*********************************/

class View {

    makeElement(tagName){
        return document.createElement(tagName);
    }

    makeNewLi(text) {
        const taskText = text;
        const newItem = this.makeElement('li');
        const newId = toDoData.length + 1;
        const checkBox = this.makeElement('input');
        const span = this.makeElement('span');
        const delBtn = this.makeElement('button');
        const trashIcon = `<ion-icon name="trash-outline"></ion-icon>`;


        checkBox.classList.add("new_item");
        newItem.classList.add("list");
        checkBox.type = "checkbox";
        span.innerText = taskText;
        delBtn.innerHTML = trashIcon;
        delBtn.addEventListener("click", this.deleteToDo);

        newItem.appendChild(checkBox);
        newItem.appendChild(span);
        newItem.appendChild(delBtn);

        newItem.id = newId;
        const newToDoObj = {
            text: taskText,
            id: newId
        }
        toDoData.push(newToDoObj);

        this.renderNewLi (newItem);
    }

    deleteToDo(event) {
        const parentNode = document.getElementById("tasks");
        const clickedButton = event.target.parentNode;
        const li = clickedButton.parentNode;
        parentNode.removeChild(li);

        const updatedToDoData = toDoData.filter( eachObj => {
            return eachObj.id !== parseInt(li.id);
        });
        toDoData = updatedToDoData;

        localStorage.setItem('toDoList', JSON.stringify(toDoData));
    }

    renderNewLi (newLi){
        const parentNode = document.getElementById("tasks");
        parentNode.appendChild(newLi);
    }
}


/*************************3rd module: Model과 View의 중간매개체 역할을 하는 Controller Class***************************/

class Controller {

    constructor(view, model){
        this.view = view;
        this.model = model;
    }

    init() {
        this.addEvent();
        const parsedToDoData = this.model.loadToDoData();
        parsedToDoData.forEach( eachObj => {
            this.view.makeNewLi(eachObj.text);
        })
    }

    addEvent() {
        const button = document.querySelector(".button");
        const inputText = document.querySelector(".task_text");

        button.addEventListener('click', () => {
            if (inputText.value === "") {
                alert("입력칸이 비었습니다. 할 일을 입력하세요.");
            } else {
                const currentValue = document.querySelector(".task_text").value;
                this.view.makeNewLi(currentValue);
                this.model.saveNewData();
                inputText.value = "";
            }
        });

    }

}

const model = new Model();
const view = new View();
const controller = new Controller(view, model);
controller.init();


