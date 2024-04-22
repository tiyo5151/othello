import { useState } from 'react';
import styles from './index.module.css';

const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [1, -1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [-1, 1],
];

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 1, 2, 0],
    [0, 0, 0, 0, 2, 1, 2, 0],
    [0, 0, 0, 1, 2, 1, 2, 0],
    [0, 0, 2, 1, 2, 1, 2, 0],
    [0, 1, 2, 1, 2, 1, 2, 0],
    [2, 1, 2, 1, 2, 1, 2, 0],
    [1, 2, 1, 2, 1, 2, 1, 0],
  ]);

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    let n = 0;
    let m = 0;
    if (board[y][x] !== 0) return;
    const newBoard = structuredClone(board);
    while (n < 6) {
      n = n + 1;
      if (board[y + n][x] !== undefined && board[y + n][x] === 3 - turnColor) {
        if (
          board[y + n + 1][x] !== undefined &&
          board[y + n + 1][x] === turnColor &&
          board[y + 1][x] !== 0
        ) {
          newBoard[y][x] = turnColor;
          while (n + 1 > m) {
            newBoard[y + m][x] = turnColor;
            setTurnColor(3 - turnColor);
            if (board[y + m + 1][x] === turnColor) {
              break;
            }
            m = m + 1;
          }
        }
      }
    }
    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};
export default Home;
