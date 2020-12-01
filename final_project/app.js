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
혹은 마우스 hover시 말풍선이 나오는 구조도 고려.(https://nanati.me/css-balloons-menu/)
*/
const items = []; //추가된 모든 아이템의 정보를 객체 단위로 갖고 있을 배열.

/********************************  Product 클래스: 하나의 제품이 등록될 때마다 인스턴스를 생성 *******************************/

class Product {
    //하나의 제품인스턴스가 가지고 있어야 하는 정보: 제품이미지, 제품명, 카테고리, 사용한 날짜, 평점, 사용감/사용후기


    getProductInfo (){
        const newObj = {};
        const _ = {
            $(selector, base=document) {
                return base.querySelector(selector);
            }
        }

        const name = _.$(".product-name").value;
        const categories = _.$(".product-category");
        const selectedCategory = categories.options[categories.selectedIndex].value;
        const usedDate = _.$(".date-used").value; //string으로 들어옴. "2020-12-01"
        const rating = _.$(".rating");
        const ratingValue = rating.options[rating.selectedIndex].value;
        const review = _.$(".review").value;

        newObj.name = name;
        newObj.category = selectedCategory;
        newObj.date = usedDate;
        newObj.rating = ratingValue;
        newObj.review = review;


        console.dir(newObj);
        return newObj;
    }

}

/**************************************  Model 클래스: 제품 데이터를 관리 **********************************************/

class Model {

    makeNewProduct(){
        const newItem = new Product();
        const newItemObj = newItem.getProductInfo();
        items.push(newItemObj);
    }

}

/**************************************** View 클래스: UI 관련 작업들을 관리 *******************************************/

class View {

}

/*************************************** Controller 클래스: Model과 View의 중계역할 ***********************************/

class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        this.addEvent();
    }

    addEvent() {
        const addButton = document.querySelector(".add-button");

        addButton.addEventListener("click", this.model.makeNewProduct);
    }
}

const model = new Model();
const view = new View();
const controlApp = new Controller(model, view);
controlApp.init();
