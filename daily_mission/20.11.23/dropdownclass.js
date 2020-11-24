/*
ES6 Class ver.
1. 데이터를 처리하는 Model 클래스
2. 화면에 렌더링을 하는 View 클래스
3. Model과 View 클래스를 연결해주는 Controller 클래스
*/

//util 만들기
const _ = {
    $(cssSelector, base=document) {
        return base.querySelector(cssSelector);
    }
}

/*************************************************** Model Class ******************************************************* */

class Model {

    makeUITemplate () {
        // const fruitBasket = _.$(".fruit-basket");
        const fruitArray = ["포도", "사과", "오렌지", "바나나", "키위", "딸기"];
        let template = ``;

        fruitArray.forEach(fruit => {
            const innerTemplate = `<li class="fruit">${fruit}</li>`
            template += innerTemplate;
        })

        // fruitBasket.innerHTML = template;
        return template;
    }



}

/*************************************************** View Class ******************************************************* */

class View {

    unShow(value) {
        value.classList.add("invisible");
    }

    stopInstructionMessage() {
        const message = _.$(".instruction_message");
        this.unShow(message);
    }

    showFruits(template, parentNode) {
        this.stopInstructionMessage();
        console.log("moseover되었습니다.");

        const countOneSecond = setTimeout(() => {
            const fruitBasket = _.$(".fruit-basket");
            fruitBasket.innerHTML = template;
        }, 1000);

        parentNode.addEventListener('mouseout', function() {
            clearTimeout(countOneSecond);
        });
    }

}

/*************************************************** Controller Class ******************************************************* */

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
