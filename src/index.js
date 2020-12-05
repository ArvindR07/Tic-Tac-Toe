import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./components/Board";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isDrawn(squares) {
  for (let i = 0; i < 9; i++) {
    if (squares[i] !== "X" && squares[i] !== "O") {
      return false;
    }
  }
  return true;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const current = this.state.squares.slice();
    const winner = calculateWinner(current);
    let status = null;
    if (winner) {
      status = "Winner: " + winner;
    } else if (isDrawn(current)) {
      status = "Game Drawn";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="title">TIC TAC TOE</div>
        <div className="game-info">
          <div className="status">{status}</div>
          <button
            className="button2"
            onClick={() => {
              const newSquares = Array(9).fill(null);
              this.setState({ squares: newSquares, xIsNext: true });
            }}
          >
            New Game
          </button>
        </div>
        <div className="game-board">
          <Board squares={current} onClick={(i) => this.handleClick(i)} />
        </div>
      </div>
    );
  }
}

// ============== THIS APP PARTLY IS TAKEN FROM REACTJS.ORG ====================

ReactDOM.render(<Game />, document.getElementById("root"));
