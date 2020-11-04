//[2020.11.04 미션1] 진수변환기
//2진수 돌아가며 말하기 게임
const answerObj = {};
const arrNumSequence = [];

/*---------------------------#1. T개의 숫자까지 M명이 말할때 모두 출력 & #3. n진수까지 되는 함수만들기-------------------------------*/
function solution (logNum, countForEachPerson, numOfPlayer, playerGivenOrder){

    const range = (countForEachPerson * numOfPlayer) - 1;
    const str = range.toString(logNum);
    for (let value of str) {
        arrNumSequence.push(value);
    }
    answerObj["모든 숫자"] = arrNumSequence;

    if (playerGivenOrder !== undefined){
        answerObj["길동이가 말한 숫자"] = seqOfSpeakerShouldSay(numOfPlayer, playerGivenOrder);
    }

    return answerObj;
}

/*-----------------------------------------------#2. 길동이 차례 숫자 맞추기-------------------------------------------------*/
function seqOfSpeakerShouldSay (totalPlayer, givenOrder){
    const answerArr = [];
    let index = givenOrder;
    while (index < arrNumSequence.length) {
        answerArr.push(arrNumSequence[index]);
        index += totalPlayer;
    }

    return answerArr;
}

/*---------------------------------------------------#test cases--------------------------------------------------------*/
function testCases() {
console.log(solution (2, 10, 2, 1));
console.log(solution (8, 4, 3, 2));
console.log(solution (16, 3, 2, 1));
}

testCases();

