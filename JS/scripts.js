// Get relevant DOM elements
let lengthEl = document.querySelector("#length");
let uppercaseEl = document.querySelector("#uppercase");
let lowercaseEl = document.querySelector("#lowercase");
let numberEl = document.querySelector("#numbers");
let speccharEl = document.querySelector("#characters");
let generateEl = document.querySelector("#generate-btn");
let passwordEl = document.querySelector("#password");
let copyEl = document.querySelector("#copy-btn");



// Create Password Criterion Character Arrays (const used because these values should be immutable)
// We could use ISO character sets for everything other than special characters
const uppercaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const lowercaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialCharacters = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "-", "_", "=", "+", ";", ":", ",", ".", "/", "?", "(", ")", "[", "]", "{", "}", "<", ">"];

// Random Password object
let randomPW = {
    pwUL: randomUL,
    pwLL: randomLL,
    pwNum: randomNum,
    pwSC: randomSC
};


// Generate password click event
generateEl.addEventListener('click', () => {
    let criterionLength = +lengthEl.value;
    let criterionUL = uppercaseEl.checked;
    let criterionLL = lowercaseEl.checked;
    let criterionNum = numberEl.checked;
    let criterionSC = speccharEl.checked;

    passwordEl.innerText = generatePassword(
        criterionLength, 
        criterionUL, 
        criterionLL, 
        criterionNum, 
        criterionSC
    );
});

// Generate password function
function generatePassword(criterionLength, pwUL, pwLL, pwNum, pwSC) {
    
    // Initialize password variable

    let generatedPassword = "";

    let criterionCount = pwUL + pwLL + pwNum + pwSC;

    // Filter out unchecked criterion

    let criterionArray = [{ pwUL }, { pwLL }, { pwNum }, { pwSC }].filter
    (item => Object.values(item)[0]);
    
    // Handle cases where user doesn't select ANY password criteria other than password lenght (returns nothing)

    if (criterionCount === 0) {
        return "";
    }

    // Loop to password length for each type

    for (let i = 0; i < criterionLength; i += criterionCount) {
        criterionArray.forEach(type => {
            let funcName = Object.keys(type)[0];

            generatedPassword += randomPW[funcName]();
        });
    }

    // Add final password to password variable

    let finalPassword = generatedPassword.slice(0, criterionLength);

    return finalPassword;
    
}

// Copy password to clipboard

copyEl.addEventListener("click", () => {
    let textarea = document.createElement("textarea");
    let pw = passwordEl.innerText;

    if(!pw) {
        return;
    }

    textarea.value = pw;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
});


// Generate random characters for individual password criteria (uppercase letters, lowercase letters, numbers, and special characters)

// Functions to randomly select uppercase letter
function randomUL() {
    return uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
}

// Generate random lowercase letter
function randomLL() {
    return lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
}

// Generate random number
function randomNum() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

// Generate random special character
function randomSC() {
    return specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
}


// Console log testing 
// console.log(randomUL());
// console.log(randomLL());
// console.log(randomNum());
// console.log(randomSC());
// console.log("criterionCount: ", criterionCount);
// console.log("criterionArray: ", criterionArray);
// console.log("funcName: ", funcName);