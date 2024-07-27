

class Grid {
  constructor(rows, cols, containerId, numOfPlayers) {
    this.rows = rows;
    this.cols = cols;
    this.gridArray = this.createGridArray(); 
    this.container = document.getElementById(containerId);   
    this.numOfPlayers = numOfPlayers; 
    this.generateGrid();  

    // Create players 
    this.playerConfigs = [
      { name: 'player1', x: 5, y: 2, image: 'images/guy.png', rotation: 180, coins: 0},
      { name: 'player2', x: 2, y: 2, image: 'images/guy2.png', rotation: 270, coins: 0 },
      { name: 'player3', x: 2, y: 5, image: 'images/guy3.png', rotation: 0, coins: 0 },
      { name: 'player4', x: 5, y: 5, image: 'images/guy4.png', rotation: 90, coins: 0 }
    ];
    
    for (let i = 0; i < numOfPlayers; i++) {
      const config = this.playerConfigs[i];
      const player = new Player(config.name, config.x, config.y, config.image, config.rotation, config.coins);
      this[`player${i + 1}`] = player;
      this.placePlayer(player);
    }    
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
        this.playerConfigs[handlePlayers.turn-1].coins = player.coins; 
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
      playerImage.style.transform = `rotate(${player.rotationAngle}deg)`;

      gridItem.appendChild(playerImage);
    }
    this.updatePlayerStats();
  }

  #transformPlayer(player) {
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
  }

  goTo(player, newRow, newCol) {
    // Check if the new position is within bounds
    if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
      // Clear the current position
      this.#transformPlayer(player); 
      // Update player's position
      player.move(newRow, newCol);

      // Place the player at the new position
      this.placePlayer(player);
    } 
    this.updatePlayerStats(); 
  }

  step(player) {
    if(player.row + 1 <= 7) {
      this.#transformPlayer(player); 
      player.step(player.rotationAngle);
      this.placePlayer(player);
    }   
    this.updatePlayerStats(); 
  }

  updatePlayerStats() {
    // Get the container element
    const statsContainer = document.getElementById('statsContainer');

    // Clear any existing content
    statsContainer.innerHTML = ''; 

    // Loop through the number of players and create their stats
    for (let i = 0; i < this.numOfPlayers; i++) {
      const player = this[`player${i + 1}`];
      // Create elements for player stats
      const playerName = document.createElement('p');
      playerName.textContent = `Player ${i + 1}:`;

      const playerCoins = document.createElement('p'); 
      console.log(this.playerConfigs[i].coins)
      playerCoins.textContent = `Coins: ${this.playerConfigs[i].coins}`;

      const playerHealth = document.createElement('p');
      playerHealth.textContent = `Health: `;

      // Append elements to the container
      statsContainer.appendChild(playerName);
      statsContainer.appendChild(playerCoins);
      statsContainer.appendChild(playerHealth);

      // Add a horizontal line between players, except after the last player
      if (i < this.numOfPlayers - 1) {
        const hr = document.createElement('hr');
        statsContainer.appendChild(hr);
      }
    }
  }
}

class Player {
  constructor(name, row, col, image, rotationAngle, coins) {
    this.name = name;
    this.row = row;
    this.col = col; 
    this.coins = coins; 
    this.health = 100;  
    this.rotationAngle = rotationAngle; 
    this.image = image;
  }

  move(row, col) {
    this.row = row;
    this.col = col;
  } 

  step() {
    switch(this.rotationAngle) {
      case 270:
        this.col--;   
        break;
      case 90:
        this.col++; 
        break;
      case 0:
        this.row--;  
        break;
      case 180:
        this.row++; 
        break;
    }  
  }

  getPosition() {
    return { row: this.row, col: this.col };
  } 

  loadStats() {
    //document.getElementById("coins").textContent = "Coins: " + this.coins; 
    //document.getElementById("health").textContent = "Health: " + this.health; 
    //document.getElementById("name").textContent = "Name: " + this.name;
  } 
}
