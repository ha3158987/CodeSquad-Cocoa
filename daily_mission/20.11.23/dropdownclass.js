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

    makeUITemplate () {
        const fruitArray = ["포도", "사과", "오렌지", "바나나", "키위", "딸기"];
        let template = ``;

        fruitArray.forEach(fruit => {
            const innerTemplate = `<li class="fruit">${fruit}</li>`
            template += innerTemplate;
        })

        return template;
    }
}

/************************************************ UI 렌더링을 하는 View Class ******************************************************* */

class View {

    // const fruitBasket = _.$(".fruit-basket");

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
    }

    hideFruits() {

        const fruits = document.querySelectorAll('.fruit');
            fruits.forEach(fruit => {
            fruit.classList.add("invisible");
        })
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
        });
    }
}

const model = new Model();
const view = new View();
const controller = new Controller(view, model);
controller.init();
