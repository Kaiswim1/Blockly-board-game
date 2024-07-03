class Grid {
  constructor(rows, cols, containerId) {
    this.rows = rows;
    this.cols = cols;
    this.gridArray = this.createGridArray();
    this.container = document.getElementById(containerId);
  }

  createGridArray() {
    let grid = [];
    for (let i = 0; i < this.rows; i++) {
      grid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        grid[i][j] = 3; // Initialize each cell with the value 3
      }
    }
    return grid;
  }

  generateGrid() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // Create grid item
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.style.position = 'relative'; // Ensure relative positioning

        // Create and style unique variable span (value 3)
        const uniqueVariable = document.createElement('span');
        uniqueVariable.textContent = this.gridArray[i][j];
        uniqueVariable.className = 'unique-variable';
        uniqueVariable.style.position = 'absolute'; // Absolute positioning inside relative gridItem
        uniqueVariable.style.top = '0';
        uniqueVariable.style.left = '0';
        uniqueVariable.style.fontSize = '10px'; // Adjust size as needed

        // Append unique variable to grid item
        gridItem.appendChild(uniqueVariable);

        // Append grid coordinates (i, j)
        const gridText = document.createElement('span');
        gridText.textContent = ` (${i}, ${j})`; // Include the coordinates
        gridItem.appendChild(gridText);

        // Append grid item to container
        this.container.appendChild(gridItem);
      }
    }
  }

  placePlayer(player) {
    const gridItem = this.container.children[player.row * this.cols + player.col];
    if (gridItem) {
      // Clear previous content
      gridItem.innerHTML = '';

      // Decrease the value by one
      if (this.gridArray[player.row][player.col] > 0) {
        this.gridArray[player.row][player.col]--; 
        player.coins++;
      }

      // Update the unique variable span with the new value
      const uniqueVariable = document.createElement('span');
      uniqueVariable.textContent = this.gridArray[player.row][player.col];
      uniqueVariable.className = 'unique-variable';
      uniqueVariable.style.position = 'absolute';
      uniqueVariable.style.top = '0';
      uniqueVariable.style.left = '0';
      uniqueVariable.style.fontSize = '10px';
      gridItem.appendChild(uniqueVariable);

      // Add the player image
      const playerImage = document.createElement('img');
      playerImage.src = player.image;
      playerImage.alt = player.name;
      playerImage.className = 'player-image';
      gridItem.appendChild(playerImage);
    }
  }

  movePlayer(player, newRow, newCol) {
    // Check if the new position is within bounds
    if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
      // Clear the current position
      const currentPosition = player.row * this.cols + player.col;
      const currentGridItem = this.container.children[currentPosition];
      if (currentGridItem) {
        currentGridItem.innerHTML = '';

        // Restore grid coordinates
        const gridText = document.createElement('span');
        gridText.textContent = ` (${player.col}, ${player.row})`;
        currentGridItem.appendChild(gridText);

        // Restore the unique variable
        const uniqueVariable = document.createElement('span');
        uniqueVariable.textContent = this.gridArray[player.row][player.col];
        uniqueVariable.className = 'unique-variable';
        uniqueVariable.style.position = 'absolute';
        uniqueVariable.style.top = '0';
        uniqueVariable.style.left = '0';
        uniqueVariable.style.fontSize = '10px';
        currentGridItem.appendChild(uniqueVariable);
      }

      // Update player's position
      player.move(newRow, newCol);

      // Place the player at the new position
      this.placePlayer(player);
    }
    player.loadStats(); 
  }
  
}




  
  class Player {
    constructor(name, row, col, image) {
      this.name = name;
      this.row = row;
      this.col = col; 
      this.coins = 0; 
      this.health = 100; 
      this.image = image;
    }
  
    move(row, col) {
      this.row = row;
      this.col = col;
    }
  
    getPosition() {
      return { row: this.row, col: this.col };
    } 
    loadStats(){
      document.getElementById("coins").textContent = "Coins: " + this.coins; 
      document.getElementById("health").textContent = "Health: " + this.health; 
      document.getElementById("name").textContent = "Name: " + this.name;
    } 
    increaseCoins(howMany){
      this.coins+=howMany; 
    }
  }
  
  // Usage example:
  const rows = 8;
  const cols = 8;
  const containerId = 'grid-container';
  
  // Create a new instance of Grid
  const grid = new Grid(rows, cols, containerId);
  
  // Generate the grid items
  grid.generateGrid();
  
  // Create a new instance of Player 
  const player = new Player('Kai', 4, 0, 'images/guy.png');  
  
  
  
  // Place the player initially on the grid
  grid.placePlayer(player);
  
  // Example of moving the player
  grid.movePlayer(player, 3, 1);// Move player to row 3, column 1
  