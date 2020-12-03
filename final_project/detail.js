class ViewDetailPage {

    init(){
        this.readItemData();
    }

    readItemData(){
        const index = location.search[4]; //ex. "?id=0" => "0"
        const items = JSON.parse(localStorage.items);
        const currentItem = items[index];

        this.renderUI(currentItem);
    }

    renderUI(currentItem){
        const title = document.querySelector("#product");
        const outerContainer = document.querySelector(".detail-informations");
        const container = document.createElement("ul");
        const template = this.getDetailInfos(currentItem);

        container.classList.add("info-inner-container");
        title.innerHTML = currentItem["name"];
        container.innerHTML = template;

        outerContainer.appendChild(container);
        this.addEdittingEvent();
    }

    getDetailInfos(currentItem){
        let template = `<img id="detail-img" src="${currentItem["image"]}"><br><li>카테고리: ${currentItem["category"]}</li><button class="more-button"><ion-icon id="1" name="pencil-outline"></ion-icon></button><br><li>사용한 날짜: ${currentItem["date"]}</li><button class="more-button"><ion-icon id="2" name="pencil-outline"></ion-icon></button><br><li>평점: ${currentItem["rating"]}/5 </li><button class="more-button"><ion-icon id="3" name="pencil-outline"></ion-icon></button><br><li>사용감/사용후기: ${currentItem["review"]}</li><button class="more-button"><ion-icon id="4" name="pencil-outline"></ion-icon></button><br><a class="back-btn" href="app.html#drawer">서랍장으로 돌아가기</a>`;
        return template;
    }

    addEdittingEvent(){
        const buttons = document.querySelectorAll(".more-button");
        Array.from(buttons, button => button.addEventListener("click", this.editText.bind(this, buttons)))
    }

    editText(buttons){
        const editButton = event.target;
        const index = event.target.getAttribute("id");
        const selectedLi = event.target.parentElement.parentElement.childNodes[index * 3 - 1];
        const originalText = selectedLi.innerHTML;

        selectedLi.innerHTML = `<input class="edit-input" type="text" value="${originalText}">`;
        const checkButton = this.createCheckButton();
        editButton.replaceWith(checkButton);
        checkButton.addEventListener("click", this.updateText.bind(this, selectedLi, checkButton, index));
    }

    updateText(selectedliTag, checkButton, index){
       const edittedText = selectedliTag.firstChild.value;
       console.log(edittedText);
       console.log("selectedLitag.firstChild", selectedliTag.firstChild);
       selectedliTag.innerHTML = `<input class="edit-input" type="text" value="${edittedText}">`;
        checkButton.innerHTML = `<ion-icon id="${index}" name="pencil-outline"></ion-icon>`;
        // localStorage.setItem('items', JSON.stringify(items));
        location.reload();
    }

    createCheckButton(){
        const checkButton = document.createElement("button");
        checkButton.className = "check-button";
        checkButton.innerHTML = `<ion-icon name="checkmark-outline"></ion-icon>`
        return checkButton;
    }
}

const detailPage = new ViewDetailPage();
detailPage.init();


