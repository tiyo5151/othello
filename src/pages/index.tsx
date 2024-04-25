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
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const isValidMove = (x: number, y: number): boolean => {
    if (board[y][x] !== 0 && board[y][x] !== 3) return false;

    for (const [dx, dy] of directions) {
      let n = 1;
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
          return true;
        } else {
          break;
        }
      }
      if (canFlip) {
        return true;
      }
    }

    return false;
  };

  const clickHandler = (x: number, y: number) => {
    if (!isValidMove(x, y)) return;

    const newBoard = [...board];
    newBoard[y][x] = turnColor;

    for (const [dx, dy] of directions) {
      //dは方向
      let n = 1;
      let canFlip = false;
      while (true) {
        const nx = x + n * dx;
        const ny = y + n * dy; //nは距離
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

  // const get_put_place = (x: number,y: number) boolean => {
  //if (!isValidMove) return false;
  //for (const[dx,dy] of directions);

  // };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div
              className={`${styles.cell} ${isValidMove(x, y) ? styles.validMove : ''}`}
              key={`${x}-${y}`}
              onClick={() => clickHandler(x, y)}
            >
              {color !== 0 && color !== 3 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
              {color === 3 && <div className={styles.option} style={{ background: '#00ffff' }} />}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
