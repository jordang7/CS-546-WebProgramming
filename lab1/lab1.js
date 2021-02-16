function isPrime(n){
    if(n==0){
        return false;
    }
    if(n==1){
        return false;
    }
    if(n==2){
        return true;
    }
    const ceiling  = Math.ceil(Math.sqrt(n));

    for (var i=2; i < ceiling; i++) {
        if(n % i == 0)
            return false;
    }
    return true;
}

const questionOne = function questionOne(arr) {
    var result= {};

    for(i=0;i<arr.length;i++){
        var num=arr[i];
        result[num] = isPrime(arr[i]);
    }
    return result;
}

function sum_of_squares(arr){
    let squares = arr.map(x=> Math.pow(x,2));
    const reducer = (accumulator, item) => {
        return accumulator + item;
      };

      let sum = squares.reduce(reducer, 0);
      return sum;
}
const questionTwo = function questionTwo(arr) {
    return Math.sqrt(Math.pow(sum_of_squares(arr),6));
}


const questionThree = function questionThree(text) {

    vowelList = 'aeiouAEIOU';
    consonantList='bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
    punctionationList=",.?!:;'()[]-/" + '"';
    specialCharacterList="@#$%^&*~<>[]|\+=`{}";
    elipse = "..."
    numberList='0123456789'

    vowelCount =consonantCount = numberCount = spaceCount = punctuationCount = specialCharacterCount= 0;
    for(i=0;i <= text.length;i++){
        if(vowelList.includes(text[i])){
            vowelCount++;
        }
        if(consonantList.includes(text[i])){
            consonantCount++;
        }
        if(numberList.includes(text[i])){
            numberCount++;
        }
        if(text[i]== " "){
            spaceCount++;
        }
        if(punctionationList.includes(text[i])){
            punctuationCount++;
        }
        if(specialCharacterList.includes(text[i]) || text[i] == elipse){
            specialCharacterCount++;
        }

    }
   var ans=
    {
        consonants:consonantCount,
        vowels:vowelCount,
        numbers:numberCount,
        spaces:spaceCount,
        punctuation:punctuationCount,
        specialCharacters:specialCharacterCount
    }
    return ans;
}
// loan amount, interest rate, number of years for the term
//P = L[c(1 + c)n]/[(1 + c)n - 1]
const questionFour = function questionFour(num1, num2,num3) {
    var A = num1;
    var r = (num2 /100 /12);
    var n = (num3 * 12);
    return (A * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)).toFixed(2);
}

module.exports = {
    firstName: "YOUR FIRST NAME",
    lastName: "YOUR LAST NAME",
    studentId: "YOUR STUDENT ID",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};