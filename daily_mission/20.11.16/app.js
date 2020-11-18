//ES Class 사용 ver. - 만드는 중...

/************************************1st module: todolist를 처리하는 Model Class*****************************/
//1. 아이템 추가 (input 데이터가 계속 추가되기 때문에 생성자함수를 쓰기)


class Model {  //데이터만을 다뤄야 한다. 데이터 관리....

    makeElement(tagName){
        return document.createElement(tagName);
    }

    makeNewLi() { //li tag 만들기
        const taskText = document.querySelector(".task_text").value;
        const newItem = this.makeElement('li');
        const checkBox = this.makeElement('input');
        const trashIcon = this.makeElement('ion-icon');

        checkBox.classList.add("new_item");
        newItem.classList.add("list");
        checkBox.type = "checkbox";
        newItem.textContent = taskText;
        trashIcon.name = "trash-outline";

        newItem.appendChild(trashIcon);
        newItem.appendChild(checkBox);

        return newItem;
    }
}


class View { //UI, DOM관련

    renderNewLi (newLi){
        const parentNode = document.getElementById("tasks");
        parentNode.appendChild(newLi);
    }
}


class Controller { //li추가 등 (데이터를 실제로 갖고 있는 것이기 때문)
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
                const newItem = model.makeNewLi();
                this.view.renderNewLi(newItem);
                inputText.value = "";
            }
        });
    }

}

const model = new Model();
const view = new View();
const controller = new Controller(view, model);
controller.init();


