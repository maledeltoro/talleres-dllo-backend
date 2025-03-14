//Punto 1

function desglosarString(str, type) {
    let count = 0;
    const vocales = 'aeiou';
    if (str === "") {
        return count;
    }
    else {
        let str2 = str.toLowerCase();
        if (type === "vocales") {
            count = [...str2].filter(letter => vocales.includes(letter)).length;
        } else if (type === "consonantes") {
            count = [...str2].filter(letter => !vocales.includes(letter)).length;
        }
    }
    return count;
}
console.log(desglosarString("Valeria", "vocales"));

//Punto 2

function twoSum(list, sum) {
    return list.map((num, i) => {
        let complement = sum - num;
        let j = list.find((n, index) => n === complement && index !== i);
        return j !== undefined ? [i, list.indexOf(j)] : null;
    }).filter(result => result !== null)[0];
}
console.log(twoSum([2, 7, 11, 15], 9));

//Punto 3

function conversionRomana(str) {
    const romans = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    const values = str.split('').map(letter => romans[letter]);

    return values.reduce((total, currentValue, index, arr) => {
        if (index < arr.length - 1 && currentValue < arr[index + 1]) {
            return total - currentValue;
        } else {
            return total + currentValue;
        }
    }, 0);
}

console.log(conversionRomana("XIX")); 