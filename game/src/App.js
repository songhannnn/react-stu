import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

export default function Game() {
  // 记录点击次数
  const [countVal, setCountVal] = useState(1);
  // 记录历史状态
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const currentSquare = history[history.length - 1];

  function handlePlay(num, arr) {
    setHistory([...history, arr])
    setCountVal(num);
  }

  function jumpTo() {

  }

  const moves = history.map((square, move) => {
    let des;
    if (move > 0) {
      des = 'Go to move' + move
    }
    else {
      des = 'Game start'
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{des}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board count={countVal} squares={currentSquare} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function Board({ count, squares, onPlay }) {
  // 显示游戏状态
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner is ' + winner;
  }
  else {
    status = 'Next player: ' + (count % 2 == 0 ? 'O' : 'X');
  }

  function handleClik(i) {
    if (squares[i] || calculateWinner(squares)) return

    const nextSquare = squares.map(e => e);

    if (count % 2 == 0) {
      nextSquare[i] = 'O';
    }
    else {
      nextSquare[i] = 'X'
    }
    let c = count + 1;
    onPlay(c, nextSquare);
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClik(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClik(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClik(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClik(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClik(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClik(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClik(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClik(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClik(8)} />
      </div>
    </>

  )
}
// 计算赢家
function calculateWinner(square) {
  let line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  for (let i = 0; i < line.length; i++) {
    const [a, b, c] = line[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}