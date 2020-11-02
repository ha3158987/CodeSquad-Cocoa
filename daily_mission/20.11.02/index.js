// //[2020.11.02 미션] 다각형의 넓이 구하기
/*-------------#1. getArea 함수-----------------*/
//: 다각형의 종류를 변별 후 해당 다각형에 걸맞는 함수를 호출. 주어진 숫자값은 호출 시 인자로 전달.
function getArea(shape, ...arguments) {
  console.log("arguments", arguments);
  //원
  if (shape === "circle") {
    return getCircle(arguments);
  }

  //사각형
  else if (shape === "rect") {
    return getRectangle(arguments);
  }

  //사다리꼴
  else if (shape === "trapezoid") {
    return getTrapezoid(arguments);
  }
}

//원의 넓이
function getCircle(arguments) {
  //원의 갯수 > 1 일 때: 반지름의 값 1~n까지의 모든 원 넓이의 합
  if (arguments.length !== 1) {
    let max = arguments[1];
    let arrArea = [];
    let sum = 0;
    for (var i = 1; i <= max; i++) {
      //   arrArea.push(i * i * Math.PI);
      sum += i * i * Math.PI;
    }
    console.log(sum);
    return console.log(`반지름 1 ~ n까지의 모든 원 넓이의 합은 ${sum}.`);
  }

  //원의 갯수 === 1 일 때
  let radius = arguments[0];
  let square = radius * radius;
  let area = Math.PI * square;
  return console.log(`원의 넓이는 ${area}.`);
}
console.log(getArea("circle", 5));
console.log(getArea("circle", 1, 5));

//사각형의 넓이
function getRectangle(arguments) {
  let length = arguments[0];
  let width = arguments[1];
  return console.log(`사각형의 넓이는 ${length * width}.`);
}
console.log(getArea("rect", 10, 15));

//사다리꼴의 넓이
function getTrapezoid(arguments) {
  let shortBase = arguments[0];
  let longBase = arguments[1];
  let height = arguments[2];
  return console.log(
    `사다리꼴의 넓이는 ${((shortBase + longBase) / 2) * height}`
  );
}
console.log(getArea("trapezoid", 10, 15, 12));
