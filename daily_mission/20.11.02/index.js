// //[2020.11.02 미션] 다각형의 넓이 구하기
/*-------------#1. getArea 함수-----------------*/
//: 다각형의 종류를 변별 후 해당 다각형에 걸맞는 함수를 호출. 주어진 숫자값은 호출 시 인자로 전달.
let result;
let arrOrder = [];

function getArea(shape, ...givenSize) {
  console.log("arguments", givenSize);
  //원
  if (shape === "circle") {
    return getCircle(...givenSize);
  }

  //사각형
  else if (shape === "rect") {
    return getRectangle(...givenSize);
  }

  //사다리꼴
  else if (shape === "trapezoid") {
    return getTrapezoid(...givenSize);
  }
}

//원의 넓이
function getCircle(...radii) {
  // arrOrder.push("circle");
  //원의 갯수 > 1 일 때: 반지름의 값 1~n까지의 모든 원 넓이의 합
  if (radii.length !== 1) {
    let max = radii[1];
    let sum = 0;
    for (var i = 1; i <= max; i++) {
      sum += i * i * Math.PI;
    }
    arrOrder.push({ circle: sum });
    return sum;
  }

  //원의 갯수 === 1 일 때
  let square = radii[0] * radii[0];
  let area = Math.PI * square;
  arrOrder.push({ circle: area });
  return area;
}
result = getArea("circle", 5, 3);
console.log(`원의 넓이/넚이의 합은 ${result}.`);

//사각형의 넓이
function getRectangle(length, width) {
  result = length * width;
  arrOrder.push({ rectangle: result });
  return result;
}
result = getArea("rect", 10, 15);
console.log(`사각형의 넓이는 ${result}.`);

//사다리꼴의 넓이
function getTrapezoid(shortBase, longBase, height) {
  result = ((shortBase + longBase) / 2) * height;
  arrOrder.push({ trapezoid: result });
  return result;
}
result = getArea("trapezoid", 10, 15, 12);
console.log(`사다리꼴의 넓이는 ${result}.`);

/*-------------#2 & #3. printExecutionSequence 함수-----------------*/
//: 호출된 함수의 순서와 긱 함수 실행결과를 보여준다.
function printExecutionSequence() {
  let num = 0;
  for (var i = 0; i < arrOrder.length; i++) {
    num++;
    console.log(`${num}.`, arrOrder[i]);
  }
}

printExecutionSequence();
