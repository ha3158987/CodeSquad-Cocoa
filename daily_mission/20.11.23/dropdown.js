/************************************************** mission 1. 스마트 드롭다운 메뉴 *************************************************/


const dropBox = document.getElementById("show_box");
dropBox.addEventListener('mouseover', showFruits);

function showFruits () {
    stopInstructionMessage();
    console.log("moseover되었습니다.");

    const countOneSecond =  setTimeout(makeUlTemplate, 1000);

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
    const fruitBasket = document.querySelector('.fruit-basket');
    const fruitArr = ["포도", "사과", "오렌지", "바나나", "키위", "딸기"];
    let template = '';

    fruitArr.forEach(fruit => {
        const innerTemplate = `<li class="fruit">${fruit}</li>`
        template += innerTemplate;
    })

    fruitBasket.innerHTML = template;
}

/************************************************** mission 2. 마우스 이동정보 기록 *************************************************/

