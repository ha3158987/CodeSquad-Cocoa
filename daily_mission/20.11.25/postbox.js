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
<처음부터 다시 만들기!!>
데이터 구조에 UI까지 생각하면 머리가 너무 복잡해질 수 있기 때문에
일단 자료구조를 만드는 데에 집중할 것!


1. 데이터 구조 만들기 (충돌을 피할 수 있게)
먼저 중첩된 객체 트리 형태의 자료구조를 만든다.
그게 어렵다면 일단 배열에 객체를 요소로 가진 구조를 만들어볼 수 있다.[{}, {}, {}, {}, {}]

2. UI에 띄우기



1) 새로운 div 요소를 만든다. - MAKE_TOWN class로 생성
- 이 안에서 하위 div를 재귀를 호출에 생성한다. 또 div를 내부에 생성하고, 또 내부에 생성하고....
- 이 때, 종료 조건은 random#를 주어서 random#(최대 4)만큼 호출이 되었을 때(내부에서 변수++하면서 카운트 할 것), return 할 수 있게 한다. = 호출된만큼의 하위 div가 생김.
- 마을 이름은 알파벳 (a, b, c... z)으로 이루어진 배열을 만들고 여기서 재귀호출이 될 때마다 이름을 차례대로 추가해준다.

2) MAKE_TOWN으로 새로운 마을 인스턴스를 받아서 컨테이너에 추가하는 함수를 만든다.
- 이 함수는 idx, container(parent)를 인자로 받는다.
- parentElement가 있는지 여부를 판단해 if조건, else조건으로 나눈다.
- parentElement가 없는 경우(최초의 호출)에서는 가장 바깥쪽에 container가 될 div를 하나 만들어주고,
- 있는 경우에는 MAKE_TOWN으로 자식 마을을 하나 만들어서 parentElement에 append 한다.
  함수명(idx, 새로 만들어진 div명)으로 재귀함수호출을 한다.
  대신 깊이의 수준을 조정해서 조건을 줘야함. 그런데 grid를 나눠놔서 append를 어떻게 나눠서 하지???
document.body.appendChild(template)으로 요소를 UI에 띄운다.
*/

const _ = {
    $(cssSelector, base=document) {
        return base.querySelector(cssSelector);
    }
}

let townList = [];  //각 마을의 정보(이름(알파벳), 아이디(인덱스), 우체통 여부, 우체통 크기)를 객체로 담아서 넣을 배열
const countyNameArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const container = _.$(".container");

function makeRandomNumberBetween (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


class MAKE_TOWN {  //하나의 town를 만드는 데 필요한 클래스

    basicInfo = {
        name : "",
        hasPostBox : false,
        sizeOfPostBox : null
    }

    createNewDiv(name){
        //id도 부여할 것
        let div = document.createElement("div");
        div.classList.add("new_town");
        div.innerHTML = name;   //알파벳순
        div = this.setDivStyle.call(null, div);
        this.createPostBox.call(null, div, name);

        townList.push(this.basicInfo);
        return div;
    }

    createPostBox(div, name) { //3이 넘어가는 숫자가 나오면 우체통 추가
        const randomPick = makeRandomNumberBetween(0, 10);

        if (randomPick > 3){
            this.basicInfo.hasPostBox = true;
            this.basicInfo.sizeOfPostBox = randomPick;
            div.innerText = `${name}  📮`;
        }
    }


    setDivStyle(div){
        const randomHeight = makeRandomNumberBetween(1, 10);
        const randomWidth = makeRandomNumberBetween(1, 10);

        const _ = div.style;

        _.border = "0.15rem solid #0984e3";
        _.borderRadius = "30px";
        _.width = `${randomWidth}rem`;
        _.height = `${randomHeight}rem`;
        _.margin = "0.5rem";
        _.fontSize = "0.5rem";

        return div;
    }

}

const numOfTownLayer = makeRandomNumberBetween(1, 5);//몇 번이나 중첩해서 부를 것인지
const numOfTotalTownNum = makeRandomNumberBetween(1, 27); //총 몇 개의 마을을 만들 것인지. 마을 갯수를 미리 만듦. a~z 사이의 마을 몇개를 돌 것인지.
//마을 이름은 idx기준으로 불러올 것. 정해진 숫자까지 전부 돌면(loop의 idx - 1이 numOfTotalTownNum과 같아지면 return 해서 재귀를 끝낸다.)
let arrTown = [];
let count = 0;

function makeCountyTemplate(idx, container) {

    const town = new MAKE_TOWN();
    const newDiv = town.createNewDiv();
    arrTown.push(newDiv);

    //if(town.id === "")
    arrTown.push(town);
    //name은 알파벳으로 줘야.

    if (count){
        return;//종료조건
    } else {
        //if문을 추가. 자식요소가 될 것인지 형제요소가 될지를 판단해서.
        count++;
        makeCountyTemplate();
    }
    //자식요소로 새로운 div추가
}

//각 grid 마다 county 추가해주기
// 노드들을 타고 들어가서 우체통이 있는 마을의 갯수 찾기. (우체통이 있는 마을들의 id를 가져온 후, border를 빨간색으로 바꿔주기)


function init () {
    makeCountyTemplate();
}

init();


