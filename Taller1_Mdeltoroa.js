function convertidorTemp(c){
    return  c * 9/5 + 32;
}

function Resolvedor(a, b , c, positive){
    
    if (positive){
        return (-b + ((b**2)-4*a*c)**(1/2))/ 2*a
    }
    else {
        return (-b - ((b**2)-4*a*c)**(1/2))/ 2*a
    }
    
}


function mejorparidad (n){
    if (n % 2 === 0 ){
        return console.log("es par")
    } 
    else {
            return console.log("es impar")  
    }
}

function peorparidad (n){

    if (n === 0 ) {
        return console.log("es par")
    }

    if (n === 1 ) {
        return console.log("es impar")
    }
    
    if (n === 2 ) {
        return console.log("es par")
    }

    if (n === 3 ) {
        return console.log("es impar")
    }

    if (n === 4 ) {
        return console.log("es par")
    }

    if (n === 5 ) {
        return console.log("es impar")
    }

    if (n === 6 ) {
        return console.log("es par")
    }

    if (n === 7 ) {
        return console.log("es impar")
    }

    if (n === 8 ) {
        return console.log("es par")
    }

    if (n === 9 ) {
        return console.log("es impar")
    }

    if (n === 10 ) {
        return console.log("es impar")
    }

    if (n > 10 ) {
        return console.log("usted dijo hasta 10 -.-  .....")
    }

    
}