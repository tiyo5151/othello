import { useState, useEffect } from 'react';
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
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
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

  // const Can_set = (x: number, y: number): boolean => {
  //   // console.log(`Checking if move is valid at (${x}, ${y})`); //ok

  //   if (board[y][x] !== 0 || board[y][x] !== 3) {
  //     // console.log(`Invalid move: Cell at (${x}, ${y}) is not empty or not a valid option`);  //ok
  //     return false;
  //   }

  //   for (const [dx, dy] of directions) {
  //     let step1: number = 1;
  //     let betweenOpponent = false;
  //     while (0 < step1 && step1 < 8) {
  //       const nx = x + step1 * dx;
  //       const ny = y + step1 * dy;
  //       // const checktoFlip = []; // 裏返す石を一時的に保存

  //       if (board[ny][nx] === 3 - turnColor) {
  //         betweenOpponent = true;
  //       }
  //       if (board[ny][nx] === turnColor) {
  //         if (step1 > 1 && betweenOpponent) {
  //           return true;
  //         } else {
  //           break;
  //         }
  //       }

  //       step1++;
  //       // if (ny >= 0 && ny < 8 && nx >= 0 && nx < 8 && board[ny][nx] === 3 - turnColor) {
  //       //   step1++;
  //       // } else if (
  //       //   ny >= 0 &&
  //       //   ny < 8 &&
  //       //   nx >= 0 &&
  //       //   nx < 8 &&
  //       //   board[ny][nx] === turnColor &&
  //       //   step1 === 1
  //       // ) {
  //       //   break;
  //       // } else if (
  //       //   y >= 0 &&
  //       //   ny < 8 &&
  //       //   nx >= 0 &&
  //       //   nx < 8 &&
  //       //   board[ny][nx] === turnColor &&
  //       //   step1 > 1
  //       // ) {
  //       //   return true;
  //       // } else {
  //       //   break;
  //       // }
  //     }
  //   }
  //   return false;
  // };

  const Can_set = (x: number, y: number): boolean => {
    if (board[y][x] !== 0 && board[y][x] !== 3) {
      // console.log(`Cell (${x}, ${y}) is not empty or not a valid option`);
      return false;
    }

    let canSet = false;
    if (
      (y + 1 < 8 && x + 1 < 8 && board[y + 1][x + 1] === 3 - turnColor) ||
      (x + 1 < 8 && board[y][x + 1] === 3 - turnColor) ||
      (y - 1 >= 0 && x + 1 < 8 && board[y - 1][x + 1] === 3 - turnColor) ||
      (y + 1 < 8 && board[y + 1][x] === 3 - turnColor) ||
      (y - 1 >= 0 && board[y - 1][x] === 3 - turnColor) ||
      (y + 1 < 8 && x - 1 >= 0 && board[y + 1][x - 1] === 3 - turnColor) ||
      (x - 1 >= 0 && board[y][x - 1] === 3 - turnColor) ||
      (y - 1 >= 0 && x - 1 >= 0 && board[y - 1][x - 1] === 3 - turnColor)
    )
      for (const [dx, dy] of directions) {
        let step1 = 1;
        let hasOpponentBetween = false;
        while (0 < step1 && step1 < 8) {
          const nx = x + step1 * dx;
          const ny = y + step1 * dy;
          console.log(`cell: (${x}, ${y})`);

          if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8 || board[ny][nx] === 0) {
            console.log('Out of bounds or empty cell at', dx, dy);
            break;
          }

          if (board[ny][nx] === turnColor) {
            if (step1 > 1 && hasOpponentBetween) {
              // console.log(`Valid move found at (${x}, ${y})`);
              canSet = true;
            } else {
              break;
            }
          }

          if (board[ny][nx] === 3 - turnColor) {
            hasOpponentBetween = true;
          }

          step1++;
        }
      }

    return canSet;
  };

  // const ShowCan_set = (newBoard: number[][]) => {
  //   const NewnewBoard = structuredClone(newBoard);
  //   for (let y = 0; y < 8; y++) {
  //     for (let x = 0; x < 8; x++) {
  //       if (newBoard[y][x] === 0 || newBoard[y][x] === 3) {
  //         NewnewBoard[y][x] = Can_set(x, y) ? 3 : 0;
  //       }
  //     }
  //   }
  //   return NewnewBoard;
  // };

  const ShowCan_set = () => {
    // const newBoard = structuredClone(board);
    // for (let y = 0; y < 8; y++) {
    //   for (let x = 0; x < 8; x++) {
    //     if (newBoard[y][x] === 0 || newBoard[y][x] === 3) {
    //       newBoard[y][x] = Can_set(x, y) ? 3 : 0;
    //       console.log(`Updated cell (${x}, ${y}) to ${newBoard[y][x]}`);
    //     }
    //   }
    // }

    const newBoard = board.map((row) =>
      row.map((cell) => {
        return cell === 3 ? 0 : cell;
      }),
    );
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (
          newBoard[y][x] === 0 &&
          Can_set(x, y) &&
          ((y + 1 < 8 && x + 1 < 8 && board[y + 1][x + 1] === 3 - turnColor) ||
            (x + 1 < 8 && board[y][x + 1] === 3 - turnColor) ||
            (y - 1 >= 0 && x + 1 < 8 && board[y - 1][x + 1] === 3 - turnColor) ||
            (y + 1 < 8 && board[y + 1][x] === 3 - turnColor) ||
            (y - 1 >= 0 && board[y - 1][x] === 3 - turnColor) ||
            (y + 1 < 8 && x - 1 >= 0 && board[y + 1][x - 1] === 3 - turnColor) ||
            (x - 1 >= 0 && board[y][x - 1] === 3 - turnColor) ||
            (y - 1 >= 0 && x - 1 >= 0 && board[y - 1][x - 1] === 3 - turnColor))
        ) {
          newBoard[y][x] = 3;
        }
      }
    }

    setBoard(newBoard);
  };

  useEffect(() => {
    ShowCan_set();
  }, [turnColor]);
  // const clickHandler = (x: number, y: number) => {
  //   console.log(`Clicked cell: (${x}, ${y})`);

  //   if (!Can_set) {
  //     return;
  //   }

  //   const newBoard = structuredClone(board);

  //   for (const [dx, dy] of directions) {
  //     //dは方向
  //     let step2: number = 1;
  //     let canFlip = false;

  //     while (0 < step2 && step2 < 8) {
  //       const nx = x + step2 * dx;
  //       const ny = y + step2 * dy; //nは距離
  //       // if (ny < 0 || ny >= 8 || nx < 0 || nx >= 8) {
  //       //   break;
  //       // }
  //       if (ny >= 0 && ny < 8 && nx >= 0 && nx < 8 && board[ny][nx] === 3 - turnColor) {
  //         canFlip = true;
  //         step2++;
  //       } else if (
  //         ny >= 0 &&
  //         ny < 8 &&
  //         nx >= 0 &&
  //         nx < 8 &&
  //         board[ny][nx] === turnColor &&
  //         step2 === 1
  //       ) {
  //         break;
  //       } else if (
  //         ny >= 0 &&
  //         ny < 8 &&
  //         nx >= 0 &&
  //         nx < 8 &&
  //         board[ny][nx] === turnColor &&
  //         step2 > 1
  //       ) {
  //         for (let i = 1; i <= step2; i++) {
  //           newBoard[y + i * dy][x + i * dx] = turnColor;
  //         }
  //         break;
  //       } else {
  //         break;
  //       }
  //     }
  //     if (canFlip) {
  //       newBoard[y][x] = turnColor;
  //       setTurnColor(3 - turnColor);
  //     }
  //   }
  //   setBoard(newBoard);
  //   console.log(newBoard);
  // };

  const clickHandler = (x: number, y: number) => {
    // console.log(`Clicked cell: (${x}, ${y})`);

    if (!Can_set(x, y)) return;

    const newBoard = structuredClone(board);

    for (const [dx, dy] of directions) {
      let step2: number = 1;
      let canFlip = false;

      while (0 < step2 && step2 < 8) {
        const nx = x + step2 * dx;
        const ny = y + step2 * dy;

        if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8 || board[ny][nx] === 0) {
          break;
        }

        if (board[ny][nx] === 3 - turnColor) {
          canFlip = true;
          step2++;
        } else if (board[ny][nx] === turnColor && step2 > 1) {
          for (let i = 1; i < step2; i++) {
            newBoard[y + i * dy][x + i * dx] = turnColor;
          }
          break;
        } else {
          break;
        }
      }

      if (canFlip) {
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
      }
    }
    setBoard(newBoard);
    console.log(newBoard);
  };
  // console.log(turnColor);
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
