'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the kangaroo function below.
function kangaroo(x1, v1, x2, v2) {
    /*
    x1 = 캥거루1의 시작점,
    v1 = 캥거루1의 interval
    x2 = 캥거루2의 시작점,
    v2 = 캥거루2의 interval
    캥거루1이 항상 캥거루2 보다 '앞'에 있다.
    캥거루1이 캥거루2보다 앞질러가면 'NO'를 반환한다.
    v1 < v2 이면 'NO'를 반환한다.
    배수를 담을 변수를 하나 선언한다. loop를 돌때마다 1씩 증가
    */
    let count = 1;
    let k1;
    let k2;

    if (v1 <= v2) return 'NO';

    while (true) {
        k1 = v1 * count;
        k2 = v2 * count;

        if (k1 + x1 === k2 + x2){
            return 'YES';
        }

        if (k1 + x1 > k2 + x2) {
            return 'NO';
        }

        count++;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const x1V1X2V2 = readLine().split(' ');

    const x1 = parseInt(x1V1X2V2[0], 10);

    const v1 = parseInt(x1V1X2V2[1], 10);

    const x2 = parseInt(x1V1X2V2[2], 10);

    const v2 = parseInt(x1V1X2V2[3], 10);

    let result = kangaroo(x1, v1, x2, v2);

    ws.write(result + "\n");

    ws.end();
}
