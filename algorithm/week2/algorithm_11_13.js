//------------------------------------나누어 떨어지는 숫자 배열--------------------------------
function solution(arr, divisor) {
    let answer = [];

    arr.forEach(function (a){
        if (a % divisor === 0) {  //나머지가 없는 경우
            console.log("a", a);
            answer.push(a);
        }
    })

   answer.sort (function (a, b) {
       return a - b;
   })

  return answer.length === 0 ? [-1] : answer;
}

//------------------------------------두 개 뽑아서 더하기-------------------------------------
function solution(numbers) {
    var answer = [];

    numbers.forEach(function (cur, idx){
        if (idx === numbers.length - 1){
            //마지막 인덱스일때는 다음 숫자가 없으므로 그냥 리턴
            return;
        }

        for(let i = idx; i < numbers.length; i++){ //자기 자신부터 그 다음에 오는 숫자들만 loop를 돎.
            if (numbers[i + 1] === undefined){
                //마지막 인덱스의 경우 그 다음 숫자가 없기 때문에 리턴
                return;
            }

            let sum = cur + numbers[i + 1];

            if (!answer.includes(sum)){
                answer.push(sum);
            }
        }
    })

    answer.sort(function (a, b){
        return a - b;
    })

    return answer;
}

//----------------------------------------모의고사------------------------------------------


//----------------------------------------2016년------------------------------------------


//----------------------------------------약수의 합-----------------------------------------
function solution(n) {
    let answer = 0;
    let half;

    if (n === 1){
        return 1;
    } else if (n === 0){
        return 0;
    }

   n % 2 === 0 ? half = n / 2 :  half = (n / 2) + 1;

    for (let i = 2; i <= half; i++) {
        if ((n % i) === 0) {
            answer += i;
        }
    }

   answer += (n + 1);
    return answer;
}