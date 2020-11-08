//[2020.11.04 미션2] 배열다루기

/*--------------------------------------------#1. factorial 함수 ----------------------------------------------*/
/*임의의 숫자(m)를 입력받아 1부터 m까지의 factorial 값을 배열로 담아서 반환하는 함수 만들기*/
function calculate (num){

    if (num === 1) {
        return 1;
    }

    return calculate(num - 1) * num;
}


/*------------------------------------------------#2. 배열 거르기 ------------------------------------------------*/
/*주어진 사람들 중 아래 조건을 만족하는 사람들로 구성된 배열을 만들어서 반환하는 함수 만들기.
- 특수기호가 없는 아이디 제외
- 아이디에서 숫자를 제거
*/
const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
const spc = /[~!@#$%^&*()_+|<>?:{}]/;
const nums = /[0-9]/g;

//1) for/while문을 사용한 버전 만들기.
function filterId (arrayOfId) {
    let idx = 0;
    const unneededEl = [];

    while (idx < arrayOfId.length) {
        let currentId = arrayOfId[idx];
        if (spc.test(currentId)) {
            unneededEl.push(arrayOfId[idx]);
        }
        idx++;
    }

    for (var j = 0; j < unneededEl.length; j++) {
        arrayOfId.splice(arrayOfId.indexOf(unneededEl[j]), 1);
    }

    const answerArr = [];
    for (let value of arrayOfId){
        for(let i = 0; i < value.length; i++){
            if (nums.test(value[i])) {
                value = value.replace(/[0-9]/g, "");
                answerArr.push(value);
            }
        }
        if (!answerArr.includes(value)){
            answerArr.push(value);
        }
    }

    return answerArr;
}

//2) forEach,filter, map등의 고차함수를 사용한 버전 만들기
function higherFilterIdFunc (arrayOfIds) {
    const filteredArr = arrayOfIds.filter(function (value){
        return !spc.test(value);
    }).map(function (eachId){
        let temp = eachId.split("");
        const removedNum = temp.filter(function (letter){
            return !nums.test(letter *= 1);
        })
        const str = removedNum.join("");
        return str;
    })

    return filteredArr;
}

/*------------------------------------------------------#3. 평균 구하기 -----------------------------------------------*/
/* 각 학생은 3가지 과목에 대한 점수를 가지고 있다. 각 학생의 평균점수와 모든 학생의 최고점수의 평균점수를 출력하라.*/
const grades = [[88,76,77], [33,44,44], [90,100,94], [30,44,98]];
const objScore = {};

// #3. 평균구하기 전체 실행
function findAverages () {
    findAvrgScoreOfEachStdt (grades);
    avrgOfAllStdtBestScore (grades)
    return objScore;
}

//1) 각 학생의 평균점수 구하기
function findAvrgScoreOfEachStdt (arrGrades){
    const arrAvrgEachStdt = arrGrades.map(findAvrg);
    objScore["각 학생의 평균점수:"] = arrAvrgEachStdt;
    return arrAvrgEachStdt;
};

//2) 모든 학생의 최고점수의 평균점수 구하기
function avrgOfAllStdtBestScore (arrGrades){
    const arrBestScores = [];

    arrGrades.forEach(function (arr){
        const gradesOfEachStdt = arr;
        let bestScore = 0;

        gradesOfEachStdt.forEach(function (score){
            if (score > bestScore) {
                bestScore = score;
            }
        })

        arrBestScores.push(bestScore);
    })

    const avrgOfEveryonesBestScore = findAvrg(arrBestScores);
    objScore["모든 학생의 최고점수의 평균점수"] = avrgOfEveryonesBestScore;
    return avrgOfEveryonesBestScore;
};

function findAvrg (arr){
    let total = 0;
    arr.forEach(score => {total += score});

    const avrgScore = total / arr.length;
    return avrgScore;
}

/*----------------------------------------------------#4. 배열 만들기 ---------------------------------------------------*/
/* o.js파일에 주어진 데이터 중에 숫자타입으로만 구성된 요소를 뽑아 배열만들기 */

const { o, dataTree } = require("./data");
let answerArr = [];

function findNumTypeElements (obj) {

    const entries = Object.entries(obj);
    entries.forEach(getNumberTypes);
    return answerArr;
}

function getNumberTypes (arr) {

    for (let key in arr[1]) {
        if (typeof arr[1][key] === "number") {
            answerArr.push(key);
        }
    }
}

/*---------------------------------------------------#5. 배열 결과 출력 --------------------------------------------------*/
/* type이 sk인, name으로 구성된 배열만 출력해본다. */
// Tip: 재귀로 풀기!!! 재귀로 풀어야 다음 미션을 풀 수 있음.
// 반복되는 패턴을 찾아야함!!!!!
// 종료조건(termination case)을 반드시 넣어줘야 한다!!!!!! 재귀 함수 내부에서는 반드시 조건에 따라 재귀를 호출하지 않는 경우가 존재해야 한다. 배열의 길이가 '0'일 때 끝이난다는 걸 알기 때문에 이걸 종료조건으로 줘야한다. 이 조건에 부합하는 경우가 있는지 반드시 확인할 것.


//배열명: dataTree
/*
- 키 "childnode"의 값으로 있는 배열에 요소가 있는지 확인한다. 요소가 없이(배열이 비어 있을 때까지 재귀)""가 나오면 return.
- 한 단계 들어갈 때마다 ["type"]의 value를 검사해 "sk" 와 일치하는지 검사한다.
- obj[type] === "sk" 일 경우, obj["name"] 의 값을 새로운 배열에 담는다.
*/
// let nextChildNodeArr;
// function findSkTypeName (arr) {
//     //자기자신을 호출해야한다.

//      //childnode가 있는 경우
//     nextChildNodeArr = arr.filter(hasChildnode);
//     // console.log("nextChildNodeArr!!!!", nextChildNodeArr);
//     if (nextChildNodeArr.length !== 0) {
//     //arr가 리턴되면(childnode가 있으면) 다시 findsktypename(재귀로 호출)
//         typeCheck(nextChildNodeArr);
//         findSkTypeName(nextChildNodeArr);


//         // let arr2 = [];
//         // findSkTypeName(arr2)
//     } else {  //여기서 false를 리턴받으면 재귀 종료
//         return;    //종료조건; childArray가 비어있을 때
//     }

//     return arrName;

// }

// //childnode의 value가 빈 배열이 아닌지 검사; 아닐경우(요소가 있을 경우) 재귀함수 실행
// function hasChildnode (obj){
//     //빈배열일 경우(childnode가 없을 경우)
//     if (obj["childnode"].length === 0) {
//         return [];
//     }
//     // findSkTypeName(obj["shildnode"]);
//     return obj["childnode"]; //true 대신 arr를 반환? 있을 경우 childnode array를 반환하고,

// }


// //type이 "sk"인지 아닌지 확인
// function typeCheck (arr){
//     arr.forEach(function (obj) {
//         if (obj["type"] === "sk") {
//             getObjName (obj);
//         }
//     })
// }

// //name의 값을 새 배열에 담기
// const arrName = [];
// function getObjName (obj) {
//     arrName.push(obj["name"]);
// };

/*----------------------------------------------------#6. reduce 만들기.-------------------------------------------------*/
//Array 의 reduce 메서드처럼 동작하는 myReduce 메서드를 만들자.
const arr = [1, 2, 3, 4, 5];

//내가 만드는 reduce 메소드
const myReduce = (arr, callback, initialValue) => {

    arr.forEach(function (el){
        if (initialValue === undefined) {
            initialValue = el;
        }
        initialValue = callback(initialValue, el);
    })

   return initialValue;
};

//만든 reduce 함수 실행결과 result에 담기
const result = myReduce(arr, (acc, cur) => {
    acc.push(cur * cur);
    return acc
}, []);

//기존 reduce 메소드 사용결과 originalReduceResult에 담기
let originalReduceResult = arr.reduce((acc, cur) => {
    acc.push(cur * cur);
    return acc
}, []);


/*------------------------------------------------------#test cases-----------------------------------------------------*/
function testCases () {
    console.log("재귀 factorial 함수:", calculate(5));   //output: 120
    console.log("for문 사용한 filter함수:", filterId(peoples));   //output: [ 'honux', 'head', 'zello', 'lucas' ]
    console.log("고차함수 사용한 filter함수:", higherFilterIdFunc(peoples));  //output: [ 'honux', 'head', 'zello', 'lucas' ]
    console.log("각 학생의 평균점수:", findAvrgScoreOfEachStdt(grades));
    /* output:
    [80.33333333333333, 40.333333333333336, 94.66666666666667, 57.333333333333336]*/
    console.log("모든 학생의 최고점수의 평균점수:", avrgOfAllStdtBestScore(grades));   //output: 82.5
    console.log("평균찾기함수 실행:", findAverages(grades));
    /* output:
    {
    '각 학생의 평균점수:': [
        80.33333333333333,
        40.333333333333336,
        94.66666666666667,
        57.333333333333336
     ],
    '모든 학생의 최고점수의 평균점수': 82.5
    }
    */
    console.log("객체에서 숫자타입 요소로만 이루어진 키값의 배열만들기:", findNumTypeElements(o));
    /* output:
    ['width', 'height', 'hOffset', 'vOffset', 'size', 'hOffset', 'vOffset'] */
    // console.log("type이 sk인, name으로 구성된 배열만들기:", findSkTypeName(dataTree));
    console.log("array의 reduce 메소드 사용 결과:", originalReduceResult);  //[ 1, 4, 9, 16, 25 ]
    console.log("내가 만든 reduce 함수 사용 결과:", result);  //[ 1, 4, 9, 16, 25 ]
}

testCases();

