const X = 1; 
const O = -1;
let round = 0;
let clickedBoxs = new Set()  
let isGameFinished = false;
const state = []

// put x or o
function play(id) {
    // played box
    if (clickedBoxs.has(id) || isGameFinished) {
        return;
    }
    let index = getIndex(id)
    element = document.getElementById(id);
    if (round % 2 == 0) {
        element.innerHTML = 'X' 
        state[index] = X
    }
    else {
        element.innerHTML = 'O' 
        state[index] = O
    }
    // check is game over
    const result  = check();
    if (result == X) {
        isGameFinished = true;
        setTimeout(function() {
            alert("X won")
        }, 0)
    }
    else if (result == O) {
        isGameFinished = true;
        setTimeout(function() {
            alert("O won")
        }, 0)
    }
    clickedBoxs.add(id)
    round++;
}

// extract box index 
function getIndex(id) {
    return parseInt(id.charAt(id.length - 1)) - 1;
}

// return winner if game is finished
function check() {
    //check row
    for (let i = 0; i < 3; i++) {
        let sum = state[0 + (i * 3)] + state[1 + (i * 3)] + state[2 + (i * 3)];
        if (sum == 3)
            return X;
        if (sum == -3)
            return O;
    }
    // check column
    for (let i = 0; i < 3; i++) {
        let sum = state[0 + i] + state[3 + i] + state[6 + i];
        if (sum == 3)
            return X;
        if (sum == -3)
            return O;
    }
    // check diagonals
    let diagonal1 =  state[0] + state[4] + state[8];  
    if (diagonal1 == 3)
        return X;
    if (diagonal1 == -3)
        return O;

    let diagonal2 =  state[2] + state[4] + state[6];  
    if (diagonal2 == 3)
        return X;
    if (diagonal2 == -3)
        return O;
}

// reset the game
function reset() {
    isGameFinished = false;
    // reset game array
    for (let i = 0; i < state.length; i++) {
            state[i] = 0;
    }
    // reset clicked boxes
    clickedBoxs = new Set()
    // reset ui
    for (let i = 0; i < 9; i++) {
        document.getElementById("game-box" + (i + 1)).innerHTML = null; 
    }
    
}
