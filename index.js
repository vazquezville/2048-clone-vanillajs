document.addEventListener("DOMContentLoaded", () => {
  const gameDisplay = document.querySelector(".game");
  const scoreDisplay = document.querySelector("#score__points");
  const resultDisplay = document.querySelector("#result");

  //Numbers of columns
  const width = 4;
  //Save the generated squares into an array
  let squares = [];
  //Save the current total
  let score = 0;

  //Function that render the playing board
  function createGameBoard() {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;

      //Add to the game grid
      gameDisplay.appendChild(square);

      squares.push(square);
    }
    generateNumber();
    generateNumber();
  }

  createGameBoard();

  //Function that generates number 2 into a random position in the squares array
  function generateNumber() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      checkLoose();
    } else {
      generateNumber();
    }
  }

  //Function to move to the right
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      //Save the current row when we reach the first element of a row
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        //Get the numbers distinct from 0
        let filteredRow = row.filter((num) => num);

        //Crate an array with zeros which length is based on the row size minus the filtered numbers
        let miss = 4 - filteredRow.length;
        let zeros = Array(miss).fill(0);

        //Concat the arrays of zeros with the filtered array numbers (show numbers on the right)
        let newRow = zeros.concat(filteredRow);

        //Render the new orden into the game grid
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  //Function to move to the left
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      //Save the current row when we reach the first element of a row
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        //Get the numbers distinct from 0
        let filteredRow = row.filter((num) => num);

        //Crate an array with zeros which length is based on the row size minus the filtered numbers
        let miss = 4 - filteredRow.length;
        let zeros = Array(miss).fill(0);

        //Concat the arrays the filtered array numbers with the zeros (show numbers on the left)
        let newRow = filteredRow.concat(zeros);

        //Render the new orden into the game grid
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  //Function to move to the down
  function moveDown() {
    for (let i = 0; i < 4; i++) {
      //Save the current column
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + (width * 2)].innerHTML;
      let totalFour = squares[i + (width * 3)].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      //Get the numbers distinct from 0
      let filteredColumn = column.filter(num => num);

      //Crate an array with zeros which length is based on the row size minus the filtered numbers
      let miss = 4 - filteredColumn.length;
      let zeros = Array(miss).fill(0);

      //Concat the arrays the filtered array numbers with the zeros (show numbers on the left)
      let newColumn = zeros.concat(filteredColumn);

      //Render the new orden into the game grid
      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + (width * 2)].innerHTML = newColumn[2];
      squares[i + (width * 3)].innerHTML = newColumn[3];
    }
  }

  //Function to move to the up
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      //Save the current column
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + (width * 2)].innerHTML;
      let totalFour = squares[i + (width * 3)].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      //Get the numbers distinct from 0
      let filteredColumn = column.filter(num => num);

      //Crate an array with zeros which length is based on the row size minus the filtered numbers
      let miss = 4 - filteredColumn.length;
      let zeros = Array(miss).fill(0);

      //Concat the arrays the filtered array numbers with the zeros (show numbers on the left)
      let newColumn = filteredColumn.concat(zeros);

      //Render the new orden into the game grid
      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + (width * 2)].innerHTML = newColumn[2];
      squares[i + (width * 3)].innerHTML = newColumn[3];
    }
  }

  //Sum the value of the numbers when moving it left or right, they are the same equal value
  function combineRow() {
    for (let i = 0; i < 15; i++) {
      //If the value is deeply equal, sum and combine it into the array, and save the second space as 0
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;

        //Display the current score:
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkWin();
  }

  //Sum the value of the numbers when moving it up or down, they are the same equal value
  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      //If the value is deeply equal, sum and combine it into the array, and save the second space as 0
      if (squares[i].innerHTML === squares[i +width].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = 0;

        //Display the current score:
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkWin();
  }

  //Keycodes assignments
  document.addEventListener("keyup", control);

  function control(e) {
    switch (e.key) {
      case "ArrowRight":
        keyRight();
        break;
      case "ArrowLeft":
        keyLeft();
        break;
      case "ArrowUp":
        keyUp();
        break;
      case "ArrowDown":
        keyDown();
        break;
    }
  }

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generateNumber();
  }
  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generateNumber();
  }
  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generateNumber();
  }
  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generateNumber();
  }

  //Check for the number 2049 to win
  function checkWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innetHTML = "Winner";
        document.removeEventListener("keyup", control);
      }
    }
  }

  //Check if the game is lost and running out of options (no more 0's on the board)
  function checkLoose() {
    let zeros = 0;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = "Looser";
      document.removeEventListener("keyup", control);
    }
  }

  //clear timer
  function clear() {
    clearInterval(timer)
  }
  
  //Function to draw the background colors depending on the value on them
  function drawColours() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
      else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da'
      else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#ede0c8' 
      else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#f2b179' 
      else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#ffcea4' 
      else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#e8c064' 
      else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#ffab6e' 
      else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#fd9982' 
      else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#ead79c' 
      else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff' 
      else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5' 
      else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0' 
    }
  }

  drawColours()
  var timer = setInterval(drawColours, 50)

});