const X = 1; 
const O = -1;
let round = 0;
let clickedBoxs = new Set()  
const gameArray = [[], [], []] 

// put x or o
function play(id) {
    // played box
    if (clickedBoxs.has(id)) {
        return;
    }
    let index = getIndex(whichBox(id))
    element = document.getElementById(id);
    if (round % 2 == 0) {
        element.innerHTML = 'X' 
        gameArray[index[0]][index[1]] = X
    }
    else {
        element.innerHTML = 'O' 
        gameArray[index[0]][index[1]] = O
    }
    // check is game over
    const result  = check();
    if (result == X) {
        setTimeout(function() {
            alert("X won")
        }, 0)
    }
    else if (result == O) {
        setTimeout(function() {
            alert("O won")
        }, 0)
    }
    clickedBoxs.add(id)
    round++;
}


// extract box number
function whichBox(id) {
    return parseInt(id.charAt(id.length - 1))
}

// convert box number to index
function getIndex(number) {
    number--; // zero index
    let row = parseInt(number / 3);
    let column = number % 3;
    return [row, column] 
}

// return winner if game is finished
function check() {
    //check row
    for (let i = 0; i < gameArray.length; i++) {
        let sum = gameArray[i][0] + gameArray[i][1] + gameArray[i][2];
        if (sum == 3)
            return X;
        if (sum == -3)
            return O;
    }
    // check column
    for (let i = 0; i < gameArray.length; i++) {
        let sum = gameArray[0][i] + gameArray[1][i] + gameArray[2][i];
        if (sum == 3)
            return X;
        if (sum == -3)
            return O;
    }
    // check diagonals
    let diagonal1 =  gameArray[0][0] + gameArray[1][1] + gameArray[2][2];  
    if (diagonal1 == 3)
        return X;
    if (diagonal1 == -3)
        return O;

    let diagonal2 =  gameArray[0][2] + gameArray[1][1] + gameArray[2][0];  
    if (diagonal2 == 3)
        return X;
    if (diagonal2 == -3)
        return O;
}

// reset the game
function reset() {
    // reset game array
    for (let i = 0; i < gameArray.length; i++) {
        for (let j = 0; j < gameArray.length; j++) {
            gameArray[i][j] = 0;
        }
    }
    clickedBoxs = new Set()
    // reset ui
    for (let i = 0; i < 9; i++) {
        document.getElementById("game-box" + (i + 1)).innerHTML = null; 
    }
    // reset clicked boxes
}
