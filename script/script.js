let numbers = document.querySelectorAll('.number-btn');
let operators = document.querySelectorAll('.operator-btn');
let inputField = document.querySelector('.result');
let delBtn = document.querySelector('.del-btn');
let equalBtn = document.querySelector('.equal-btn');
inputField.value = "";

let operatorList = ["+", "-", "x", "/"];
let currOp = "";
let currNumbers = [];
let state = 'calculate';


function clickNumber(element)
{
    if (state === "result"){
        inputField.value = "";
        state = "calculate";
    }

    let value = element.value;
    inputField.value += value;
}

function equal() {
    if (inputField.value) {
        state = "result";
        let opCounter = {};
        let arr = inputField.value.split(" ");
        let divError = false;
        
        arr.map(value => {
            if (operatorList.includes(value)){
                opCounter[value] = (opCounter[value] || 0) + 1;
            }
        });
        arr = arr.filter(value => {return !operatorList.includes(value) && value !== " " && value !== "";});
        console.log(arr);
        console.log(opCounter);

        let arrLen = arr.length;
        let opCounterLen = Object.keys(opCounter).length;
        console.log(arrLen, opCounterLen);

        if (opCounterLen >= arrLen || opCounterLen > 1){
            inputField.value = "Error!";
        }
        else {
            let op = Object.keys(opCounter)[0];
            console.log(opCounter[Object.keys(opCounter)[0]]);
            let result = 0;
            switch(op){
                case "+":
                    arr.map(value => result += parseFloat(value));
                break;
                case "-":
                    arr.map(value => result = (!result) ? parseFloat(value) : result - parseFloat(value));
                break;
                case "x":
                    result = 1;
                    arr.map(value => result *= parseFloat(value));
                break;
                case "/":
                    arr.map((value, index) => {
                      if (!divError) {
                        if (index > 0){
                            if (parseFloat(value) === 0) {
                                result = "Zero Division Error!";
                                divError = true;
                            }
                            else {
                                result /= parseFloat(value);
                            }
                        }
                        else {
                            result = parseFloat(value);
                        }
                      }
                    });
                break;
                default: 
                    result = inputField.value;
                break;
            }

            inputField.value = result.toString();
        }
    }
   
}


numbers.forEach((btn) => btn.addEventListener('click', () => clickNumber(btn)));
delBtn.addEventListener('click', () => {
    let index = inputField.value.length - 1;
    let newValue = inputField.value.substring(0, index);
    inputField.value = newValue;
});
delBtn.addEventListener("dblclick", () => {inputField.value = "";});
operators.forEach((btn) => btn.addEventListener('click', () => {
    let operator = btn.value;
    if (state === "result") {
        state = "calculate";
    }
    inputField.value += ` ${operator} `;
}));
equalBtn.addEventListener('click', equal);







