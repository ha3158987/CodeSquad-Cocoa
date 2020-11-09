//[2020.11.09 미션1] Hashmap으로 연락처목록 만들기

// - 문자열 키와 문자열 값을 저장하는 해시맵 라이브러리를 구현한다.
// - 고유한 Hash 함수를 정한다.
//   4. get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
//   5. isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
//   6. keys() 전체 키 목록을 [String] 배열로 리턴한다.
//   7. replace(String key, String value) 키-값으로 기존 값을 대체한다.
//   8. size() 전체 아이템 개수를 리턴한다.   //하나의 entry를 하나의 아이템을 카운트?
//   9. clear() 전체 맵을 초기화한다.
//   10. ES Classes를 활용한 방법으로 구현한다.

//저장소 만들기
const storageArr = [];
storageArr.length = 10;   //size는 10  //Array.from 배열이 아닌 타입에 배열메서드를 사용하고 싶을 때 쓸 수 있는 메서드
// storageArr.forEach( emptyEl =>  emptyEl = []); //map 활용
for (let i = 0; i < storageArr.length; i++){     //innerArr(이중배열 추가)
    storageArr[i] = [];
}

//constactInfo Class 생성자함수 만들기
class contactInfo {
    constructor(name, phoneNumber) {
        this[name] = JSON.stringify(phoneNumber); //문자열로 저장
    }
}

//key로 hashcode 구하기
function getHashCode (key) {
    const ascii = key.split('').map(letter => letter.charCodeAt(0));
    const hashCode = ascii.reduce((cur, prev) => cur + prev);
    return hashCode;
}

//hashcode로 인덱스 구하기
function convertToIndex (hashCode) {
   const firstIndex = hashCode % storageArr.length;
   return firstIndex;
}

/* ----------------- 1. put(String key, String value) 키-값을 추가한다. -------------------*/
function put (name, phoneNumber) {
    const newInfo = new contactInfo(name, phoneNumber); //새로운 newInfo인스턴스 생성

    //1. 어느 인덱스에 push할 지 hashcode를 먼저 구하기
    const hashCode = getHashCode(name);
    const idx = convertToIndex(hashCode);

    // console.log("해시코드", hashCode); //590
    // console.log("idx", idx);  //0

    //2. 저장소에 push
    const innerArr = storageArr[idx];
    innerArr.push(newInfo);
}

/* ----------------- 2. remove(String key) 해당 키에 있는 값을 삭제한다. -------------------- */
//키:밸류 를 한쌍으로 같이 삭제
function remove (key){
    const idx = convertToIndex(getHashCode(key));
    const innerArr = storageArr[idx];

    innerArr.forEach(function (elObj){   //innderArr에서 동일한 key를 가진 obj(요소)찾기

        for (let keyInside in elObj) {
            if (keyInside === key) {
                let idx = innerArr.indexOf(elObj);
                innerArr.splice(idx, 1);
            }
        }

    })
}

/* ----------3. containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.------------ */
function containsKey (key) {

}



/* -----------------------------------test case---------------------------------------- */

function testCase() {
put("Hannah", 1099998888);
put("Crong", 1011112222);
put("Beemo", 1033334444);
put("Rash", 1055556666);
put("Goody", 1077778888);
put("Autumn", 1099991111);
put("Jun", 1022225555);

console.log("put으로 새로운 contact 추가:", storageArr);
remove("Hannah");
console.log("remove로 해당 key(Hannah)에 있는 값 삭제:", storageArr);
}

testCase();


//전화번호 불러올 때
//var phoneNum = parseInt(obj[name])로 문자열화.
// phoneNum = '0' + phoneNum.substring(0, 2) + '-'+ phoneNum.substring(2, 6) + '-' + phoneNum.substring(6, 9)
//"010-9999-8889"
