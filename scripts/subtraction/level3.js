


let levelOne = [1,2,3];
let levelTwo = [2,3,4,5];
let levelThree = [3,4,5,6,7];
let levelFour = [3,4,5,6,7,8];
let levelFive = [2,3,4,5,6,7,8,9];

// function creates an array of random equations
// using an array of numbers specified in the level
// arrays and a specified number of problems

const createRandomEquations = (equationType, array, numOfProblems) => {

    let problemArray = [];

    // creates addition problems
    if (equationType == 'addition') {
        for (let i = 0; i < numOfProblems; i++) {
            let randomValue1 = Math.floor(Math.random()*(array.length));
            let randomValue2 = Math.floor(Math.random()*(array.length));
            let randomProblem = `${array[randomValue1]} + ${array[randomValue2]}`;
            problemArray.push(randomProblem);
        }
        return problemArray;
    }

    // creates subtraction problems
    else if (equationType == 'subtraction') {
        for (let i = 0; i < numOfProblems; i++) {
            let randomValue1 = Math.floor(Math.random()*(array.length));
            let randomValue2 = Math.floor(Math.random()*(array.length));
            let randomProblem;
            if (randomValue1 >= randomValue2) {
                randomProblem = `${array[randomValue1]} - ${array[randomValue2]}`;
            } else {
                randomProblem = `${array[randomValue2]} - ${array[randomValue1]}`;
            } 
            problemArray.push(randomProblem);
        }
        return problemArray;
    }

    // creates multiplication problems
      if (equationType == 'multiplication') {
        for (let i = 0; i < numOfProblems; i++) {
            let randomValue1 = Math.floor(Math.random()*(array.length));
            let randomValue2 = Math.floor(Math.random()*(array.length));
            let randomProblem = `${array[randomValue1]} x ${array[randomValue2]}`;
            problemArray.push(randomProblem);
        }
        return problemArray;
    }
}

//create equations
let additionProblems = createRandomEquations('subtraction', levelThree, 20);

//initialize buttons
let startButton = document.getElementById('start-button');
let doneButton = document.getElementById('done-button');

//logic for creating and displaying equations
function displayProblems() {
    for (let i = 0; i < additionProblems.length; i++) {
        let p = document.createElement('P');
        p.textContent = additionProblems[i] + ' = ';
        document.getElementById('problem-container').appendChild(p);
    }
    startButton.style.display = 'none';
    doneButton.style.display = 'block';
}

//logic for creating and displaying input fields
function displayInputFields() {
    for (let i = 0; i < additionProblems.length; i++) {
        let input = document.createElement('INPUT');
        document.getElementById('inputs-container').appendChild(input);
    }
}

//display problems and blank input fields
startButton.addEventListener('click', displayProblems);
startButton.addEventListener('click', displayInputFields);

//EQUATIONS

let problems = document.getElementsByTagName('p');

// 3 logic to get innerText from element arrays
function getInnerText(array) {
    let newArray = []
    for (let i = 0; i < array.length; i++) {
        newArray.push(array[i].innerText);
    }
    return newArray;
}

// getInnerText(problems);

// 5 split problems array into indivual elements 
//i.e. '4 + 1 =' becomes '4', ' ','+', ' ', '1', ' ', '='
function splitArray(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            newArray.push(array[i][j]);
        }
    }
    return newArray;
}

// 6 make new array composed of numbers as strings only
function filterNumbers (array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] === '3' || array[i] === '4' || array[i] === '5' || array[i] === '6' || array[i] === '7') {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

// 7 change strings to numbers
function parseNumbers(array){
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(parseInt(array[i]));
    }
    return newArray;
}

// 8 add everyother number together
function addNumbers(array){
    let newArray = [];
    for (let i = 0; i < array.length; i += 2) {
        newArray.push(array[i] - array[i+1])
    }
    return newArray;
}

//INPUTS
let answers = document.getElementsByTagName('input');

// get values from input fields
function getInputValues(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(parseInt(array[i].value));
    }
    return newArray;
}

let score = document.getElementById('score');
let percent = document.getElementById('percent');
let scoreboard = document.getElementById('scoreboard');
let fixWrongAnswersButton = document.getElementById('fix-wrong-answers-button');


function compare (array1, array2) {
    let rightAnswers = 0;
    for (let i = 0; i < array1.length; i++) {
        
        if (array1[i] === array2[i]) {
            rightAnswers++;
            answers[i].style.backgroundColor = 'green';
            console.log(i + ' is correct');

        } else {
            answers[i].style.backgroundColor = 'red';
            console.log(i + ' is  not correct');
        }

    }

    if (rightAnswers === array1.length) {
        fixWrongAnswersButton.style.display = 'none';
        scoreboard.style.height = '500px';
        scoreboard.style.top = '-50px';
        doneButton.style.display = 'none';
    }

    score.innerHTML = rightAnswers + ' of ' + array1.length + ' problems correct'
    percent.innerHTML = 'You scored ' + rightAnswers/array1.length*100 + '%';
    scoreboard.style.display = 'block';
    
}

// compare((addNumbers(parseNumbers(filterNumbers(splitArray(getInnerText(problems)))))), getInputValues(answers));

doneButton.addEventListener('click', () => compare(addNumbers(parseNumbers(filterNumbers(splitArray(getInnerText(problems))))), getInputValues(answers)));
fixWrongAnswersButton.addEventListener('click', () => scoreboard.style.display = 'none');

