const X = "X";
const O = "O";
let round = 0;
const clickedBoxs = new Set()  

// put x or o
function play(id) {
    // played box
    if (clickedBoxs.has(id)) {
        return;
    }
    element = document.getElementById(id);
    if (round % 2 == 0) {
        element.innerHTML = X 
    }
    else {
        element.innerHTML = O 
    }
    clickedBoxs.add(id)
    round++;
}
