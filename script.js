var result = document.querySelector(".result");
var buttons = document.querySelector(".buttons");
var operators = document.querySelectorAll(".operator");
var clearToggle = false;
var timeFlag = false;
var expressions = [];
var canOperate = false;

buttons.addEventListener("click", function (e) {
    var resultValue = result.innerHTML;
    var btn = e.target;

    //var doubleBordered = document.querySelector(".doubleBordered");
    //if (null !== doubleBordered) doubleBordered.classList.remove("doubleBordered");

    if (btn.className.indexOf("resetBtn") > -1) {
        reset();
    } else if (btn.className.indexOf("number") > -1) {
        canOperate = true;
        if (clearToggle) {
            resultValue = "";
            clearToggle = false;
        }
        if (resultValue == '0' && btn.className.indexOf("dot") === -1) {
            resultValue = "";
        }
        result.innerHTML = resultValue + btn.innerHTML;
    } else {
        clearToggle = true;
        if (canOperate) {
            //btn.classList.add("doubleBordered");

            if (btn.innerHTML === '*' || btn.innerHTML === '/') {
                if (!timeFlag) {
                    expressions.push(resultValue);
                    expressions.push(btn.innerHTML);
                    timeFlag = true;
                    return;
                }
            } else if (btn.innerHTML === '%') {
                resultValue = parseFloat(resultValue / 100);
                result.innerHTML = resultValue;
                return;
            }

            if (expressions.length > 1) {
                var op = expressions.pop();
                var num1 = expressions.pop();
                resultValue = calculate(num1, resultValue, op);
                if ((btn.innerHTML === '+' || btn.innerHTML === '-' || btn.innerHTML === '=') && timeFlag) {
                    while (expressions.length > 1) {
                        op = expressions.pop();
                        num1 = expressions.pop();
                        resultValue = calculate(num1, resultValue, op);
                    }
                    timeFlag = false;
                }

            }
            expressions.push(resultValue);
            expressions.push(btn.innerHTML);
            result.innerHTML = resultValue;
            if (btn.innerHTML === '=') {
                clearToggle = true;
                timeFlag = false;
                expressions = [];
                return;
            }
        }
        canOperate = false;
    }

}, false);

function calculate(left, right, op) {
    switch (op) {
        case "+":
            return parseFloat(left) + parseFloat(right);
        case "-":
            return parseFloat(left) - parseFloat(right);
        case "*":
            return parseFloat(left) * parseFloat(right);
        case "/":
            return parseFloat(left) / parseFloat(right);

    }
}

function reset() {
    clearToggle = false;
    timeFlag = false;
    expressions = [];
    canOperate = false;
    result.innerHTML = "0";
}