//------------------------------------나누어 떨어지는 숫자 배열--------------------------------
function solution(arr, divisor) {
    let answer = [];

    arr.forEach(function (a){
        if (a % divisor === 0) {
            answer.push(a);
        }
    })

   answer.sort((a, b) => a - b);

  return answer.length === 0 ? [-1] : answer;
}

//------------------------------------두 개 뽑아서 더하기-------------------------------------
function solution(numbers) {
    let answer = [];

    numbers.forEach(function (cur, idx){
        if (idx === numbers.length - 1) return;

        for(let i = idx; i < numbers.length; i++){
            if (numbers[i + 1] === undefined) return;

            let sum = cur + numbers[i + 1];

            if (!answer.includes(sum)){
                answer.push(sum);
            }
        }
    })

   return answer.sort((a, b) => a - b);
}

//----------------------------------------모의고사------------------------------------------


//----------------------------------------2016년------------------------------------------

let dayArr = ["FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU"];
let numOfDates = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function solution(a, b) {
    let sumOfDates = 0;

    for (let i = 0; i < a - 1; i++){
        sumOfDates += numOfDates[i];
    }
    sumOfDates += b;

    let leftOver = (sumOfDates % 7 === 0) ? 6 : (sumOfDates % 7) - 1;
    return dayArr[leftOver];
}

//----------------------------------------약수의 합-----------------------------------------
function solution(n) {
    let answer = 0;
    let half;

    if (n === 1){
        return 1;
    } else if (n === 0){
        return 0;
    }

    half = ((n % 2) === 0 ? n / 2 : (n / 2) + 1);

    for (let i = 2; i <= half; i++) {
        if ((n % i) === 0) {
            answer += i;
        }
    }

    return answer += (n + 1);
}