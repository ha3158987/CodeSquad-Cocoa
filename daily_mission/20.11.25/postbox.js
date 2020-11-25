// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
//*****************************************************Express******************************************************* */
/*
새로운 div 요소를 만든다. - class로 생성해볼 것
- 이 안에서 하위 div를 재귀를 호출에 생성한다. 또 div를 내부에 생성하고, 또 내부에 생성하고....
- 이 때, 종료 조건은 random#를 주어서 random#(최대 4)만큼 호출이 되었을 때(내부에서 변수++하면서 카운트 할 것), return 할 수 있게 한다. = 호출된만큼의 하위 div가 생김.
- 빨간 우체통은 random#가 2 이상일 때 true, 2 이하일 떄 false를 줘서 true일 때만 해당 div 내부에 우체통이 추가되도록 한다. 새로운 메소드 만들 것.
- 마을 이름은 알파벳 (a, b, c... z)으로 이루어진 배열을 만들고 여기서 재귀호출이 될 때마다 이름을 차례대로 추가해준다.
document.body.appendChild(template)으로 요소를 UI에 띄운다.

*/

//const template = `<div id='container'>container</div>`;

const _ = {
    $(cssSelector, base=document) {
        return base.querySelector(cssSelector);
    }
}

const arr = [1, 2, 3, 4, 5, 6];
const countyNameArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const container = _.$(".container");

class MAKE_COUNTY {

    createNewDiv(name){
        //id도 부여할 것
        let div = document.createElement("div");
        div.classList.add("new_county");
        div.innerHTML = name;
        div = this.setDivStyle.call(null, div);

        return div;
    }

    setDivStyle(div){
        const randomHeight = Math.floor(Math.random() * 10);
        const randomWidth = Math.floor(Math.random() * 10);

        const _ = div.style;

        _.border = "0.15rem solid #0984e3"
        _.borderRadius = "10px"
        _.width = `${randomWidth}rem`
        _.height = `${randomHeight}rem`;
        _.margin = "0.5rem"

        return div;
    }


    makeTemplate() {

        countyNameArr.forEach(el => {

            const newTemplate = this.createNewDiv(el);
            container.appendChild(newTemplate);
        })
    }
}


function init () {
    const map = new MAKE_COUNTY;
    map.makeTemplate();
}

init();


// function makeButton() {
//     const button = document.createElement('button');
//     button.innerHTML = "빨간 우체통 확인";
//     button.classList.add = "check_post_box";
//     document.body.appendChild(button);
// }

// makeButton();
