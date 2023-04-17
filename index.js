class ThreeBoard {
  constructor(board, depth, isMaximizing) {
    this.board = board;
    this.depth = depth;
    this.isMaximizing = isMaximizing;
  }

  #checkWinner(board) {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === "X" && board[i][1] === "X" && board[i][2] === "X") {
        return "X";
      }
      if (board[i][0] === "O" && board[i][1] === "O" && board[i][2] === "O") {
        return "O";
      }
    }
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === "X" && board[1][i] === "X" && board[2][i] === "X") {
        return "X";
      }
      if (board[0][i] === "O" && board[1][i] === "O" && board[2][i] === "O") {
        return "O";
      }
    }
    if (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") {
      return "X";
    }
    if (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") {
      return "O";
    }
    if (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X") {
      return "X";
    }
    if (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O") {
      return "O";
    }
    return "";
  }

  // 评价函数
  #evaluate(board) {
    // 检查是否有人赢了
    const winner = this.#checkWinner(board);
    if (winner === "X") {
      return Infinity;
    }

    if (winner === "O") {
      return -Infinity;
    }

    // 将空白格子填上X
    const xBoard = board.map((row) => {
      return row.map((item) => {
        if (item === " ") {
          return "X";
        }
        return item;
      });
    });

    // 将空白格子填上O
    const oBoard = board.map((row) => {
      return row.map((item) => {
        if (item === " ") {
          return "O";
        }
        return item;
      });
    });

    // 检查X的数量
    let xCount = 0;
    // 检查O的数量
    let oCount = 0;

    // 行
    for (let i = 0; i < 3; i++) {
      if (
        xBoard[i][0] === "X" &&
        xBoard[i][1] === "X" &&
        xBoard[i][2] === "X"
      ) {
        xCount++;
      }
      if (
        oBoard[i][0] === "O" &&
        oBoard[i][1] === "O" &&
        oBoard[i][2] === "O"
      ) {
        oCount++;
      }
    }
    // 列
    for (let i = 0; i < 3; i++) {
      if (
        xBoard[0][i] === "X" &&
        xBoard[1][i] === "X" &&
        xBoard[2][i] === "X"
      ) {
        xCount++;
      }
      if (
        oBoard[0][i] === "O" &&
        oBoard[1][i] === "O" &&
        oBoard[2][i] === "O"
      ) {
        oCount++;
      }
    }
    // 对角线
    if (xBoard[0][0] === "X" && xBoard[1][1] === "X" && xBoard[2][2] === "X") {
      xCount++;
    }
    if (oBoard[0][0] === "O" && oBoard[1][1] === "O" && oBoard[2][2] === "O") {
      oCount++;
    }
    if (xBoard[0][2] === "X" && xBoard[1][1] === "X" && xBoard[2][0] === "X") {
      xCount++;
    }
    if (oBoard[0][2] === "O" && oBoard[1][1] === "O" && oBoard[2][0] === "O") {
      oCount++;
    }
    return xCount - oCount;
  }
  // 极大极小值
  #minMax(board, depth, isMaximizing) {
    let bestPosition = { x: -1, y: -1 };
    if (depth === 0 || this.#checkWinner(board)) {
      return { bestScore: this.#evaluate(board), bestPosition };
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
          if (board[i][j] === " ") {
            board[i][j] = "X";
            let score = this.#minMax(board, depth - 1, false).bestScore;
            board[i][j] = " ";
            bestScore = Math.max(score, bestScore);
            if (bestScore === score) {
              bestPosition.x = i;
              bestPosition.y = j;
            }
          }
        }
      }
      return { bestScore, bestPosition: bestPosition };
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
          if (board[i][j] === " ") {
            board[i][j] = "O";
            let score = this.#minMax(board, depth - 1, true).bestScore;
            board[i][j] = " ";
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return { bestScore, bestPosition };
    }
  }
  printBoard() {
    console.log(this.board[0].join(" | "));
    console.log(this.board[1].join(" | "));
    console.log(this.board[2].join(" | "));
  }

  nextMove() {
    const bestPosition = this.#minMax(
      this.board,
      this.depth,
      this.isMaximizing
    ).bestPosition;
    this.board[bestPosition.x][bestPosition.y] = "X";
  }
}
const board = [
  ["O", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
const threeBoard = new ThreeBoard(board, 9, true);

threeBoard.printBoard();
threeBoard.nextMove();
console.log("--------------");
threeBoard.printBoard();
