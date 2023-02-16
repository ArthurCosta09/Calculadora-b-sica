let numbers = document.querySelectorAll('.number-btn');
let operators = document.querySelectorAll('.operator-btn');
let inputField = document.querySelector('.result');
let delBtn = document.querySelector('.del-btn');
let equalBtn = document.querySelector('.equal-btn');
inputField.value = "";

let operatorList = ["+", "-", "x", "/"];
let opPrior = {
    "+": 0,
    "-": 0,
    "x": 1,
    "/": 1
};
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
        let ops = [];
        let numbs = [];
        let arr = inputField.value.split(" ");

        arr.map(value => {
            if (operatorList.includes(value)){
                ops.push(value);
            }
            else if (value !== ""){
                numbs.push(parseFloat(value));
            }
        });

        let numLen = numbs.length;
        let opLen = ops.length;
        
        if (opLen >= numLen){
            inputField.value = "Error!";
            return;
        }
        else if (numLen === 1){
            return;
        }
        else {
            let result = 0;
            for(let i=0;i<opLen;i++){
                let currOp = ops[0];
                let opIndex = 0;
                ops.map((value, index) => {
                    if(index < ops.length - 1){
                        let after = ops[index+1];
                        if (opPrior[value] > opPrior[after]){
                            currOp = value;
                            opIndex = index;
                        }
                        else {
                            currOp = (opPrior[value] === opPrior[after]) ? currOp : after;
                            opIndex = (opPrior[value] === opPrior[after]) ? opIndex : index+1;
                        }
                    }
                });
                                                
                let before = numbs[opIndex];
                let after = numbs[opIndex+1];
                switch(currOp){
                    case "+":
                        result = before + after;
                    break;
                    case "-":
                        result = before - after;
                    break;
                    case "x":
                        result = before * after;
                    break;
                    case "/":
                        result = (!after) ? "Zero Division Error!" : before / after;
                    break;
                }
                if (result === "Zero Division Error!") break;
                numbs.splice(opIndex, 2, result);
                ops.splice(opIndex, 1);
                                
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
    inputField.value += ((operator === "+" || operator === "-") && !inputField.value.length) 
                          ? `${operator}` : ` ${operator} `;
}));
equalBtn.addEventListener('click', equal);







