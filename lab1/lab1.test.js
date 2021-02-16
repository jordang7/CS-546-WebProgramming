const lab1 = require("./lab1");

/*
*   QUESTION ONE
*/
console.log(lab1.questionOne([4, 8, 13]));
// should output {'4': false, '8': false, '13': true}
console.log(lab1.questionOne([27, 17, 23]));
// should output {, '17': true, '23': true, '27': false}
console.log(lab1.questionOne([7, 80, 139]));
// should output {'7': true, '80': false, '139': true}
console.log(lab1.questionOne([199, 14, 42]));
// should output {'14': false, '42': false, '199': true}
console.log(lab1.questionOne([173, 21, 19]));
// should output {'19': true, '21': false, '173': true}
/*
*   QUESTION TWO
*/
console.log(lab1.questionTwo([5,6,7]));
// 1,331,000

console.log(lab1.questionTwo([14,2,1]));
//8,120,601

console.log(lab1.questionTwo([7]));
// 117,649

console.log(lab1.questionTwo([10,12]));
// 14,526,784

console.log(lab1.questionTwo([2, 3, 8, 11]));
// 7,762,392

console.log(lab1.questionTwo([]));
// 0
/*
*   QUESTION THREE
*/
console.log(lab1.questionThree("What a fun 1st assignment!!"));
// should output {consonants: 14, vowels: 6, numbers: 1, spaces: 4, punctuation: 2, specialCharacters: 0}

console.log(lab1.questionThree("How do I get an A in CS546 @ Stevens Institute of Technology?"));
// {consonants: 27, vowels: 17, numbers: 3, spaces: 12, punctuation: 1, specialCharacters: 1}

console.log(lab1.questionThree("If you build it, they will come... 100%"));
// {consonants: 14, vowels: 10, numbers: 3, spaces: 7, punctuation: 2, specialCharacters: 1}

console.log(lab1.questionThree("The New York Mets bullpen is awful, especially Edwin Diaz, who's # is 39" ));
// {consonants: 34, vowels: 19, numbers: 2, spaces: 13, punctuation: 3, specialCharacters: 1}

console.log(lab1.questionThree(""));
// {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}
/*
*   QUESTION FOUR
*/


console.log(lab1.questionFour(3000, 4, 20));
//18.18

console.log(lab1.questionFour(27000, 8, 30));
//198.12

console.log(lab1.questionFour(6123, 3.154, 23));
//31.22

console.log(lab1.questionFour(4321, 4.321, 41));
//18.76

console.log(lab1.questionFour(70000, 8, 30));
// 513.64