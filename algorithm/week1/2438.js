/*
<별 찍기 - 1>
첫째 줄에는 별 1개, 둘째 줄에는 별 2개, N번째 줄에는 별 N개를 찍는 문제
첫째 줄에 N(1 ≤ N ≤ 100)이 주어진다.
첫째 줄부터 N번째 줄까지 차례대로 별을 출력한다.
ex. 4
*
**
***
****
*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", function(line) {
  let inputNum = parseInt(line);
  let arr = [];
  for (var j = 1; j <= inputNum; j++){
      arr.push(j);
  }
    arr.forEach(printStar);

    function printStar(repeatNum){
        var str = "";
        for (var i = 1; i <= repeatNum; i++){
            str = str.concat("*");
        }
        console.log(str);
    }

  rl.close();
}).on("close", function() {    //제출은 .on 전까지만 제출
  process.exit();
});