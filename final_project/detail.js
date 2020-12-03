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
    }

    getDetailInfos(currentItem){
        let template = `<img src="${currentItem["image"]}"><li>카테고리: ${currentItem["category"]}</li><li>사용한 날짜: ${currentItem["date"]}</li><li>평점: ${currentItem["rating"]}</li><li>사용감/사용후기: ${currentItem["review"]}</li>`;
        return template;
    }
}


const detailPage = new ViewDetailPage();
detailPage.init();


