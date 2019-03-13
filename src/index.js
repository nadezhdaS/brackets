module.exports = function check(str, bracketsConfig) {
      const openToClose = new Map();
    const closeBrackets = new Set();
    bracketsConfig.forEach(c => {
        openToClose.set(c[0], c[1]);
        closeBrackets.add(c[1]);
    });
    const stack = [];
    for (let i = 0; i < str.length; i++) {
        const bracket = str.charAt(i);
        if (openToClose.has(bracket)) {
            if (stack.length === 0 || !closeBrackets.has(bracket)) {
                stack.push(bracket);
            } else {
                //check situation when open and close brackets are equal
                const openBracket = stack.pop();
                if (openBracket !== bracket) {
                    stack.push(openBracket);
                    stack.push(bracket);
                }
            }
        } else if (closeBrackets.has(bracket)) {
            const openBracket = stack.pop();
            if (bracket !== openToClose.get(openBracket)) {
                return false;
            }
        }
    }

    return stack.length === 0;
}
