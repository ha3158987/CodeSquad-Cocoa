/*
1. 데이터 구조 만들기
먼저 배열에 객체형태의 요소가 추가되는 자료 구조를 만든다.[{}, {}, {}, {}]
일단 DOM이랑 연결은 나중에 생각하고 자료구조부터 만들기.
추가되는 요소들마다 하나의 객체 인스턴스가 된다.

** 각 요소가 모두 추가되지 않으면 해당 아이템 밑에 빨간줄로 정보를 추가하라는 안내메세지가 나오도록 해야함.

2. UI랑 연결하기
View 클래스를 만들어서 DOM을 조작한다.
UI에 렌더링 하는 작업을 수행한다.
추가되는 이미지가 링크가 된다.

3. 추가되는 각각의 이미지에 <a>링크를 걸어 해당 Product 인스턴스의 정보를 보여줄 수 있도록 한다.
혹은 마우스 hover시 말풍선이 나오는 구조도 고려.(https://nanati.me/css-balloons-menu/)
*/
const items = []; //추가된 모든 아이템의 정보를 객체 단위로 갖는 배열.
const images = []; //추가된 모든 이미지파일을 객체로 갖는 배열.
let index = 0;

/**************************** Product 클래스: input정보를 가져오고 제품이 등록될 때마다 인스턴스를 생성 ***************************/

class Product {
    //하나의 제품인스턴스가 가지고 있어야 하는 정보: 제품이미지, 제품명, 카테고리, 사용한 날짜, 평점, 사용감/사용후기

    getProductInfo (){
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

        const inputArray = [name, selectedCategory, usedDate, ratingValue, review];
        return inputArray;
    }

    makeNewProductObj(inputArray){
        const newObj = {};

        newObj.name = inputArray[0];
        newObj.category = inputArray[1];
        newObj.date = inputArray[2];
        newObj.rating = inputArray[3];
        newObj.review = inputArray[4];
        newObj.index = index; //현재 추가된 제품사진의 인덱스를 저장.
        index++;

        console.dir(newObj);
        return newObj;
    }

}

/**************************************  Model 클래스: 제품 데이터를 관리 **********************************************/

class Model {

    makeNewProduct(imgFile){
        const newItem = new Product();
        const inputArray = newItem.getProductInfo();

        if(!this.allFormsAreFilled(inputArray)) {
            return inputArray;
        }

        //1) inputArray 에 undefined가 없고, 2) 이미지 파일이 업로드 되었을 시에만 makeNewProductObj를 실행
        if (this.allFormsAreFilled(inputArray) && imgFile !== undefined) {

            const newItemObj = newItem.makeNewProductObj(inputArray);
            items.push(newItemObj);
            images.push(imgFile);
            console.dir(images); //확인용
            this.saveToLocalStorage();
            console.dir(localStorage); //확인용
            document.getElementById("input-product-info").reset(); //form 전부 리셋.
        }

    }

    allFormsAreFilled(inputArray) {

        for (let i = 0; i < inputArray.length; i++){
            if (!inputArray[i]){
                return false;
            }
            return true;
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('images', JSON.stringify(images));
    }

}

/**************************************** View 클래스: UI 관련 작업들을 관리 *******************************************/

class View {

    showPreviewImage() {
        let reader = new FileReader();
        let imgFile;

        reader.onload = (readerEvent) => {
            document.querySelector(".preview").setAttribute('src', readerEvent.target.result);
        };

        document.querySelector(".product-img").addEventListener("change", (changeEvent) => {
            imgFile = changeEvent.target.files[0];
            reader.readAsDataURL(imgFile); //이미지 파일 읽어올 때
            console.log(typeof imgFile); //object
            return imgFile; //이미지 파일 오브젝트를 넘겨주려면?
        });
    }

    showErrorMsg(inputArray, imgFile) {
        const inputName = ["제품명은", "카테고리는", "사용한 날짜는", "평점은", "사용감/사용후기는"];
        const selector = ["#product-name", "#product-category", "#date-used", "#rating", "#review"];
        // console.log(imgFile);

        if (!imgFile) {
            const imgInput = document.querySelector("#product-img");
            const errorMessage = document.createElement("div");
            errorMessage.classList.add("error-msg");
            errorMessage.innerHTML = `제품 이미지를 선택해주세요.`
            imgInput.appendChild(errorMessage);
        }

        inputArray.forEach((el, idx) => {
            const errorMessage = document.createElement("div");
            errorMessage.classList.add("error-msg");

            if (!el) {
                errorMessage.innerHTML = `${inputName[idx]} 필수정보 입니다.`;
                const fieldset = document.querySelector(selector[idx]);
                fieldset.appendChild(errorMessage);
            }
            //else: append된 errorMessage가 있다면, 제거.
        })

    }

    removeErrorMsg () {
        //사용자가 정보 수정 후 다시 '추가하기'버튼을 누르면 보여졌던 에러메세지가 사라져야 한다.
        //업데이트 된 inputArray를 새로 받아와서 요소가 있는 부분은 메세지 없애야함.
    }
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

        const imgFile = this.view.showPreviewImage();
        console.log(imgFile);
        addButton.addEventListener("click", this.eventCallback.bind(this, imgFile));
    }

    eventCallback(imgFile) {
        // console.log(imgFile);
        const notFullyFilledInputArray = this.model.makeNewProduct.call(this.model, imgFile);
        this.view.showErrorMsg(notFullyFilledInputArray, imgFile);
    }
}

const model = new Model();
const view = new View();
const controlApp = new Controller(model, view);
controlApp.init();
