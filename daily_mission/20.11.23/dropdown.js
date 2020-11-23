/* mission 1. 스마트 드롭다운 메뉴
1. html ul태그를 DOM으로 가져오기
2. 그리고 addEventListener(비동기)로 콜백함수 부르기
3. 콜백함수는 조건을 추가
   - 리스트영역에 마우스가 1초 이상 머무를 경우에만 하위 li 태그들이 노출이 된다.
   - 즉, mouseover되는 찰나부터 counting 되어야하고,
   - mouseover상태가 아닌 순간에 counting이 다시 초기화 되어야 한다.
   - count가 1000ms을 채우는 순간에 setTimeout(비동기)이 실행되어야하는데...
4. setTimeOut(반환값이 있음; clearTimeOut도 있음!!)이 부르는 콜백함수: innerHTML + template literal(``)로 하위 li 요소들을 한꺼번에 추가한다.
*/


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
    // showFruits.preventDefault(); //상위로 이벤트가 전파되지 않도록 중단.
    // 이벤트 버블링을 막아야함!!!!
    // clearTimeout(showFruits); 한번 추가되고 나면 더 이상 중복 추가 되지 않는 로직이 필요.
}