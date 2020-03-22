const REGEX = /[-+*\/()]|\d+/g;
let priority = {
            "+": 2,
            "-": 2,
            "*": 3,
            "/": 3,
            "(": 1,
            ")": 1
        };
function operation(b, a, sign) {
    if(sign == "+"){
        return Number(a) + Number(b);
    }
    if(sign == "-"){
        return Number(a) - Number(b);
    }
    if(sign == "*"){
        return Number(a) * Number(b);
    }
    if(sign == "/") {
        if(Number(b) === 0){
            throw new Error("TypeError: Division by zero.");
        }
        return Number(a) / Number(b);
    }
}

function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let expr_array = expr.match(REGEX);
    if(expr_array.filter(item => item =='(').length !== expr_array.filter(item => item ==')').length) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    let numbers = [];
    let signs = [];
    let len = Object.keys(priority).length;
    for(let item of expr_array){
        if(!Object.keys(priority).includes(item)) {
            numbers.push(item);
        }
        if(Object.keys(priority).includes(item)){
            if(priority[item] > priority[signs[signs.length - 1]] || item === "(" || signs.length === 0){
                signs.push(item);
            }
            else if(item === ")"){
                while(signs[signs.length - 1] !== "("){
                    let res = operation(numbers.pop(), numbers.pop(), signs.pop());
                    numbers.push(res);
                }
                signs.pop();
            }
            else {
                while(priority[item] <= priority[signs[signs.length - 1]]){
                    let res = operation(numbers.pop(), numbers.pop(), signs.pop());
                    numbers.push(res);
                }
                signs.push(item);
            }
        }
    }
    while(signs.length !== 0){
        let res = operation(numbers.pop(), numbers.pop(), signs.pop());
        numbers.push(res);
    }
    return Number(numbers);
}

module.exports = {
    expressionCalculator
}