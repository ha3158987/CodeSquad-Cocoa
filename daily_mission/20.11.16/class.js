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

    makeNewLi(text, date) {
        const taskText = text;
        const dueDate = date;
        const newItem = this.makeElement('li');
        const newId = toDoData.length + 1;
        const checkBox = this.makeElement('input');
        const taskSpan = this.makeElement('span');
        const dateSpan = this.makeElement('span');
        const delBtn = this.makeElement('button');
        const trashIcon = `<ion-icon name="trash-outline"></ion-icon>`;


        checkBox.classList.add("new_item");
        newItem.classList.add("list");
        taskSpan.classList.add("taskText");
        dateSpan.classList.add("dueDate");
        checkBox.type = "checkbox";
        taskSpan.innerText = `${taskText}`;
        dateSpan.innerText = `${dueDate}`;
        delBtn.innerHTML = trashIcon;
        delBtn.addEventListener("click", this.deleteToDo);

        newItem.appendChild(checkBox);
        newItem.appendChild(taskSpan);
        newItem.appendChild(delBtn);
        newItem.appendChild(dateSpan);

        newItem.id = newId;
        const newToDoObj = {
            text: taskText,
            date: dueDate,
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
            this.view.makeNewLi(eachObj.text, eachObj.date);
        })
    }

    addEvent() {
        const button = document.querySelector(".button");
        const inputText = document.querySelector(".task_text");
        const dueDate = document.querySelector(".due_date");

        button.addEventListener('click', () => {
            if (inputText.value === "") {
                alert("입력칸이 비었습니다. 할 일을 입력하세요.");
            } else if (dueDate.value === "") {
                alert("마감일을 선택하세요.");
            } else {
                const currentValue = document.querySelector(".task_text").value;
                const dueDateValue = document.querySelector(".due_date").value;   //sting으로 들어옴. 2020-11-19

                this.view.makeNewLi(currentValue, dueDateValue);
                this.model.saveNewData();
                inputText.value = "";
                dueDate.value = "";
            }
        });

    }

}

const model = new Model();
const view = new View();
const controller = new Controller(view, model);
controller.init();


