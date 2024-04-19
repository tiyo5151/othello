import { useState } from 'react';
import styles from './index.module.css';

const directions = [
  [1,0],
  [1,1],
  [0,1],
  [1,-1],
  [-1,0],
  [-1,-1],
  [0,-1],
  [-1,1],
]



const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
for (const direction of directions)
  while (turnColor !== 0,undefined)
  if (setTurnColor === 1)
    if (turnColor === 1){break;}
  }else{
    if (turnColor === 2){break;}
      if ()




    const newBoard = structuredClone(board);
    if (board[y + 1][x] !== undefined && board[y + 1][x] === 3 - turnColor) {
      setTurnColor(3 - turnColor);
    }

    newBoard[y][x] = turnColor;
    setTurnColor(3 - turnColor);

    newBoard[y][x] = turnColor;

    setTurnColor(turnColor === 1 ? 2 : 1);
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
