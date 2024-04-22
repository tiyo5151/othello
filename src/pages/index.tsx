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
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 0) return;

    const newBoard = [...board];
    newBoard[y][x] = turnColor;

    for (const [dx, dy] of directions) {
      let n = 1;
      const m = 0;
      let canFlip = false;
      while (true) {
        const nx = x + n * dx;
        const ny = y + n * dy;
        if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8 || board[ny][nx] === 0) {
          break;
        }
        if (board[ny][nx] === 3 - turnColor) {
          canFlip = true;
          n++;
        } else if (board[ny][nx] === turnColor && n > 1) {
          for (let i = 1; i < n; i++) {
            newBoard[y + i * dy][x + i * dx] = turnColor;
          }
          break;
        } else {
          break;
        }
      }
      if (canFlip) {
        newBoard[y][x] = turnColor;
      }
    }

    setBoard(newBoard);
    setTurnColor(3 - turnColor);
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
