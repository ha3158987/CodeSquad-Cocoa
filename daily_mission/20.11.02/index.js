//[2020.11.02 미션] 다각형의 넓이 구하기
/*---------------------------#1. getArea 함수 & 각 도형의 넓이를 구하는 함수-------------------------------*/
let result;
let arrOrder = [];

//다각형의 종류를 변별 후 해당 다각형에 걸맞는 함수를 호출. 주어진 숫자값은 호출 시 인자로 전달.
function getArea(shape, ...givenSize) {
  if (shape === "circle") {
    result = getCircle(...givenSize);
    console.log(`원의 넓이/넓이의 합은 ${result}.`);
  }

  else if (shape === "rect") {
    result = getRectangle(...givenSize);
    console.log(`사각형의 넓이는 ${result}.`);
  }

  else if (shape === "trapezoid") {
    result = getTrapezoid(...givenSize);
    console.log(`사다리꼴의 넓이는 ${result}.`);
  }

  saveExecutionSequence(shape, result);
}

//원의 넓이
function getCircle(...radii) {
  if (radii.length !== 1) {
    const max = radii[1];
    let sum = 0;
    for (var i = 1; i <= max; i++) {
      sum += i * i * Math.PI;
    }
    return sum;
  }

  const square = radii[0] * radii[0];
  const area = Math.PI * square;
  return area;
}

//사각형의 넓이
function getRectangle(length, width) {
  const area = length * width;
  return area;
}

//사다리꼴의 넓이
function getTrapezoid(shortBase, longBase, height) {
  const area = ((shortBase + longBase) / 2) * height;
  return area;
}



/*-------------#2 & #3. saveExecutionSequence & printExecutionSequence 함수-----------------*/
//호출된 함수의 순서와 실행결과를 값으로 저장한다.
function saveExecutionSequence(type, returnedData) {
  arrOrder.push(`${type} : ${returnedData}`)
}

//호출된 함수의 순서와 각 함수 실행결과를 보여준다.
function printExecutionSequence() {
  let num = 0;
  for (var i = 0; i < arrOrder.length; i++) {
    num++;
    console.log(`${num}. ${JSON.stringify(arrOrder[i])}`);
  }
}



/*-----------------------------------#test cases-------------------------------------------*/
function testCases () {
  getArea("circle", 5, 3);
  getArea("rect", 10, 15);
  getArea("trapezoid", 10, 15, 12);
  printExecutionSequence();
}

testCases();