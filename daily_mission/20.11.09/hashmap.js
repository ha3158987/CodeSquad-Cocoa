//[2020.11.09 미션1] Hashmap으로 연락처목록 만들기

// - 문자열 키와 문자열 값을 저장하는 해시맵 라이브러리를 구현한다.
// - 고유한 Hash 함수를 정한다 : name 과 phone number 정보를 저장하는 Contact Hash 함수 만들기!

//   <To-do List>
//   7. replace(String key, String value) 키-값으로 기존 값을 대체한다.
//   8. size() 전체 아이템 개수를 리턴한다.   //하나의 entry를 하나의 아이템을 카운트?
//   9. clear() 전체 맵을 초기화한다.

/* ----------------------- Default setting 및 재사용함수 구현 -----------------------------*/
//저장소 만들기
let storageArr = [];
storageArr.length = 10;
storageArr = Array.from(storageArr, el => []);

//constactInfo Class 생성자함수 만들기 (#10. ES6 Class 활용)
class contactInfo {
    constructor(name, phoneNumber) {
        this.name = name;
        this.phoneNumber = phoneNumber;
    }
}

//key로 hashcode 구하기 (hashcode 반환)
function getHashCode (key) {
    const ascii = key.split('').map(letter => letter.charCodeAt(0));
    const hashCode = ascii.reduce((cur, prev) => cur + prev);
    return hashCode;
}

//hashcode로 인덱스 구하기 (외부배열 인덱스 반환)
function convertToIndex (hashCode) {
   return hashCode % storageArr.length;
}

//innerArray를 반환해주는 함수
function getInnerArray (key) {
   const index = convertToIndex(getHashCode(key));
   return storageArr[index];
}


/* ----------------- 1. put(String key, String value) 키-값을 추가한다. -------------------*/
function put (name, phoneNumber) {

    const newInfo = new contactInfo(name, phoneNumber);
    const innerArr = getInnerArray(name);
    innerArr.push(newInfo);

}


/* ----------------- 2. remove(String key) 해당 키에 있는 값을 삭제한다. -------------------- */
//키:밸류 를 한쌍으로 같이 삭제
function remove (key){
    const innerArr = getInnerArray(key);

    innerArr.forEach(function (elObj){

        for (let keyInside in elObj) {

            if (elObj[keyInside] === key) {
                let idx = innerArr.indexOf(elObj);
                innerArr.splice(idx, 1);
            }
        }

    })
}


/* ----------3. containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.------------ */
function containsKey (key) {
    const innerArr = getInnerArray(key);
    const valueArr = Object.values(innerArr);

    let hasKey;
    valueArr.forEach(function (elObj){

        for (k in elObj){
            if (elObj[k] === key){
                hasKey = true;
            }
        }
    })

   return hasKey === true ? true : false;
}


/* --------------------4. get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.--------------------- */
function get (key) {
    const innerArr = getInnerArray(key);
    let telNum;

    let searchResult = `${key}(이)라는 이름을 찾을 수 없습니다.`;
    if (containsKey(key)) {                        //containsKey 재사용
        innerArr.forEach( function (obj) {
            if (obj["name"] === key )
                // searchResult = obj;

                telNum = JSON.stringify(obj["phoneNumber"]);
                const telNumStr = `0${telNum.slice(0, 2)}-${telNum.slice(2, 6)}-${telNum.slice(6, 10)}`;
                searchResult = `이름: ${key}, 전화번호: ${telNumStr}`;
            }
        )
    }
    return searchResult;
}


/* ---------------------5. isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.----------------------- */
function isEmpty() {
    let hasNoContact = true;

    storageArr.forEach(function (innerArr){
        if (innerArr.length !== 0) {
            hasNoContact = false;
            return;      //요소가 하나라도 발견되면 loop를 탈출
        }
    })

    return hasNoContact;
}


/* ---------------------6. keys() 전체 키 목록을 [String] 배열로 리턴한다.----------------------- */
//map 이나 filter 사용
function keys () {

}



/* -----------------------------------test case------------------------------------------ */

function testCase() {

    put("Hannah", 1099998888);
    put("Crong", 1011112222);
    put("Beemo", 1033334444);
    put("Rash", 1055556666);
    put("Goody", 1077778888);
    put("Autumn", 1099991111);
    put("Jun", 1022225555);

    console.log("#1. put으로 새로운 contact 추가:", storageArr);

    remove("Hannah");
    console.log("#2. remove로 해당 key(Hannah)에 있는 값 삭제:", storageArr);

    console.log("#3. 해당 key(Crong)가 존재하는 지 확인:", containsKey("Crong"));
    console.log("#3. 해당 key(John)가 존재하는 지 확인:", containsKey("John"));

    console.log("#4. 해당 key(Beemo)와 매치되는 값을 찾아서 리턴:", get("Beemo"));
    console.log("#4. 해당 key(Gildong)와 매치되는 값을 찾아서 리턴:", get("Gildong"));

    console.log("#5. 비어있는 맵인가? ", isEmpty());
}

testCase();

