process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

function solveMeFirst(a, b) {
  // Hint: Type return a+b below
  return a + b;
}


function main() {
    var a = parseInt(readLine());
    var b = parseInt(readLine());;

    var res = solveMeFirst(a, b);
    console.log(res);
}

//VSCode에서 돌려보기

// const readline = require('readline');
// const rl = readline.createInterface({
// 	 input: process.stdin,
// 	 output: process.stdout
// });

// let input = [];

// rl.on('line', function (line) {
// 		input.push(line)
// 	})
// 	.on('close', function () {
//         console.log(input);

//         let a = parseInt(input[0]);
//         let b = parseInt(input[1]);

//         console.log(a + b);


//     process.exit();
// });
