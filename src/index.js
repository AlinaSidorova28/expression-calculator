const REGEX = /\s/;
let sign_priority = {
            "+": 1,
            "-": 1,
            "*": 2,
            "/": 2
        };
function operation(a, b, sign) {
    if(sign == "+"){
        return a+b;
    }
    if(sign == "-"){
        return a-b;
    }
    if(sign == "*"){
        return a*b;
    }
    if(sign == "/") {
        if(b === 0){
            throw("TypeError: Division by zero.");
        }
        return a/b;
    }
}

function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let expr_array = expr.trim().split(REGEX);
    let number_stack = [];
    let sign_stack = [];
    let len = Object.keys(sign_priority).length;
    for(let item of expr_array){
        if(!Object.keys(sign_priority).includes(item) && item !== "(" && item !== ")") {
            number_stack.push(item);
        }
        if(Object.keys(sign_priority).includes(item)){
            if(sign_stack.length === 0){
                sign_stack.push(item);
            }
            else {
                if(sign_priority[item] > sign_priority[sign_stack[sign_stack.length - 1]]){
                    sign_stack.push(item);
                }
                else {
                    //console.log("sign_stack: " + sign_stack + " number_stack: " + number_stack);
                    let res = operation(parseFloat(number_stack.slice(-2, -1)), parseFloat(number_stack.slice(-1)), sign_stack.slice(-1));
                    number_stack.splice(-2, 2, res);
                    sign_stack.splice(-1, 1, item);
                }
                //console.log("sign_stack: " + sign_stack + "number_stack: " + number_stack);
            }
        }
        
    }
    while(sign_stack.length !== 0){
        let res = operation(parseFloat(number_stack.slice(-2, -1)), parseFloat(number_stack.slice(-1)), sign_stack.slice(-1));
        //console.log("sign_stack: " + sign_stack + "number_stack: " + number_stack);
        number_stack.splice(-2, 2, res);
        sign_stack.pop();
        //console.log("result: " + res);
        
    }
    return parseFloat(number_stack);
}

module.exports = {
    expressionCalculator
}