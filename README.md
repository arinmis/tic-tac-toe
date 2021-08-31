# Tic Tac Toe 
This is an implementation of 'tic-tac-toe' game with javascript.
Agent of the game play it's moves with minimax algorithm.

## Main Logic Behind The Minimax Algorithm

Minimax is recusive algorithm which searches for best score for given game. In tic-tac-toe there are 3 position that ends the game: Win, Tie, Loss.
In order to find best move, those 3 ending scenario should be mapped with numbers:
  
    Win  ->  1
    Tie  ->  0
    Loss -> -1

Minimax keeps searching until one of the game ending scenario is found. After that it selects move option that maximize or minimaze it's score considering who has the turn. That is why algorithm is called 'minimax'.
  

1. Algorithm finds all possible options. In each depth it eighter maximize(to select maximum score) or minimize(to select minimum score) the score. Because main pupouse of algorithm is finding best move, it starts with maximizing, and switches with minimazing, and again maximazing and so forth. In other words, if algorithm will move it maximize else it minimize. In scenario down below, since there are only one option in last depth, all the scores will directly pass to up.
![depth-3](https://user-images.githubusercontent.com/56651041/131475596-69f28772-a661-4957-b819-485040d743a5.png)
2. Algorithm will select worst option for itself in this depth so that maximize opponents moves.
![depth-2 ](https://user-images.githubusercontent.com/56651041/131475602-f5aa726e-de5a-41cc-8363-8239595b7248.png)
3. In last step, algorithm choose which move it will play. To do that, it just selects best score available.
![depth-1](https://user-images.githubusercontent.com/56651041/131475601-04c05035-861f-4649-b8fd-d988aafa83a7.png)
4. End of the searching, it decides to choose left and win the game.



### Resourses

