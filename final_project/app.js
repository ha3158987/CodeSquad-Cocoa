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
*/
let items = []; //추가된 모든 아이템의 정보를 객체 단위로 갖는 배열.

/**************************** Product 클래스: input정보를 가져오고 제품이 등록될 때마다 인스턴스를 생성 ***************************/
class Product {
  //하나의 제품인스턴스가 가지고 있어야 하는 정보: 제품이미지, 제품명, 카테고리, 사용한 날짜, 평점, 사용감/사용후기
  getProductInfo() {
    const _ = {
      $(selector, base = document) {
        return base.querySelector(selector);
      }
    };
    const name = _.$('.product-name').value;
    const categories = _.$('.product-category');
    const selectedCategory = categories.options[categories.selectedIndex].value;
    const usedDate = _.$('.date-used').value;
    const rating = _.$('.rating');
    const ratingValue = rating.options[rating.selectedIndex].value;
    const review = _.$('.review').value;
    const image = _.$('.preview').src;
    const inputArray = [name, selectedCategory, usedDate, ratingValue, review, image];
    return inputArray;
  }

  makeNewProductObj(inputArray, id) {
    const newObj = {};
    newObj.name = inputArray[0];
    newObj.category = inputArray[1];
    newObj.date = inputArray[2];
    newObj.rating = inputArray[3];
    newObj.review = inputArray[4];
    newObj.image = inputArray[5];
    return newObj;
  }
}

/**************************************  Model 클래스: 제품 데이터를 관리 **********************************************/
class Model {

  exportEventTarget(items){

  }

  makeNewProduct(id) {
    const newItem = new Product();
    const inputArray = newItem.getProductInfo();

    if (!this.allFormsAreFilled(inputArray)) {
      return inputArray;
    }
    //1) inputArray 에 undefined가 없고, 2) 이미지 파일이 업로드 되었을 시에만 makeNewProductObj를 실행
    if (this.allFormsAreFilled(inputArray)) {
      const newItemObj = newItem.makeNewProductObj(inputArray, id);
      items.push(newItemObj);
      this.saveToLocalStorage();
      this.resetAllForm();
    }
    return inputArray;
  }

  allFormsAreFilled(inputArray) {
    for (let i = 0; i < inputArray.length; i++) {
      if (!inputArray[i]) {
        return false;
      }
    }
    return true;
  }

  saveToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
  }

  loadFromLocalStorage() {
      const loadedItems = localStorage.getItem('items');

      if (loadedItems !== null) {
          const parsedItems = JSON.parse(loadedItems);
          return parsedItems;
      }
  }

  resetAllForm (){
    location.reload();
  }
}

/**************************************** View 클래스: UI 관련 작업들을 관리 *******************************************/
class View {

  showDetailPage(items){
    console.log(items);
    const title = document.querySelector("#product");
    console.log(title);

  }

  showSavedItems(savedItems) { //local storage에서 가져온 items배열들의 요소(item)들을 UI drawer에서 보여주기.
    const container = document.querySelector(".img-grid");
    let innerContainer = ``;
    let count = 0;

    savedItems.forEach(item => {
      innerContainer += this.makeImageContainingLiTag(item, count);
      count++;
    })
    container.innerHTML = innerContainer;

    this.addEventToImages(container);
  }

  addEventToImages(parentNode){
    const lis = parentNode.childNodes;

    lis.forEach((li, idx) => {
      (li.childNodes[0].childNodes[0]).addEventListener("click", () => {
        //click이 되면 이벤트가 일어난 이미지의 인덱스를 a tag의 href 값으로 넘겨준다.
        (li.childNodes[0]).setAttribute("href", `detail.html?id=${idx}`);
      });

      li.childNodes[1].addEventListener("click", this.deleteItem.bind(this, idx));
    })

  }

  deleteItem(idx){
    const itemData = JSON.parse(localStorage["items"]);
    itemData.splice(idx, 1);
    localStorage.setItem('items', JSON.stringify(itemData));
    location.reload();
  }

  makeImageContainingLiTag(item, count){
    const liContainer = `<li class="inner-img-container"><a class="detail-page" href="detail.html"><img class="item-image${count}" src="${item["image"]}"></a><button class="delete-button"><ion-icon name="close-outline"></ion-icon></button></li>`;
    return liContainer;
  }

  showPreviewImage() {
    let reader = new FileReader();
    let imgFile;
    reader.onload = readerEvent => {
      document.querySelector('.preview').setAttribute('src', readerEvent.target.result);
    };
    document.querySelector('.product-img').addEventListener('change', changeEvent => {
      imgFile = changeEvent.target.files[0];
      reader.readAsDataURL(imgFile); //이미지 파일 읽어올 때
    });
  }

  showErrorMsg(inputArray) {
    const inputName = [
      '제품명은',
      '카테고리는',
      '사용한 날짜는',
      '평점은',
      '사용감/사용후기는',
      '제품이미지는'
    ];
    const selector = [
      '#product-name',
      '#product-category',
      '#date-used',
      '#rating',
      '#review',
      '#product-img'
    ];

    this.createErrorMsg(inputArray, inputName, selector);
  }

  createErrorMsg(inputArray, inputName, selector){
    inputArray.forEach((el, idx) => {
      const errorMessage = document.createElement('div');
      const fieldset = document.querySelector(selector[idx]);
      errorMessage.classList.add('error-msg');

      if (!el) {
        errorMessage.innerHTML = `${inputName[idx]} 필수정보 입니다.`;

        if (fieldset.lastChild.classList[0] !== "error-msg") { //에러메세지 중복 추가방지.
            fieldset.appendChild(errorMessage);
        }
      } else {
        if (fieldset.lastChild.classList[0] === "error-msg") {
            this.removeErrorMsg(fieldset);
        }
      }
    });
  }

  removeErrorMsg(parentNode) {
    const errorMessage = parentNode.lastChild;
    parentNode.removeChild(errorMessage);
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
    this.loadLocalStorage();
  }

  loadLocalStorage(){
    if(localStorage.getItem('items') !== null) {
      items = this.model.loadFromLocalStorage();
      this.view.showSavedItems(items);
    }
  }

  addEvent() {
    const addButton = document.querySelector('.add-button');
    this.view.showPreviewImage();
    addButton.addEventListener('click', this.eventCallback.bind(this));
  }

  eventCallback() {
    const inputArray = this.model.makeNewProduct.call(this.model, this.id);

    if (!this.model.allFormsAreFilled(inputArray)){
        this.view.showErrorMsg(inputArray);
    }
  }
}

const model = new Model();
const view = new View();
const controlApp = new Controller(model, view);
controlApp.init();





