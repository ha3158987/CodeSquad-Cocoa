//[2020.11.11 미션1] 괄호문법 검사기
/*-------------------------------------- test용 string --------------------------------------------*/

const data1 = "[1,2,[3,4,[5,[6]]]]";
const data2 = "[2, 4, 8, 10, [12, 14, [16, 18]], 20, 22, [24, 26]]";
const data3 = "[1,2,[3,4,[5,[6]]";    //괄호매칭이 되지 않음

/*----------------- 1 & 2. 객체 분석정보 출력하기 & 괄호매칭에 문제가 있는 경우 오류내용 출력 ---------------------*/

//두자리 이상의 수를 정상변환 해주는 함수
function chgDigits (arr) {
    const chgedArr = [];
    let tempArr = [];

    arr.forEach(function (el) {
        if (Number.isInteger(el * 1) && el !== " ") {
            tempArr.push(el);
        } else if (isNaN(el * 1)) {
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
    let countBracketPair = 0; //'['면 ++, ']'면 --
    let depth = 0; //'['의 숫자만큼 ++; 반환시에는 countBracketPair가 0일때만 반환(아닐 경우 오류내용 출력).

    arr.forEach(function (e) {
        if (e === "["){
            countBracketPair++;
            depth++;
        } else if (e === "]"){
            countBracketPair--;
        }
    })

    if (countBracketPair !== 0){
        const msg = "닫는 괄호가 일치하지 않습니다.";
        throw msg;
    }

    return depth;
}


function run (dataStr) {
    const dataArr = dataStr.split("");   //배열 형태로 바꾸가  ['[', '1', ',', '2', ',', '[', '3', ',', '4', ',', '[', '5', ',', '[', '6', ']', ']', ']', ']']
    let numOfDepth; //깊이 세어보기
    try {
        numOfDepth = countDepth(dataArr);
    } catch (errorMsg) {
        return errorMsg;
    }

    const numOfEl = chgDigits(dataArr).length; //원소 수 세기  ['2', '4', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26'] //Array.flat
    const normalArr = eval(dataStr);   //[ 1, 2, [ 3, 4, [ 5, [6]]]] 문자열을 자바스크립트 코드로 인식.
    const objTree = makeDataTree(normalArr, dataTree); //객체 형태로 만들기

    console.log(objTree);
    return `깊이 수준은 ${numOfDepth}이며, 총 ${numOfEl}개의 원소가 포함되어 있습니다.`;
}

/*-------------------------------- 3. 배열 분석정보 tree 형태로 만들기 ---------------------------------------*/
//재귀 사용해야 할 듯. 어디서부터 재귀를 사용할 것인가.

let dataTree = {
    type : "root",
    child : []
}

function makeDataTree (arr, obj){
    let newObj = {};
    newObj["type"] = "array";
    newObj["child"] = [];

    arr.forEach(function (el) {
        //el은 배열이거나 숫자이거나 둘 중 하나
        let childObj = {};

        if (Array.isArray(el)){  //배열인경우
            childObj["type"] = "array";
            childObj["child"] = [];
            makeDataTree (el, newObj);
        } else { //숫자인경우
            childObj["type"] = "number";
            childObj["value"] = el;
            childObj["child"] = [];
        }
        newObj["child"].push(childObj);
    })
    obj["child"].push(newObj);

    return obj;
}


/*------------------------------------------- test case ------------------------------------------------*/

console.log(`data1: ${run(data1)}`);
console.log(`data2: ${run(data2)}`);
console.log(`data3: ${run(data3)}`);
