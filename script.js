const X = -1; // represent  player 
const O = 1; // represent agent
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
    // draw players move
    state[id] = X; 
    filledBoxs.add(id)
    draw(id, X);
    round++;

    // check is game over
    let winner = check(state);
    // finish game if there is winner
    if (winner != null) 
        finishGame(winner)

    if (round == 9 && !isGameFinished) {
        isGameFinished = true;
        display("Draw")
    }

    if (isGameFinished)
        return;

    // minimax agent plays
    agentRandom()

    // check is game over 
    winner = check(state)

    // finish game if there is winner
    if (winner != null) 
        finishGame(winner)
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
function check(state) {
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
    // no winner
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

// find all empty spots
function getValidMoves() {
    let moves = []
    for (let i = 0; i < state.length; i++) {
        if (state[i] == EMPTY)
            moves.push(i)
    }
    return moves;
}

// draw move to ui 
function draw(id, player) {
    let element = document.getElementById(id);
    // player plays
    let sign;
    if (player == -1) 
        sign = 'X';
    else
        sign = 'O';
    element.innerHTML = sign; 
    // update datas
}

// random player agent
function agentRandom() {
    let validMoves = getValidMoves();
    let id = validMoves[Math.floor(Math.random() * validMoves.length)]
    // player plays
    setTimeout(function() {
        draw(id, O);
        round++;
    }, 400)
}



// minimax agent
function agentMinimax() {
    let moves = getValidMoves();
    let scores = calcScores(moves);
    let id = moves[bestScoreIndex(scores)] 
    state[id] = O 
    filledBoxs.add(id)
    setTimeout(function() {
        draw(id, O);
        round++;
    }, 400)
}

// return score of each possible move 
function calcScores(moves) {
    scores = []
    for (let i = 0; i < moves; i++) {
        let originalState = [...state]
        state[moves[i]] = O;
        scores.push(minimax(state, 0, true, 0));
        state = originalState;
    }
    return scores;
}

// return max element index
function bestScoreIndex(scores) {
    let maxIndex = 0;
    let maxValue = scores[0];
    for (let i = 1; i < scores.length; i++) {
        if (scores[i] > maxValue) {
            maxIndex = i;
            maxValue = scores[i];
        }
    }
    return maxIndex;
}


// minimax algorithm
/*
function minimax(tempState, score, isMax, depth) {
    // base cases
    if (depth == 4 || check(tempState) != null)
        return score;
    score += getScore(state)
    if (isMax)
        return  
}
*/

/* Points:
 * winning -> 1
 * losing -> -1
 * drawing -> 0
 */
function getScore(state) {
    let score = check(state)
    // game doesn't end
    if (score == null)
        score = 0;
    return score;
}


