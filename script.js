const X = -1; // represent  player 
const O = 1; // represent agent
const EMPTY = 0;
let state = emptyState(); 
let round = 0;
let filledBoxs = new Set()  
let isGameFinished = false;

agentMinimax()

// put x or o
function play(id) {
    id = parseInt(id) // to store in set

    // box already filled
    if (filledBoxs.has(id) || isGameFinished || round % 2 == 0) {
        return;
    }
    // player players move
    state[id] = X; 
    filledBoxs.add(id)
    draw(id, X);
    round++;

    // check is game over
    let winner = check(state);
    // finish game if there is winner
    if (winner != null) 
        finishGame(winner)


    if (isGameFinished)
        return;

    // minimax agent plays
    agentMinimax()

    if (round == 9 && !isGameFinished) {
        isGameFinished = true;
        display("Draw")
    }

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
            return O;
        if (sum == -3)
            return X;
    }
    // check column
    for (let i = 0; i < 3; i++) {
        let sum = state[0 + i] + state[3 + i] + state[6 + i];
        if (sum == 3)
            return O;
        if (sum == -3)
            return X;
    }
    // check diagonals
    let diagonal1 =  state[0] + state[4] + state[8];  
    if (diagonal1 == 3)
        return O;
    if (diagonal1 == -3)
        return X;

    let diagonal2 =  state[2] + state[4] + state[6];  
    if (diagonal2 == 3)
        return O;
    if (diagonal2 == -3)
        return X;
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

    // agent start other play
    agentMinimax()
    
}

function emptyState() {
    let state = []
    for (let i = 0; i < 9; i++)
        state.push(0)
    return state; 
}

// find all empty spots
function getValidMoves(state) {
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

/****************random*******************/
// select move randomly
function agentRandom() {
    let validMoves = getValidMoves(state);
    let id = validMoves[Math.floor(Math.random() * validMoves.length)]
    state[id] = O; 
    filledBoxs.add(id)
    round++;
    // player plays
    setTimeout(function() {
        draw(id, O);
    }, 400)
}
/******************************************/



/*******************minimax****************/

//minimax agent
function agentMinimax() {
    let moves = getValidMoves(state);
    // play for computer to see scores
    let scores = []; 
    for (let i = 0; i < moves.length; i++) {
        let originalState = [...state]
        state[moves[i]] = O;
        let score = minimax(state, false, 1);
        scores.push(score);
        state = originalState;
    }
    let id = moves[bestScoreIndex(scores)]   
    state[id] = O 
    filledBoxs.add(id)
    round++;
    setTimeout(function() {
        draw(id, O);
    }, 400)
}


// minimax algorithm: return best score of given state
function minimax(futureState, isMax, depth) {
    // check for winner 
    let result = check(futureState)
    if (result != null)
        return result / depth;
    // check is game ended
    if (isDraw(futureState)) { 
        return 0;
    }
    // inital score
    let score = -Infinity;
    if (!isMax) {
        score = Infinity;
    }
    let futureMoves = getValidMoves(futureState);
    for (let i = 0; i < futureMoves.length; i++) {
        let originalState = [...futureState]
        if (isMax) {
            futureState[futureMoves[i]] = O;
            score = Math.max(score, minimax(futureState, !isMax, depth + 1)); 
        }
        else {
            futureState[futureMoves[i]] = X;
            score = Math.min(score, minimax(futureState, !isMax, depth + 1)); 
        }
        futureState = originalState;
    }
    return score / depth;
}


// return one of the max element index
function bestScoreIndex(scores) {
    let bestScore = getBestScore(scores);
    let optimalIndexes = [];
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] == bestScore) {
            optimalIndexes.push(i)
        }
    }
    return optimalIndexes[Math.floor(Math.random() * optimalIndexes.length)];
}

// find best score
function getBestScore(scores) {
    let max = scores[0];
    for (let i = 1; i < scores.length; i++) 
        max = Math.max(max, scores[i]);
    return max;
}

// return if game is drawn
function isDraw(state) {
    let count = 0;
    for (let i = 0; i < state.length; i++) {
        if (state[i] == 0)
            count++;
    }
    return count == 0;
}
/******************************************/
