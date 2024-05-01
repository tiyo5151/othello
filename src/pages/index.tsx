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
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const countstones = (target: number): number => {
    let count = 0;
    for (const row of board) {
      count += row.filter((cell) => cell === target).length;
    }
    return count;
  };

  const count1 = countstones(1);
  const count2 = countstones(2);

  const Can_set = (x: number, y: number): boolean => {
    // console.log(`Checking if move is valid at (${x}, ${y})`);  //ok

    if (board[y][x] !== 0 && board[y][x] !== 3) {
      // console.log(`Invalid move: Cell at (${x}, ${y}) is not empty or not a valid option`);  //ok
      return false;
    }

    let canFlip = false;
    for (const [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;
      const checktoFlip = []; // 裏返す石を一時的に保存する配列

      while (
        nx >= 0 &&
        nx < 8 &&
        ny >= 0 &&
        ny < 8 &&
        board[ny][nx] === (turnColor === 1 ? 2 : 1)
      ) {
        checktoFlip.push([nx, ny]); // 相手の石の座標をtoFlipに追加
        nx += dx;
        ny += dy;
      }

      if (
        nx >= 0 &&
        nx < 8 &&
        ny >= 0 &&
        ny < 8 &&
        board[ny][nx] === turnColor &&
        checktoFlip.length > 0
      ) {
        canFlip = true; // 石を裏返すことができる
      } else;
    }
    return canFlip;
  };
  const clickHandler = (x: number, y: number) => {
    if (!Can_set(x, y)) return;

    const newBoard = structuredClone(board);
    newBoard[y][x] = turnColor;

    for (const [dx, dy] of directions) {
      //dは方向
      let step1 = 1;
      let canFlip = false;
      while (true) {
        const nx = x + step1 * dx;
        const ny = y + step1 * dy; //nは距離
        if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8 || board[ny][nx] === 0) {
          break;
        }
        if (board[ny][nx] === 3 - turnColor) {
          canFlip = true;
          step1++;
        } else if (board[ny][nx] === turnColor && step1 > 1) {
          for (let i = 1; i < step1; i++) {
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
    console.log(ShowCan_set(newBoard));
    setBoard(ShowCan_set(newBoard));
    setTurnColor(3 - turnColor);
  };

  const ShowCan_set = (board) => {
    const newBoard = structuredClone(board);
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (newBoard[y][x] === 0 || newBoard[y][x] === 3) {
          newBoard[y][x] = Can_set(x, y) ? 3 : 0;
        }
      }
    }
    return newBoard;
  };

  // const reset = (board) => {

  // }

  const position = (turnColor: number): React.ReactNode => {
    return turnColor === 1 ? <span>あなた</span> : <span>あいて</span>;
  };

  return (
    <div className={styles.container}>
      <div>
        <b>{position(turnColor)}の番です</b>
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div
              className={`${styles.cell} ${Can_set(x, y) ? styles.validMove : ''}`}
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
        <div>
          <b>黒の数： {count1}</b>
          <b>|</b>
          <b>白の数： {count2}</b>
        </div>
      </div>
    </div>
  );
};

export default Home;
