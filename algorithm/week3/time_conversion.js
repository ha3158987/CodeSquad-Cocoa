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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
    /* hour 단위만 바꿔주면 될 듯.
    1) AM의 경우는 그대로.
    2) PM의 경우 12를 더해준다.
    3) hour가 12인 경우는 조금 다름:
     - AM 12면 00으로 바꿔준다.
     - PM 12면 그대로.
    */
    let hour = parseInt(s[0] + s[1]); //숫자로 변환
    let amOrPm = s[8] + s[9];
    let newHourString = s[0] + s[1];

    if (hour === 12){

        amOrPm === "AM" ? (newHourString = "00") : (newHourString = JSON.stringify(hour));
    } else {

        if (hour < 12 && amOrPm === "PM") {
            //PM의 경우 12를 더해준다.
            newHourString = JSON.stringify(parseInt(hour) + 12);
        }
    }

    //s에서 AMPM을 떼고, hourString을 hour자리에 replace해준다.
    s = s.substring(0, 8);
    s = s.replace((s[0] + s[1]), newHourString);

    return s;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
