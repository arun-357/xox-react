import { useState } from "react"
import Player from "../components/Player"
import GameBoard from "../components/GameBoard"
import Log from "../components/Logs"
import { WINNING_COMBINATIONS } from "../constants/winnning"
import GameOver from "../components/GameOver"

const intialGameBoard = [[null, null, null], [null, null, null], [null, null, null]]

function deriveActivePlayer(gameTurns) {
  let current = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') current= 'O';
  return current;
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = [...intialGameBoard.map(arr => [...arr])];
  for (const turn of gameTurns) {
        const {square, player} = turn;
        const {rowIndex, colIndex} = square;
        gameBoard[rowIndex][colIndex] = player;
  }

  let winner;

  for (const winning of WINNING_COMBINATIONS) {
    const first = gameBoard[winning[0].row][winning[0].column];
    const second = gameBoard[winning[1].row][winning[1].column];
    const third = gameBoard[winning[2].row][winning[2].column];

    if(first && first === second && first === third) winner = first;
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare (rowIndex, colIndex) {
    // setActivePlayer((cAP) => cAP === 'X' ? 'O':'X')
    setGameTurns((prevTurns) => {
      let current = deriveActivePlayer(prevTurns);
      const updateTurns = [{square: {rowIndex, colIndex}, player: current}, ...prevTurns]
      return updateTurns;
    })
  }

  function rematch() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'}></Player>
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={rematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
