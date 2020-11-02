# 2020.11.02 Daily Mission: 다각형의 넓이 구하기

## 1. getArea함수 만들기

getArea 함수를 사용해 모든 도형의 넓이를 구할 수 있다.
도형의 넓이를 반환하는 getArea함수를 만들자.

```
//원의 넓이 값출력
getArea('circle', 10);

//사각형의 넓이값출력
getArea('rect', 10,15);

//사다리꼴의 넓이값출력
getArea('trapezoid', 10,15,12);

//반지름이 1부터 n까지 1씩 증가하면서, n개까지의 원의 넓이의 모든 합을 출력.
getArea('circle', 1, n);
```

## 2. printExecutionSequence함수 만들기

프로그래밍에서 로깅(logging)은 프로그램의 수행과정이나 결과를 기록하는 것을 말한다.
지금까지 호출된 함수가 무엇인지 알려주는 printExecutionSequence함수를 만들자.

```
getCircle()
getCircle()
getArea('circle',2)
getArea('rect',2,3)
printExecutionSequence()  //printExecutionSequence가 불려지면, 함수 호출된 순서를 출력한다.
// 계산수행순서 : circle, circle, circle, rect
```

## 3. printExecutionSequence함수 수정하기

printExecutionSequence함수에 수행순서 뿐만 아니라, 함수의 결과까지 순서대로 같이 출력하는 기능을 만들어보자.
