/*
<A/B>
두 정수 A와 B를 입력받은 다음, A/B를 출력하는 프로그램을 작성하시오.
첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)
첫째 줄에 A/B를 출력한다. 실제 정답과 출력값의 절대오차 또는 상대오차가 10-9 이하이면 정답이다.
*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", function(line) {
  let inputData = line.split(' ');    //split은 문자열을 배열로 쪼갬

  let a = inputData[0] * 1;
  let b = inputData[1] * 1;

  console.log("a / b", a / b);


  rl.close();
}).on("close", function() {    //제출은 .on 전까지만 제출
  process.exit();
});