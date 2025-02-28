function punto1(numeros) {
    if (numeros.length === 0) return undefined;
    let maximo = numeros[0];
    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] > maximo) {
            maximo = numeros[i];
        }
    }
    return maximo;
}

function punto2(numeros, numero) {
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] === numero) {
            return true;
        }
    }
    return false;
}

function punto3(numeros) {
    let total = 0;
    for (let i = 0; i < numeros.length; i++) {
        total += numeros[i];
    }
    return total;
}

function punto4(numeros) {
    if (numeros.length === 0) return [];
    
    let minimo = numeros[0];
    let maximo = numeros[0];

    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] < minimo) {
            minimo = numeros[i];
        }
        if (numeros[i] > maximo) {
            maximo = numeros[i];
        }
    }

    let faltantes = [];
    for (let i = minimo; i <= maximo; i++) {
        let encontrado = false;
        for (let j = 0; j < numeros.length; j++) {
            if (numeros[j] === i) {
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            faltantes.push(i);
        }
    }
    return faltantes;
}

