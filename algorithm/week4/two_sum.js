/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

var answersArray = [];
let count = 0;

var twoSum = function(nums, target) {

    for (var i = 0; i < 3; i++) { //인덱스 2까지만 돌면 됨.
        count++;
        for (var j = count; j <= 3; j++) {

           if (nums[i] + nums[j] === target){
                console.log(nums[i], nums[j]);
                answersArray.push(i);
                answersArray.push(j);
            }
        }
    }

    return answersArray;
};