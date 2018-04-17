
function alphabetizer(string) {
    const str_len = string.length;
    if (string.length == 0) {
        return;
    }
    let capArray = [];
    let lowerArray = [];
    let finalArray = [];
    let str_i = 0;

    while (str_i < str_len) {
        let currentCharCode = string.charCodeAt(str_i);
        if (64 < currentCharCode && currentCharCode < 91) {
            // sorted append the uppercase character
            sortedAppendAsInt(capArray, currentCharCode);
        } else if (96 < currentCharCode && currentCharCode < 123) {
            // sorted append the lowercase character
            sortedAppendAsInt(lowerArray, currentCharCode);
        }
        str_i++;
    }
    finalArray = mergeCases(capArray, lowerArray);
    const result = finalArray.map((int) => String.fromCharCode(int)).join('');
    return result;

}

function mergeCases(capArray, lowerArray) {

    let capIndex = 0;
    let lowerIndex = 0;
    let lowerArrLen = lowerArray.length;
    let capArrLen = capArray.length;
    let finalArray = [];

    while (1) {
        if ((lowerIndex < lowerArrLen) && (capIndex < capArrLen)) {
            if ((capArray[capIndex] + 32) <= lowerArray[lowerIndex]) {
                finalArray.push(capArray[capIndex]);
                capIndex++;
            } else {
                finalArray.push(lowerArray[lowerIndex]);
                lowerIndex++;
            }
        } else if (lowerIndex === lowerArrLen) {
            finalArray.push(capArray[capIndex]);
            capIndex++;
        } else {
            finalArray.push(lowerArray[lowerIndex]);
            lowerIndex++;
        }

        if (lowerIndex === lowerArrLen && capIndex === capArrLen) {
            return finalArray
        }
    }

}


function sortedAppendAsInt(intArray, code) {
    if (intArray.length === 0) {
        intArray.push(code);
        return;
    }

    for (let i = 0; i < intArray.length; i++) {
        if (code < intArray[i]) {
            intArray.splice(i, 0, code);
            return;
        }
    }
    // No items found, push the item to the end of the array
    intArray.push(code);
}

module.exports = alphabetizer;