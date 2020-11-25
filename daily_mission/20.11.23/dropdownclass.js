/*
ES6 Class ver.
*/

const _ = {
    $(cssSelector, base=document) {
        return base.querySelector(cssSelector);
    }
}

/********************************************** 데이터를 처리하는 Model Class ******************************************************* */

class Model {

    countingTemplate = ``;

    fruitData = {
        "포도" : 0,
        "사과" : 0,
        "오렌지" : 0,
        "바나나" : 0,
        "키위" : 0,
        "딸기" : 0
    }

    fruitArray = Object.keys(this.fruitData);

    makeUITemplate() {
        let template = ``;

        this.fruitArray.forEach(fruit => {
            const innerTemplate = `<li class="fruit">${fruit}</li>`
            template += innerTemplate;
        })

        return template;
    }

    makeCountingTemplate(textContent) {
            const innerData = `<li class="data_fruit">${textContent} : ${this.fruitData[textContent]}</li>`
            console.log(innerData);
            this.countingTemplate += innerData;

        return this.countingTemplate;
    }
}

/************************************************ UI 렌더링을 하는 View Class ******************************************************* */

class View {

    unShow(value) {
        value.classList.add("invisible");
    }

    stopInstructionMessage() {
        const message = _.$(".instruction_message");
        this.unShow(message);
    }

    showFruits(template, parentNode) {
        const fruitBasket = _.$(".fruit-basket");
        const container = _.$(".inner-container-2");

        this.stopInstructionMessage();

        const countOneSecond = setTimeout(() => {
            fruitBasket.innerHTML = template;
        }, 1000);

        parentNode.addEventListener('mouseleave', function() {
            clearTimeout(countOneSecond);
        });

        container.addEventListener('mouseleave', this.hideFruits);

        // fruitList.addEventListener('mouseenter', console.log("데이터를 보여달라"));
    }

    hideFruits() {

        const fruits = document.querySelectorAll('.fruit');
            fruits.forEach(fruit => {
            fruit.classList.add("invisible");
        })
    }

    renderCountingTemplate(template) {
        let data = ``;
        const dataBox = _.$(".data_box");

        data += template;
        dataBox.innerHTML = data;
    }

}

/******************************************* Model과 View 클래스를 연결해주는 Controller Class ******************************************* */

class Controller {

    constructor (view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.addEvent();
    }

    addEvent() {
        const dropBox = _.$("#show_box");

        dropBox.addEventListener('mouseenter', () => {
            const fruitTemplate = this.model.makeUITemplate();
            this.view.showFruits(fruitTemplate, dropBox);

            this.addCountObj();
        });

    }

    addCountObj() {
        const fruitList = document.querySelectorAll(".fruit");  //여기서 뭔가 계속 꼬임
        console.dir(fruitList);

        fruitList.forEach(fruit => {
            console.log(fruit);

            fruit.addEventListener('mouseenter', () => {

                console.log("마우스가 과일 위에 올라갔습니다.")
                const countingTemplate = this.model.makeCountingTemplate(fruit.innerHTML);  //"포도"
                this.view.renderCountingTemplate(countingTemplate);
            })
        })
    }
}

const model = new Model();
const view = new View();
const controller = new Controller(view, model);
controller.init();
