//ES Class 사용 ver. - 만드는 중...

/************************************1st module: todolist 데이터를 관리하는 Model Class*****************************/

class Model {
    //내용 입력 필요

}


/************************************2nd module: DOM 및 UI를 핸들링하는 View Class*****************************/

class View {

    makeElement(tagName){
        return document.createElement(tagName);
    }

    makeNewLi() {
        const taskText = document.querySelector(".task_text").value;
        const newItem = this.makeElement('li');
        const checkBox = this.makeElement('input');
        const span = this.makeElement('span');
        const delBtn = this.makeElement('button');
        const trashIcon = `<ion-icon name="trash-outline"></ion-icon>`;

        checkBox.classList.add("new_item");
        newItem.classList.add("list");
        checkBox.type = "checkbox";
        span.innerText = taskText;
        delBtn.innerHTML = trashIcon;

        newItem.appendChild(checkBox);
        newItem.appendChild(span);
        newItem.appendChild(delBtn);

        this.renderNewLi (newItem);
    }

    renderNewLi (newLi){
        const parentNode = document.getElementById("tasks");
        parentNode.appendChild(newLi);
    }
}


/******************************3rd module: Model과 View의 중간매개체 역할을 하는 Controller Class******************************/

class Controller {

    constructor(view, model){
        this.view = view;
        this.model = model;
    }

    init() {
        this.addEvent();
    }

    addEvent() {
        const button = document.querySelector(".button");
        const inputText = document.querySelector(".task_text");

        button.addEventListener('click', () => {
            if (inputText.value === "") {
                alert("입력칸이 비었습니다. 할 일을 입력하세요.");
            } else {
                this.view.makeNewLi();
                inputText.value = "";
            }
        });
    }

}

const model = new Model();
const view = new View();
const controller = new Controller(view, model);
controller.init();


