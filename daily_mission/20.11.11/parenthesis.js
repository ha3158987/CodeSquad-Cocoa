//[2020.11.11 미션1] 괄호문법 검사기
/*-------------------------------------- test용 string --------------------------------------------*/

const data1 = "[1,2,[3,4,[5,[6]]]]";
const data2 = "[2, 4, 8, 10, [12, 14, [16, 18]], 20, 22, [24, 26]]";
const data3 = "[1,2,[3,4,[5,[6]]";    //괄호매칭이 되지 않는 예시

/*----------------- 1 & 2. 객체 분석정보 출력하기 & 괄호매칭에 문제가 있는 경우 오류내용 출력 ---------------------*/

//두자리 이상의 수를 정상변환 해주는 함수
function changeDigits (arr) {
    const chgedArr = [];
    let tempArr = [];

    arr.forEach(function (el) {
        if (Number.isInteger(el * 1) && el !== " ") {
            tempArr.push(el);
        }
        else if (isNaN(el * 1)) {
            const num = tempArr.join("")
            if (num !== "") {
                chgedArr.push(num);
            }
            tempArr = [];
        }
    })
    return chgedArr;
}

//배열의 깊이를 카운트하는 함수
function countDepth (arr) {
    let countBracketPair = 0;
    let depth = 0;

    arr.forEach(function (e) {
        if (e === "["){
            countBracketPair++;

            if (countBracketPair > depth) {
                depth = countBracketPair;
            }
        }
        else if (e === "]"){
            countBracketPair--;
        }
    })

    if (countBracketPair !== 0){
        const msg = "닫는 괄호가 일치하지 않습니다.";
        throw msg;
    }

    return depth;
}

/*-------------------------------- 3. 배열 분석정보 tree 형태로 만들기 ---------------------------------------*/

let dataTree = {
    type : "root",
    child : []
}

function makeDataTree (arr, obj){
    let newObj = makeNewArrayObject();

    arr.forEach(function (el) {
        let childObj;

        if (isArray(el)){
            childObj = makeNewArrayObject();
            makeDataTree (el, newObj);
        }
        else {
            childObj = makeNewNumberObject(el);
        }
        newObj["child"].push(childObj);
    })

    obj["child"].push(newObj);
    return obj;
}


function isArray (data) {
    return Array.isArray(data) ? true : false;
}


function makeNewArrayObject () {
    let newInnerObj = {
        type : "array",
        child : []
    }
    return newInnerObj;
}


function makeNewNumberObject (number) {
    let newInnerObj = {
        type : "number",
        value : number,
        child : []
    }
    return newInnerObj;
}

/*------------------------------------------- run 함수 & test case ------------------------------------------------*/

function run (dataStr) {
    const dataArr = dataStr.split("");
    let numOfDepth;

    try {
        numOfDepth = countDepth(dataArr);
    } catch (errorMsg) {
        return errorMsg;
    }

    const numOfElements = changeDigits(dataArr).length;
    const normalArr = eval(dataStr);
    const objTree = makeDataTree(normalArr, dataTree);

    return printAnswerInfo (numOfDepth, numOfElements, dataStr, objTree);
}

function printAnswerInfo (numOfDepth, numOfElements, dataStr, objTree){
    let returnMessage;
    returnMessage = `깊이 수준은 ${numOfDepth}이며, 총 ${numOfElements}개의 원소가 포함되어 있습니다.`
    console.log (returnMessage);
    console.log(`input 데이터: ${dataStr}`);
    console.log("input 데이터 객체구조로 변환:");
    console.dir(objTree, { depth: null });
    return returnMessage;
}

console.log(`data1: ${run(data1)}`);
console.log(`data2: ${run(data2)}`);
console.log(`data3: ${run(data3)}`);
