/*
1. 데이터 구조 만들기 (완료)
먼저 중첩된 객체 트리 형태의 (충돌을 피할 수 있는)자료구조를 만든다.
그게 어렵다면 일단 배열에 객체를 요소로 가진 구조를 만들어볼 수 있다.[{}, {}, {}, {}, {}]
DOM은 생각하지 말고 자료구조만 만들것.

2. UI에 띄우기
View 클래스를 만들어서 DOM을 조작한다.
UI에 렌더링 하는 작업을 수행한다.
*/
const treeMap = [];
let townWithPostBox = [];
const countyNameArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let index = 4;
let count = 1;

function makeRandomNumberBetween (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/***************************************************** 새로운 마을을 하나씩 생성하는 EACH_TOWN 클래스 *********************************************************** */

class EACH_TOWN {

    constructor(name){
        this.name = name,
        this.hasPostBox = this.createPostBox(),
        this.sizeOfPostBox = this.setSizePostBox(),
        this.child = []
    }

    createPostBox() {
        const random = makeRandomNumberBetween(1, 10);
        if (random > 6) {
            return true;
        }
        return false;
    }

    setSizePostBox() {

        if(this.hasPostBox){
            const randomSize = makeRandomNumberBetween(1, 100);
            return randomSize;
        } else {
            return "not available";
        }
    }
}

/***************************************************** 지도 전반에 필요한 데이터를 핸들링하는 Map 클래스 *********************************************************** */

class Map {

    makeNewTown(name) {
        index++;
        return new EACH_TOWN(name);
    }

    pushIntoArray(array, element) {
        array.push(element);
    }

    buildOuterTown(){
        const townA = this.makeNewTown("A");
        const townB = this.makeNewTown("B");
        const townC = this.makeNewTown("C");
        const townD = this.makeNewTown("D");

        const outerTownArr = [townA, townB, townC, townD];

        outerTownArr.forEach(outerTown => {
            this.pushIntoArray(treeMap, outerTown);
        });

        treeMap.forEach(outerTown => {
            const layer = makeRandomNumberBetween(1, 5);
            this.makeNewChild(outerTown, layer);
        })

    }

    makeNewChild(parentNode, layer) {

        const newTown = this.makeNewTown(countyNameArr[index]);
        parentNode.child.push(newTown);

        if (count <= layer) {
            count++;
            this.makeNewChild(newTown, layer);
        } else if (count > layer){
            return;
        }
    }

}

/***************************************************** DOM 핸들링과 UI 렌더링 역할을 하는 View 클래스 ********************************************************* */

class View {

    createRactangle(outerTown, outerTownDiv) {
        const childObj = outerTown.child[0];
        let rectangle = document.createElement("div");

        rectangle.classList.add("new_town");
        this.createPostBox(rectangle, childObj);
        this.setRandomSizeAndLocation(rectangle);
        outerTownDiv.appendChild(rectangle);

        if (childObj.child.length !== 0) {
            return this.createRactangle(childObj, rectangle);
        }
    }

    createPostBox(div, obj) {
        const randomPick = makeRandomNumberBetween(0, 10);
        const townName = obj.name;

        if (obj.hasPostBox){

            let postBoxData = {
                name: townName,
                size: obj.sizeOfPostBox
            }
            townWithPostBox.push(postBoxData);
            div.classList.add("postbox_available");//우편함이 있는 마을들은 클래스를 하나 더 줌.
            div.innerHTML =  `${townName} 📮`;
        } else {
            div.innerText = townName;
        }
    }

    getRandomMarginValue(min, max){
        const margin = makeRandomNumberBetween(min, max) /10;
        return margin;
    }

    getTrueOrFalse(){
        const zeroOrOne = makeRandomNumberBetween(0, 1);
        if (zeroOrOne === 0){
            return false;
        }
        return true;
    }

    setRandomSizeAndLocation(newTown) {
        const _ = newTown.style;

        _.margin = `${this.getRandomMarginValue(0, 5)}rem ${this.getRandomMarginValue(0, 5)}rem ${this.getRandomMarginValue(0, 5)}rem ${this.getRandomMarginValue(0, 5)}rem`;

        if (this.getTrueOrFalse()){
            _.cssFloat = "right";
        } else {
            _.cssFloat = "left";
        }

    }

    showMap(grid) {
        const newGridArr = [grid[0], grid[1], grid[2], grid[3]];
        let idx = 0;

        const arrOfOuterTownDiv = treeMap.map(outerTown => {
            const outerTownDiv = document.createElement("div");
            this.setRandomSizeAndLocation(outerTownDiv);
            outerTownDiv.classList.add("new_town");
            outerTownDiv.innerHTML = outerTown.name;

            if (outerTown.child.length !== 0){
                this.createRactangle(outerTown, outerTownDiv);
            }

            return outerTownDiv;
        })

        arrOfOuterTownDiv.forEach(div => {
            newGridArr[idx].appendChild(div);
            idx++;
        })
    }

    showPostBoxData() {
        let str = "";
        let strInOrder = "";
        const sortedArray = this.sortArray();
        const data = document.querySelector(".data");

        townWithPostBox.forEach(townObj => {
            str += `${townObj.name}, `;
        });

        sortedArray.forEach(town => {
            strInOrder += `${town}, `;
        });

        let textData = `${str}<br> 총 ${townWithPostBox.length}개의 마을이<br> 우체통을 가지고 있습니다. <br></br> 우체통의 크기는<br> ${strInOrder} 순 입니다.`
        if (sortedArray.length === 0){
            textData = `우체통을 가진 마을이 없습니다.`;
        }

        data.innerHTML = textData;
        this.colorTownBorderRed();
    }

    sortArray(){
        const arrayColon = JSON.parse(JSON.stringify(townWithPostBox)); //깊은 복사
        let sizeInOrder = [];
        const townInOrder = [];

        arrayColon.forEach((town) => {
            sizeInOrder.push(town.size);
        });

        sizeInOrder.sort(function(a, b){
            return b - a;
        });

        sizeInOrder.forEach(el => {
            for (let i = 0; i < arrayColon.length; i++){
                if (arrayColon[i].size === el) {
                    townInOrder.push(arrayColon[i].name);
                }
            }
        })

        return townInOrder;
    }

    colorTownBorderRed() {
        const postBoxTowns = document.querySelectorAll(".postbox_available");

        postBoxTowns.forEach(town => {
            town.style.border = "0.1rem solid #ff6b6b";
        })

    }
}


/***************************************************** 클래스들의 중계역할을 하는 Controller 클래스 *********************************************************** */

class Controller {

    constructor(map, view) {
        this.map = map;
        this.view = view;
    }

    init() {
        this.map.buildOuterTown();
        this.addUI();
        this.addButtonEvent();
    }

    addUI() {
        const grid = document.querySelectorAll(".grid");
        this.view.showMap(grid);
    }

    addButtonEvent() {
        const button = document.querySelector(".check_post_box");
        button.addEventListener("click", this.view.showPostBoxData.bind(this.view));
    }
}

const map = new Map;
const view = new View;
const controlMap = new Controller(map, view);
controlMap.init();
