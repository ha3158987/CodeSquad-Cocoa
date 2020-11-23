/* mission 1. 스마트 드롭다운 메뉴
1. html ul태그로 list를 queryselector로 가져오기
2. 그리고 addEventListener(비동기)로 콜백함수 부르기
3. 콜백함수는 조건을 추가
   - 리스트영역에 마우스가 1초 이상 머무를 경우에만 하위 li 태그들이 노출이 된다.
   - 즉, mouseover되는 찰나부터 counting 되어야하고,
   - mouseover상태가 아닌 순간에 counting이 다시 초기화 되어야 한다.
   - count가 1000ms을 채우는 순간에 setTimeout(비동기)이 실행되어야하는데...
4. setTimeOut(반환값이 있음; clearTimeOut도 있음!!)이 부르는 콜백함수: innerHTML + template literal(``)로 하위 li 요소들을 한꺼번에 추가한다.
*/

