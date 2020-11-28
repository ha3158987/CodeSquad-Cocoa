/*
1. 데이터 구조 만들기 (완료)
먼저 중첩된 객체 트리 형태의 (충돌을 피할 수 있는)자료구조를 만든다.
그게 어렵다면 일단 배열에 객체를 요소로 가진 구조를 만들어볼 수 있다.[{}, {}, {}, {}, {}]
DOM은 생각하지 말고 자료구조만 만들것.

2. UI에 띄우기
View 클래스를 만들어서 DOM을 조작한다.
UI에 렌더링 하는 작업을 수행한다.
*/
const treeMap = [];   //모든 마을정보를 객체트리 형태의 자료구조로 가지고 있다. 요소는 최대 4개(가장 바깥 마을)를 가지고 있다.
const countyNameArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let index = 4; //+1 하게 되면 총 마을 수를 구할 수 있음.
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

    makeNewTown (name) {
        index++;
        return new EACH_TOWN(name);
    }

    pushIntoArray (array, element) {
        array.push(element);
    }

    buildOuterTown (){
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

        console.dir(treeMap, {depth: null});
    }

    makeNewChild (parentNode, layer) {

        const newTown = this.makeNewTown(countyNameArr[index]);
        parentNode.child.push(newTown);

        if (count <= layer) {
            count++;
            this.makeNewChild(newTown, layer);
        } else if (count > layer){
            return;
        }
    }

    countNumberOfPostBox () {
        /* 미션 디테일:
        1. 빨간색 우체통을 가진 마을은 '빨간색 테두리'로 표시된다.
        2. 빨간색 우체통을 가진 마을정보를 텍스트로 표현해야 한다(name의 값)
        3. 우체통은 각각 크기가 다르다, 크기가 순으로 정렬해서 정보를 표시한다.(sizeOfPostBox) */
        let townWithPostBox = [];

        //***treemap 탐색하기***
        //treemap을 순회하면서 hasPostBox의 값이 'true'인지 확인한다.
        //true일 경우 {마을이름, 우체통사이즈}를 담은 obj를 새로운 배열(townWithPostBox)에 추가한다. (없으면 return)
        //child가 있는지(child배열의 길이가 0 인지 아닌지) 확인한 후, 있을경우 자식요소의 hasPostBox를 확인한다.
        //자식요소의 hasPostBox가 true일 경우 해당객체의 {마을이름, 우체통사이즈}를 새로운 배열(townWithPostBox)에 추가한다.   <-- 여기서부터 반복
    }

}

/***************************************************** DOM 핸들링과 UI 렌더링 역할을 하는 View 클래스 ********************************************************* */

class View {

    _ (cssSelector) {
        return document.querySelector(cssSelector);
    }

    createRactangle(outerTown, outerTownDiv) {

        const childObj = outerTown.child[0];
        let rectangle = document.createElement("div");
        rectangle.classList.add("new_town");
        rectangle.innerHTML = childObj["name"];
        outerTownDiv.appendChild(rectangle);

        if (childObj.child.length !== 0) {

            return this.createRactangle(childObj, rectangle);
        }
        return rectangle;
    }

    showMap (grid) {
        const newGridArr = [grid[0], grid[1], grid[2], grid[3]];
        let idx = 0;

        const arrOfOuterTownDiv = treeMap.map(outerTown => {
            const outerTownDiv = document.createElement("div");
            outerTownDiv.classList.add("new_town");
            outerTownDiv.innerHTML = outerTown.name;

            if (outerTown.child.length !== 0){
                const newChild = this.createRactangle(outerTown, outerTownDiv);
            }

            return outerTownDiv;
        })

        console.log(arrOfOuterTownDiv);

        arrOfOuterTownDiv.forEach(div => {
            newGridArr[idx].appendChild(div);
            idx++;
        })
    }
}


/***************************************************** 클래스들의 중계역할을 하는 Controller 클래스 *********************************************************** */

class Controller {

    constructor(map, view) {
        this.map = map;
        this.view = view;
    }

    init () {
        this.map.buildOuterTown();
        this.addUI();
    }

    addUI () {
        const grid = document.querySelectorAll(".grid");
        // console.log(grid);
        this.view.showMap(grid);

    }

}

const map = new Map;
const view = new View;
const controlMap = new Controller(map, view);
controlMap.init();
