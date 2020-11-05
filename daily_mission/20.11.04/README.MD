# 2020.11.02 Daily Mission

## Mission 1. 진수변환기: 2진수 돌아가며 말하기 게임 :hugs: (파일명: calcLog.js)

몇 명의 사람들이 모여서 2진수를 한 글자씩 끊어서 말하는 게임을 진행중이다.
2진수의 경우 이렇게 말하게 된다.

```
0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, …
```

<br>

### 문제1. T개의 숫자까지 M명이 말한다고 할때 이를 모두 출력하는 프로그램을 만들기

```
solution(2,4,2) //2진수, 한 사람당 4개의 숫자를, 2명이 말할때
output > ["0", "1", "1", "0", "1", "1", "1", "0", "0", "1", "0", "1", "1", "1", "0", "1", "1", "1"]
```

- parseInt 함수 사용가능
  <br>

### 문제2. 길동이 차례 숫자 맞추기

홍길동의 차례에 어떤 숫자를 말해야 하는지를 알 수 있는 프로그램을 만든다.
<br>

### 문제3. n진수까지 되는 프로그램

2진수 뿐 아니라 16진수까지 동작하는 프로그램을 만든다.
파라미터로 진법 n, 미리 구할 숫자의 갯수 t, 게임에 참가하는 인원 m, 길동이의 순서 p 가 주어진다.
<br>

## 학습 체크포인트 :white_check_mark:

- 진법에 대해서 이해하고 있다.
- 자바스크립트로 진법변환하는 방법을 안다.
- 배열의 순회하고 추가/삭제 하는 방법을 안다.

  <br>
  <br>

## Mission 2. 배열다루기 :rainbow: (파일명: array.js)

### 문제1. factorial 함수

임의의 숫자(m)를 입력받아 1부터 m까지의 factorial 값을 배열로 담아서 반환하는 함수 만들기.

```
calculate(4)
output > [1,2,6,24]
```

<br>

### 문제2. 배열 거르기

주어진 사람들 중 아래 조건을 만족하는 사람들로 구성된 배열을 만들어서 반환하는 함수 만들기.

- 특수기호가 없는 아이디 제외
- 아이디에서 숫자를 제거
- 2 가지 iteration을 처리하는 버전을 만든다.

1. for/while문을 사용한 버전 만들기.
2. forEach,filter, map등의 고차함수를 사용한 버전 만들기

```
const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
filterId(peoples)
output > ["honux", "head", "zello", "lucas"]
```

<br>

### 문제3. 평균 구하기

아래 예시는 네 명의 학생에 대한 과목 점수이다.
각 학생은 3가지 과목에 대한 점수를 가지고 있다.

1. 각 학생의 평균점수 출력하기
2. 모든 학생의 최고점수의 평균점수를 출력하기

```
const grades = [[88,76,77], [33,44,44], [90,100,94], [30,44,98]];
```

<br>

### 문제4. 배열 만들기

아래 링크를 눌러서 데이터를 확인한다.
https://gist.github.com/crongro/ade2c3f74417fc202c8097214c965f27
숫자타입으로만 구성된 요소를 뽑아 배열만들기

```
output > ["width", "height", "hOffset", "vOffset", "size", "hOffset", "vOffset"]
```

<br>

### 문제5. 배열 결과 출력

아래 링크를 눌러서 데이터를 확인한다.
type이 sk인, name으로 구성된 배열만 출력해본다.
https://gist.github.com/crongro/a9a118977f82780441db664d6785efe3

```
output > ["Yong", "hary", "solvin", "hani", "chulsu"]
```

<br>

### 문제6. reduce 만들기

Array 의 reduce 메서드처럼 동작하는 myReduce 메서드를 만들자.

```
const myReduce = (arr, callback, initialValue) => {
    //여기에 구현
}

const result = myReduce(arr, (next,prev) => {...}, []);
```

### 추가미션

- JavaScript set & map 에 대해서 알아보고 정리해보자.

1. 어떻게 사용하는것인가?
2. object/array와는 어떤 점이 다르지?
3. 언제 유용하게 쓰일 수 있을까?

- higher order functions은 어떻게 메서드 체이닝이 가능할까? 그 이유를 알아보자.

<br>

## 학습 체크포인트 :white_check_mark:

- 고차함수가 무엇인지 안다.
- for,while문을 사용하지 않고 배열을 iteration할 수 있다.
- reduce 메서드를 직접 만들 수 있다.
- JavaScript 객체를 iteration하고 객체의 속성에 접근해서 추가/변경할 수 있다.
