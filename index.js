// Get the 9 cells into an array so it is easier to work with
const cell = [
  document.getElementById("11"),
  document.getElementById("12"),
  document.getElementById("13"),
  document.getElementById("21"),
  document.getElementById("22"),
  document.getElementById("23"),
  document.getElementById("31"),
  document.getElementById("32"),
  document.getElementById("33"),
];

// Get the element for updating the current turn
// X starts the game with turn 0
const turn = { number: 0 };
const score = { scoreX: 0, score0: 0 };

function resetBoard(turn) {
  turn.number = 0;
  cell.forEach((cell) => (cell.innerHTML = ""));
  cell.forEach((cell) => cell.addEventListener("click", onCellClickEvent));

  document.getElementById("winner").innerHTML =
    'It\'s <span id="currentTurn">X</span> turn';
}

function checkWinner(turn) {
  // return false for not yet decided
  // return true for the current turn winner
  if (turn < 3) return false;

  const current = turn % 2 == 0 ? "X" : "O";

  // check rows
  if (
    cell[0].innerHTML == current &&
    cell[0].innerHTML == cell[1].innerHTML &&
    cell[0].innerHTML == cell[2].innerHTML
  ) {
    // draw first row
    return true;
  }

  if (
    cell[3].innerHTML == current &&
    cell[3].innerHTML == cell[4].innerHTML &&
    cell[3].innerHTML == cell[5].innerHTML
  ) {
    // draw second row
    return true;
  }

  if (
    cell[6].innerHTML == current &&
    cell[6].innerHTML == cell[7].innerHTML &&
    cell[6].innerHTML == cell[8].innerHTML
  ) {
    // draw third row
    return true;
  }

  // check columns
  if (
    cell[0].innerHTML == current &&
    cell[0].innerHTML == cell[3].innerHTML &&
    cell[0].innerHTML == cell[6].innerHTML
  ) {
    //1 row
    return true;
  }
  if (
    cell[1].innerHTML == current &&
    cell[1].innerHTML == cell[4].innerHTML &&
    cell[1].innerHTML == cell[7].innerHTML
  ) {
    //2 row
    return true;
  }

  if (
    cell[2].innerHTML == current &&
    cell[2].innerHTML == cell[5].innerHTML &&
    cell[2].innerHTML == cell[8].innerHTML
  ) {
    // 3 row
    return true;
  }

  // check diagonals
  if (
    cell[0].innerHTML == current &&
    cell[0].innerHTML == cell[4].innerHTML &&
    cell[0].innerHTML == cell[8].innerHTML
  ) {
    // main
    return true;
  }

  if (
    cell[2].innerHTML == current &&
    cell[2].innerHTML == cell[4].innerHTML &&
    cell[2].innerHTML == cell[6].innerHTML
  ) {
    // second diag
    return true;
  }
}

function waitResetInput(turn) {
  cell.forEach((cell) => cell.removeEventListener("click", onCellClickEvent));
  document.addEventListener(
    "click",
    function (e) {
      resetBoard(turn);
    },
    { once: true }
  );
}

function setScore(winner) {
  if (winner == "X") {
    score.scoreX++;
    document.getElementById("scoreX").innerHTML = score.scoreX;
  } else {
    score.score0++;
    document.getElementById("score0").innerHTML = score.score0;
  }
}

const onCellClickEvent = function (e) {
  onCellClick(this, turn, score);
  e.stopPropagation();
};

function onCellClick(element, turn, score) {
  // assert we start from turn number 0, and X goes first

  // checking if the box is already taken
  if (element.innerHTML) return;
  const current = turn.number % 2 == 0 ? "X" : "O";
  const other = turn.number % 2 != 0 ? "X" : "O";
  const currentTurn = document.getElementById("currentTurn");

  element.innerHTML = current;
  const isWinner = checkWinner(turn.number, score);

  if (isWinner) {
    // Update message
    document.getElementById("winner").innerHTML =
      "Winner is " + current + ". Click anywhere to restart";

    // Set score for the winner (the current turn)
    setScore(current);

    // Freeze the board and wait for reset click
    waitResetInput(turn);
  }

  if (turn >= 8) {
    // Update message
    document.getElementById("winner").innerHTML = "It's a draw :((";
    waitResetInput(turn);
  }

  turn.number++;
  currentTurn.innerHTML = other;
}

resetBoard(turn);
