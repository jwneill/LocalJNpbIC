import React from "react";
import { useState } from "react";

//export default keywords make this the main function in the file
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [message, setMessage] = useState("");
  const [playNum, setPlayNum] = useState(1);

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function OInCenter(i) {
    if (squares[0] == "X") {
      if (i == 8) {
        return true;
      } else {
        return false;
      }
    } else if (squares[8] == "X") {
      if (i == 0) {
        return true;
      } else {
        return false;
      }
    } else if (squares[2] == "X") {
      if (i == 6) {
        return true;
      } else {
        return false;
      }
    } else if (squares[6] == "X") {
      if (i == 2) {
        return true;
      } else {
        return false;
      }
    }
  }

  function OnotInCenter(i) {
    if (i == 0 || i == 2 || i == 6 || i == 8) {
      if (squares[0] == "X") {
        if (squares[1] != "O" && squares[3] != "O") {
          if (i == 2 || i == 6) {
            return true;
          } else {
            return false;
          }
        } else if (squares[1] != "O" && i == 2) {
          return true;
        } else if (squares[3] != "O" && i == 6) {
          return true;
        } else {
          return false;
        }
      }
      if (squares[2] == "X") {
        if (squares[1] != "O" && squares[5] != "O") {
          if (i == 0 || i == 8) {
            return true;
          } else {
            return false;
          }
        } else if (squares[1] != "O" && i == 0) {
          return true;
        } else if (squares[5] != "O" && i == 8) {
          return true;
        } else {
          return false;
        }
      }
      if (squares[6] == "X") {
        if (squares[3] != "O" && squares[7] != "O") {
          if (i == 0 || i == 8) {
            return true;
          } else {
            return false;
          }
        } else if (squares[3] != "O" && i == 0) {
          return true;
        } else if (squares[7] != "O" && i == 8) {
          return true;
        } else {
          return false;
        }
      }
      if (squares[8] == "X") {
        if (squares[5] != "O" && squares[7] != "O") {
          if (i == 2 || i == 6) {
            return true;
          } else {
            return false;
          }
        } else if (squares[5] != "O" && i == 2) {
          return true;
        } else if (squares[7] != "O" && i == 6) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  function checkOindex(i) {
    if (squares[4] == "O") {
      return OInCenter(i);
    } else {
      return OnotInCenter(i);
    }
  }

  function checkXindex(i) {
    if (playNum == 1) {
      if (i == 0 || i == 2 || i == 6 || i == 8) {
        return true;
      } else {
        return false;
      }
    }

    if (playNum == 2) {
      return checkOindex(i);
    }

    return true;
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    if (squares[i]) {
      return;
    }

    if (xIsNext) {
      if (playNum == 1 || playNum == 2) {
        let doMove = checkXindex(i);

        if (!doMove) {
          setMessage("Not a good choice!");
          return;
        }
      }
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      var temp = playNum + 1;
      setPlayNum(temp);
      nextSquares[i] = "X";
      setMessage("Good choice!");
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <Messenger message={message} />
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
//function from 9/13 in class notes
function Messenger({ message }) {
  return <p>{message}</p>;
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// WEBPACK FOOTER //
// ./src/App.js
