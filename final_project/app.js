/*
1. 데이터 구조 만들기
먼저 배열에 객체형태의 요소가 추가되는 자료 구조를 만든다.[{}, {}, {}, {}]
일단 DOM이랑 연결은 나중에 생각하고 자료구조부터 만들기.
추가되는 요소들마다 하나의 객체 인스턴스가 된다.

2. UI랑 연결하기
View 클래스를 만들어서 DOM을 조작한다.
UI에 렌더링 하는 작업을 수행한다.
추가되는 이미지가 링크가 된다.

3. 추가되는 각각의 이미지에 <a>링크를 걸어 해당 Product 인스턴스의 정보를 보여줄 수 있도록 한다.
혹은 마우스 hover시 말풍선이 나오는 구조도 가능.(https://nanati.me/css-balloons-menu/)
*/

class Product {}

class Model {}

class View {}

class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        // this.model
    }
}

const model = new Model();
const view = new View();
const controlApp = new Controller(model, view);
controlApp.init();
