/*
1. 데이터 구조 만들기 (충돌을 피할 수 있게)
먼저 중첩된 객체 트리 형태의 자료구조를 만든다.
그게 어렵다면 일단 배열에 객체를 요소로 가진 구조를 만들어볼 수 있다.[{}, {}, {}, {}, {}]
DOM은 생각하지 말고 자료구조만 만들것.

2. UI에 띄우기
*/
const treeMap = [];   //모든 마을정보를 객체트리 형태의 자료구조로 가지고 있다. 요소는 최대 4개(가장 바깥 마을)를 가지고 있다.
const countyNameArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let index = 4; //+1 하게 되면 총 마을 수를 구할 수 있음.
let count = 1;

function makeRandomNumberBetween (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

class EACH_TOWN {

    constructor(name){
        // this.basicInfo.name = name,
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

        this.pushIntoArray(treeMap, townA);
        this.pushIntoArray(treeMap, townB);
        this.pushIntoArray(treeMap, townC);
        this.pushIntoArray(treeMap, townD);

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

    countNumberOfPostBox () {}

}

function init () {
    const map = new Map();
    map.buildOuterTown();
}

init();
