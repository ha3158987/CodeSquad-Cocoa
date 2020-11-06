/*
<음계>
다장조는 c d e f g a b C, 총 8개 음으로 이루어져있다. 이 문제에서 8개 음은 다음과 같이 숫자로 바꾸어 표현한다. c는 1로, d는 2로, ..., C를 8로 바꾼다.
1부터 8까지 차례대로 연주한다면 ascending, 8부터 1까지 차례대로 연주한다면 descending, 둘 다 아니라면 mixed 이다.
연주한 순서가 주어졌을 때, 이것이 ascending인지, descending인지, 아니면 mixed인지 판별하는 프로그램을 작성하시오.
첫째 줄에 8개 숫자가 주어진다. 이 숫자는 문제 설명에서 설명한 음이며, 1부터 8까지 숫자가 한 번씩 등장한다.
첫째 줄에 ascending, descending, mixed 중 하나를 출력한다.
*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", function(line) {
  let inputData = line.split(' ');  //입력값을 배열로 반환해줌

 //배열의 각 요소들이 이전 요소와 비교해서 큰지 작은지를 판단한다.
 let a = inputData[0]*1;
 let b = inputData[1]*1;

 //ascending이어야
 if (a < b && a + 1 === b) {
  inputData.forEach(isAscendingOrder)
  console.log("ascending");
 } else if (a > b && a - 1 === b){
 //descending이어야
  console.log("descending");
 } else {
 //mixed이어야
  console.log("mixed");
 }

  //끝까지 차례대로 이어지는 지 판단해야.
//  function isAscendingOrder (el){
//   let prevNum;
//    let currentNum = JSON.parse(el);
//    if (currentNum > prevNum || prevNum === undefined) {
//      prevNum = currentNum;

//    } else {
//    return console.log("mixed");
//    }
//  }


  rl.close();
}).on("close", function() {    //제출은 여기 전까지만 제출
  process.exit();
});


/*
test cases
1 2 3 4 5 6 7 8
8 7 6 5 4 3 2 1
8 1 7 2 6 3 5 4
1 2 3 4 7 8 6 5
8 7 6 1 2 3 4 5
*/
