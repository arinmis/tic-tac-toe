const X = 1; // represent  player 
const O = -1; // represent agent
const EMPTY = 0;
const state = emptyState(); 
let round = 0;
let filledBoxs = new Set()  
let isGameFinished = false;

// put x or o
function play(id) {
    id = parseInt(id) // to store in set

    // box already filled
    if (filledBoxs.has(id) || isGameFinished || round % 2 == 1) {
        return;
    }

    let element = document.getElementById(id);

    // player plays
    element.innerHTML = 'X' 
    state[id] = X 
    filledBoxs.add(id)
    round++;


    // check is game over
    let winner = check();
    // finish game if there is winner
    if (winner != null) 
        finishGame(winner)

    if (round == 9 && !isGameFinished) {
        isGameFinished = true;
        display("Draw")
    }

    if (isGameFinished)
        return;

    // agent plays
    agent()

    // check is game over
    winner = check();
    // finish game if there is winner
    if (winner != null) 
        finishGame(winner)

    console.log(filledBoxs)

    // draw

}

// finish game and display winner
function finishGame(winner) {
    isGameFinished = true;
    let message;
    if (winner == X) 
        message = "X won"
    else if (winner == O)
        message = "O won" 
    display(message)

}

// display pop-up message 
function display(message) {
    setTimeout(function() {
        alert(message)
    }, 500)
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
    return null;
}

// reset the game
function reset() {
    // resest game parameters
    isGameFinished = false;
    round = 0;
    // reset game array
    for (let i = 0; i < state.length; i++) {
            state[i] = 0;
    }
    // reset clicked boxes
    filledBoxs = new Set()
    // reset ui
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).innerHTML = null; 
    }
    
}

function emptyState() {
    let state = []
    for (let i = 0; i < 9; i++)
        state.push(0)
    return state; 
}

// random player agent
function agent() {
    let validMoves = getValidMoves();
    let id = validMoves[Math.floor(Math.random() * validMoves.length)]
    element = document.getElementById(id);
    // player plays
    setTimeout(function() {
        element.innerHTML = 'O' 
        round++;
    }, 400)
    state[id] = O
    filledBoxs.add(id)
}

// find all empty spots
function getValidMoves() {
    let moves = []
    for (let i = 0; i < state.length; i++) {
        if (state[i] == EMPTY)
            moves.push(i)
    }
    console.log(moves)
    return moves;
}
