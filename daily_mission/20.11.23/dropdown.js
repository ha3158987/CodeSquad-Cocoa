/************************************************** mission 1. 스마트 드롭다운 메뉴 *************************************************/


const dropBox = document.getElementById("show_box");
dropBox.addEventListener('mouseenter', showFruits);

function showFruits (event) {
    stopInstructionMessage();
    // console.log("moseover되었습니다.");

    const countOneSecond =  setTimeout(makeUlTemplate.bind(null, event), 1000);

    dropBox.addEventListener('mouseout', function (){
        // console.log("mouseout되었습니다.");
        clearTimeout(countOneSecond);
    });
}

function stopInstructionMessage () {
    const message = document.querySelector(".instruction_message");
    message.classList.add("invisible");
}

function makeUlTemplate (event) {
    const fruitBasket = document.querySelector('.fruit-basket');
    const fruitArr = ["포도", "사과", "오렌지", "바나나", "키위", "딸기"];
    let template = '';

    fruitArr.forEach(fruit => {
        const innerTemplate = `<li class="fruit">${fruit}</li>`
        template += innerTemplate;
    })

    fruitBasket.innerHTML = template;
    // removeFruitList(fruitBasket, event);
}

// function removeFruitList(parentNode, event) {
//     // const innerContainer = document.querySelector(".inner-container-2");
//     console.dir(event.target);

//     parentNode.addEventListener('mouseout', function () {
//         console.log("mouseleft");

//         if(event.target.className === "inner-container-2") {

//             const fruits = document.querySelectorAll('li');
//             fruits.forEach(fruit => {
//             fruit.classList.add("invisible");
//         })
//         }

//     })
// }

/************************************************** mission 2. 마우스 이동정보 기록 *************************************************/

