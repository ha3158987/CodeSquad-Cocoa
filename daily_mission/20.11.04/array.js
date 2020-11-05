//[2020.11.04 미션2] 배열다루기
/*---------------------------#1. factorial 함수 -------------------------------*/
/*임의의 숫자(m)를 입력받아 1부터 m까지의 factorial 값을 배열로 담아서 반환하는 함수 만들기*/
function calculate (num){

    if (num === 1) {
        return 1;
    }

    return calculate(num - 1) * num;
}


/*---------------------------#2. 배열 거르기 -------------------------------*/
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

/*---------------------------#3. 평균 구하기 -------------------------------*/
/* 각 학생은 3가지 과목에 대한 점수를 가지고 있다.
1) 각 학생의 평균점수와
2) 모든 학생의 최고점수의 평균점수(2)를 출력하라.
*/
const grades = [[88,76,77], [33,44,44], [90,100,94], [30,44,98]];

const objScore = {};

function findAvrg (arrGrades){
    const arrAvrgEachStdt = arrGrades.map(findAvrgScoreOfEachStnt);   //map은 배열반환
};

function findAvrgScoreOfEachStnt (arr){
    const total = 0;
    arr.forEach( score => total += score)

    const avrgScore = total / arr.length;
    return avrgScore;
}

function AvrgOfAllStdt (){};



/*---------------------------#4. 배열 만들기 -------------------------------*/
/* o.js파일에 주어진 데이터 중에 숫자타입으로만 구성된 요소를 뽑아 배열만들기 */


/*---------------------------#5. 배열 결과 출력 -------------------------------*/
/* type이 sk인, name으로 구성된 배열만 출력해본다. */
//재귀로 풀기!!! 재귀로 풀어야 다음 미션을 풀 수 있음.

/*---------------------------#6. reduce 만들기.-------------------------------*/
//Array 의 reduce 메서드처럼 동작하는 myReduce 메서드를 만들자.
const myReduce = (arr, callback, initialValue) => {
}
// const result = myReduce(arr, (next,prev) => {...}, []);


/*
  _.reduce = function (collection, iterator, accumulator) {
    _.each(collection, function (value) {
      if (accumulator === undefined) {
        accumulator = collection[0];
        return iterator(accumulator, value);
      }

      accumulator = iterator(accumulator, value);
    });
    return accumulator;
  };
*/


/*-----------------------------------#test cases-------------------------------------------*/
function testCases () {
    console.log("재귀 factorial 함수:", calculate(5));
    console.log("for문 사용한 filter함수:", filterId(peoples));
    console.log("고차함수 사용한 filter함수:", higherFilterIdFunc(peoples));
    console.log("평균점수 구하기", findAvrg(grades));
}

testCases();

