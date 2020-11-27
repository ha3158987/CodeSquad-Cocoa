/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let xArr = JSON.stringify(x).split("");//["-", 2", "3", "4"]

    let posArr = xArr.filter(x => isNaN(x * 1) === false);//["2", "3", "4"]

    let reversed = posArr.reverse(); //["4", "3", "2"]
    let answer = reversed.join(""); //"432"

    if (xArr.length !== reversed.length) {
        answer = `-${parseInt(answer)}`
    }

    return parseInt(answer);
};