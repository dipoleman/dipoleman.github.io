


// This function calculates the indices of the cells surrounding a given cell in a grid with wrap-around (toroidal) boundaries
function mobius(numRows, numCols, i, j) {
  // Initialize an array of the relative indices of the surrounding cells
  var surroundingCells = [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1], [i, j - 1], [i, j + 1], [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]];

  // Calculate the actual indices of the surrounding cells using the modulo operator to wrap around the boundaries
  for (var z = 0; z < surroundingCells.length; z++) {
    surroundingCells[z][0] = ((surroundingCells[z][0] % numRows) + numRows) % numRows;
    surroundingCells[z][1] = ((surroundingCells[z][1] % numCols) + numCols) % numCols;
  }

  // Return the array of surrounding cell indices
  return surroundingCells;
}


// Schelling Segregation Model****************************************************************************************************
// This function creates the initial grid based on the user's input values for the number of rows, number of columns, and vacancy
function initialGrid() {
  // Get the user's input values for the number of rows, number of columns, and vacancy
  var numRows = parseInt(document.getElementById('n_row').value);
  var numCols = numRows
  var vacancy = parseInt(document.getElementById('vacancy').value);
  var mix = parseInt(document.getElementById('mix').value);

  // Get the table element and clear its contents
  var table = document.getElementById('grid');
  table.innerHTML = '';

  // Get the container element and its dimensions
  var container = document.querySelector('.container-fluid');
  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;

  // Define an array of colors to use for the cells
  var colors =['grey','red','blue'];

  // Calculate the width and height of each cell based on the container dimensions and the number of rows and columns
  var cellWidth = Math.floor(containerWidth / numCols);
  var cellHeight = Math.floor(containerHeight / numRows);

  // Make sure that the cell width and height are equal
  if (cellWidth >= cellHeight) {
    cellWidth = cellHeight;
  } else {
    cellHeight = cellWidth;
  }

  // Calculate the split points for assigning colors to cells based on the vacancy value
  var split1 = (vacancy / 100);
  //var split2 = vacancy / 200 + split1;
  var split2 = ((1-split1)*(mix/100)) + split1

  // Create the grid by inserting rows and cells into the table
  for (var i = 0; i < numRows; i++) {
    var row = table.insertRow(-1);
    for (var j = 0; j < numCols; j++) {
      // Randomly assign a color to the cell based on the vacancy value
      // var colorIndex = Math.random() < split1 ? 0 : (Math.random() < split2 ? 1 : 2);
      // var color = colors[colorIndex];
      var colorIndex;
      var rand = Math.random();
      if (rand < split1) {
        colorIndex = 0;
      } else if (rand < split2) {
        colorIndex = 1;
      } else {
        colorIndex = 2;
      }
      var color = colors[colorIndex];

      // Insert a new cell into the row and set its background color
      var cell = row.insertCell(-1);
      cell.style.backgroundColor = color;
    }
  }
}

// This function calculates the indices of unhappy cells and vacant cells in the grid
function unHappyGroup() {
  // Get the table element and the user's input values for the number of rows, number of columns, and threshold
  var table = document.getElementById('grid');
  var numRows = parseInt(document.getElementById('n_row').value);
  var numCols = numRows
  var threshold = parseInt(document.getElementById('threshold').value);

  // Initialize arrays to store the indices of unhappy and vacant cells
  var unHappy = [];
  var vacant = [];

  // Loop through all cells in the grid
  for (var k = 0; k < numRows; k++) {
    for (var l = 0; l < numCols; l++) {
      // Get the current cell and its color
      var cell = table.rows[k].cells[l];
      var targetColor = cell.style.backgroundColor;

      // Check if the cell is occupied
      if (targetColor !== 'grey') {
        // Get the list of surrounding cells using the mobius function
        var surroundingCells = mobius(numRows, numCols, k, l);

        // Count the number of surrounding cells with the same color as the target cell
        var sameColorCount = 0;
        for (var i = 0; i < surroundingCells.length; i++) {
          // Check if the current cell has the same color as the target cell
          if (table.rows[surroundingCells[i][0]].cells[surroundingCells[i][1]].style.backgroundColor === targetColor) {
            sameColorCount++;
          }
        }

        // Check if the cell is unhappy based on the threshold value
        if (sameColorCount <= threshold) {
          // Set the opacity of the cell to indicate that it is unhappy
          //cell.style.opacity = '0.5';

          // Add the indices of the unhappy cell to the unHappy array
          unHappy.push([sameColorCount, targetColor, k, l ]);
        }
      } else {
        // If the cell is vacant, add its indices to the vacant array
        vacant.push([k, l]);
      }
    }
  }

  // Return an array containing the unHappy and vacant arrays
  unHappy.sort(function (a,b){
    return a[0] - b[0]
  })
  return [unHappy, vacant];
}

// This function takes an array as an argument and shuffles its elements in place using the Fisher-Yates shuffle algorithm.
function shuffleArray(array) {
  // Loop backwards through the array
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// This function performs one step of the Schelling segregation model. 
function schellingOneStep() {
  // Get the unhappy and vacant cells from the unHappyGroup function
  var [unHappy, vacant] = unHappyGroup();
  var table = document.getElementById('grid');

  // Shuffle the unhappy and vacant arrays
  shuffleArray(unHappy);
  shuffleArray(vacant);

  // Calculate the number of cells to swap
  var numSwaps = Math.min(unHappy.length, vacant.length);

  // Loop through the cells to swap
  for (var i = 0; i < numSwaps; i++) {
    // Get the row and column indices of the unhappy and vacant cells to swap
    var [sameColorCount, targetColor, unhappyRow, unhappyCol] = unHappy[i];
    var [vacantRow, vacantCol] = vacant[i];

    // Get the unhappy and vacant cells
    var unhappyCell = table.rows[unhappyRow].cells[unhappyCol];
    var vacantCell = table.rows[vacantRow].cells[vacantCol];

    // Swap the colors of the unhappy and vacant cells
    [unhappyCell.style.backgroundColor, vacantCell.style.backgroundColor] = [vacantCell.style.backgroundColor, unhappyCell.style.backgroundColor];
  }
}

// This function runs the model untill the Stop button is pressed (or 100000 iterations)
function schellingUntilDone() {
  // Define a flag variable to track if the stop button has been clicked
  var stopClicked = false;

  // Attach an event listener to the stop button
  document.getElementById('stop-button').addEventListener('click', function() {
  // Set the stopClicked flag to true when the button is clicked
  stopClicked = true;
  });

  // Initialize the iteration counter
  var iterations = 0;

  // Get the unhappy cells from the unHappyGroup function
  var [unHappy, vacant] = unHappyGroup();

  // Run one iteration of the Schelling model
  function runOneIteration() {
    // Check if the stop button has been clicked
    if (stopClicked) {
      return;
    }

    // Call the schellingOneStep function
    schellingOneStep();

    // Get the unhappy cells from the unHappyGroup function
    [unHappy, vacant] = unHappyGroup();

    // Increment the iteration counter
    iterations++;

    // Check if we should continue running the Schelling model
    if (unHappy.length > 0 && iterations < 100000) {
      // Run the next iteration after a delay
      setTimeout(runOneIteration, 10);
    }
  }

  // Start running the Schelling model
  runOneIteration();
}

//End Schelling Segregation Model************************************************************************************************


