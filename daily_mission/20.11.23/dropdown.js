/************************************************** mission 1. 스마트 드롭다운 메뉴 *************************************************/


const dropBox = document.getElementById("show_box");
dropBox.addEventListener('mouseover', showFruits);

function showFruits () {
    stopInstructionMessage();
    console.log("moseover되었습니다.");

    const countOneSecond =  setTimeout(function () {
        const UlTemplate = makeUlTemplate();
        renderTemplate(UlTemplate, dropBox);
    }, 1000);

    dropBox.addEventListener('mouseout', function (){
        console.log("mouseout되었습니다.");
        clearTimeout(countOneSecond);
    });
}

function stopInstructionMessage () {
    const message = document.querySelector(".instruction_message");
    message.classList.add("invisible");
}

function makeUlTemplate () {
    console.log("renderTemplate이 실행되었습니다");
    const fruitBasket = document.createElement('ul');
    fruitBasket.classList.add("fruit-basket");
    const template =
    `<li class="fruit">포도</li>
    <li class="fruit">사과</li>
    <li class="fruit">오렌지</li>
    <li class="fruit">바나나</li>
    <li class="fruit">키위</li>
    <li class="fruit">딸기</li>`
    fruitBasket.innerHTML = template;
    return fruitBasket;
}

function renderTemplate (template, parentNode) {

    parentNode.appendChild(template);
}

/************************************************** mission 2. 마우스 이동정보 기록 *************************************************/

