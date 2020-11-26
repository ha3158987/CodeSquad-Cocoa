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

class EACH_TOWN {

    constructor(name){
        this.basicInfo.name = name;
    }

    basicInfo = {
        name : "",
        hasPostBox : false,
        sizeOfPostBox : 0,
        child : []
    }
}

function makeNewTown (name) {
    index++;
    return new EACH_TOWN(name);
}

function pushIntoArray (array, element) {
    array.push(element);
}

function makeRandomNumberBetween (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function buildOuterTown (){
    const townA = makeNewTown("A");
    const townB = makeNewTown("B");
    const townC = makeNewTown("C");
    const townD = makeNewTown("D");

    pushIntoArray(treeMap, townA);
    pushIntoArray(treeMap, townB);
    pushIntoArray(treeMap, townC);
    pushIntoArray(treeMap, townD);

    treeMap.forEach(outerTown => {
        const layer = makeRandomNumberBetween(1, 5);
        makeNewChild(outerTown, layer);
    })

    console.dir(treeMap, {depth: null});
}

function makeNewChild (parentNode, layer) {

    const newTown = makeNewTown(countyNameArr[index]);
    parentNode.basicInfo.child.push(newTown);
    // console.dir(parentNode.basicInfo);

    if (count <= layer) {
        count++;
        makeNewChild(newTown, layer);
    } else if (count > layer){
        return;
    }
}

function init () {
    buildOuterTown();
}

init();
