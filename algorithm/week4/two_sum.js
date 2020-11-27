/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */


var twoSum = function(nums, target) {
    var answersArray = [];

        for (var i = 0; i < nums.length - 1; i++) { //인덱스 2까지만 돌면 됨.

            for (var j = i + 1; j <= nums.length; j++) {

               if (nums[i] + nums[j] === target){
                    console.log(nums[i] + nums[j]);
                    return [i, j];
                }
            }
        }
    return answersArray;
};