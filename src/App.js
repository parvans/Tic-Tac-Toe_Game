import { useState } from "react";
import "./styles.css";

function winnerCalc(states) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (states[a] && states[a] === states[b] && states[a] === states[c]) {
      return states[a];
    }
  }
  return null;
}

function nextPlayer(states) {
  return states.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

function playerStatus(winner, states, nextPlayers) {
  return winner
    ? `Winner: ${winner}`
    : states.every(Boolean)
    ? `Drow`
    : `Next player: ${nextPlayers}`;
}

export default function App() {
  const [states, setStates] = useState(Array(9).fill(null));

  const nextPlayers = nextPlayer(states);
  const winner = winnerCalc(states);
  const statuss = playerStatus(winner, states, nextPlayers);

  function selectState(state) {
    if (winner || states[state]) {
      return;
    }
    const statesCopy = [...states];
    statesCopy[state] = nextPlayers;
    setStates(statesCopy);
  }

  function restart() {
    setStates(Array(9).fill(null));
  }

  function rendersquare(id) {
    return (
      <button
        className="square"
        data-pro={states[id] ? states[id] : "+"}
        onClick={() => selectState(id)}
      >
        {states[id] ? states[id] : "+"}
      </button>
    );
  }

  //console.log("hi", state);
  return (
    <>
      <div className="game-board">
        <div className="grid-row">
          {rendersquare(0)}
          {rendersquare(1)}
          {rendersquare(2)}
        </div>
        <div className="grid-row">
          {rendersquare(3)}
          {rendersquare(4)}
          {rendersquare(5)}
        </div>
        <div className="grid-row">
          {rendersquare(6)}
          {rendersquare(7)}
          {rendersquare(8)}
        </div>
        <div>
          <p>
            <b>{statuss}</b>
          </p>

          <button onClick={restart}>Restart</button>
        </div>
      </div>
    </>
  );
}
