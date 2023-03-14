import ACTIONS from "./action";

const evaluate = state => {
    let { lastOperand: last, currentOperand: current, operation } = state;
    last = parseFloat(last);
    current = parseFloat(current);
    let ans = "";
    switch (operation) {
        case '+':
            ans = last + current;
            break;
        case '-':
            ans = last - current;
            break;
        case '×':
            ans = last * current;
            break;
        case '÷':
            if (current === 0) ans = "除数不能为0"
            else ans = last / current;
            break;
    }
    return ans.toString();
}

const reducer = (state = {
    currentOperand: "",
    lastOperand: "",
    operation: "",
    overwrite: false, //是否要将结果覆盖掉
}, action) => {
    switch (action.type) {
        case ACTIONS.Add_digit:
            if (state.overwrite) {
                if (state.lastOperand === '')
                    return {
                        ...state,
                        overwrite: false,
                        currentOperand: "",
                    }
                else {
                    return {
                        ...state,
                        overwrite: false,
                        currentOperand: action.digit,
                    }
                }
            }
            if (state.currentOperand === "除数不能为0")
                return {
                    ...state,
                    currentOperand: action.digit,
                }
            if (state.currentOperand === "0" && action.digit === '0') return state; /*当前为0再按0的话就不显示多余的0*/
            if (state.currentOperand === "0" && action.digit !== '.') return { /*点击按钮前是0，再输入不是.的其他数据，则将前置0去掉*/
                ...state,
                currentOperand: action.digit
            }
            //str.includes('.'):判断str是否包含'.' 
            if (action.digit === '.' && state.currentOperand.includes('.')) { /*当前是.且前面已经有'.'的话则不能再输入'.' */
                return state;
            }
            //点击'.'时，若前面为空，则在前面添加一个0
            if (action.digit === '.' && state.currentOperand === "")
                return {
                    ...state,
                    currentOperand: "0" + action.digit,
                }
            return {
                ...state,
                currentOperand: state.currentOperand + action.digit,
            }
        case ACTIONS.Delete_digit:
            if (state.overwrite)
                return {
                    ...state,
                    currentOperand: "",
                    overwrite: false,
                }
            if (state.currentOperand === "除数不能为0")
                return {
                    lastOperand: "",
                    currentOperand: "",
                    operation: "",
                }
            if (state.currentOperand === "") return state; //若已经是空的话就不需要再删了
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1), //截取从索引0开始到索引的最后一项（不包括最后一项）的字符串,slice不改变原字符串
            }
        case ACTIONS.Choose_operation:
            if (action.operation === 'CE' || state.currentOperand === "除数不能为0")
                return {
                    lastOperand: "",
                    currentOperand: "",
                    operation: "",

                }
            if (state.lastOperand === "" && state.currentOperand === "") { //当都没有数据时，点击操作符都不会有翻译
                return state;
            }
            if (state.lastOperand === "") { //当只有上面为空，下面不为空时
                if (action.operation === 'sqr') {
                    return {
                        ...state,
                        lastOperand: (parseFloat(state.currentOperand) * parseFloat(state.currentOperand)).toString(),
                        currentOperand: "",
                    }
                }
                return {
                    ...state,
                    lastOperand: state.currentOperand,
                    operation: action.operation,
                    currentOperand: "",
                }

            }
            if (state.currentOperand === "") { //当下面是空的时候，直接将运算符替换掉
                return {
                    ...state,
                    operation: action.operation,
                }
            }
            let ans = evaluate(state);

            if (action.operation === "sqr") {
                return {
                    ...state,
                    lastOperand: ans,

                }
            }
            if (ans === "除数不能为0")
                return {
                    ...state,
                    currentOperand: "除数不能为0",
                }
            else
                return {
                    ...state,
                    lastOperand: ans,
                    operation: action.operation,
                    currentOperand: "",
                }
        case ACTIONS.Evaluate:
            if (state.currentOperand === '' || state.lastOperand === '' || state.operation === '') return state;
            return {
                ...state,
                currentOperand: evaluate(state),
                lastOperand: "",
                operation: "",
                overwrite: true,
            }

        default:
            return state;

    }

}

export default reducer;