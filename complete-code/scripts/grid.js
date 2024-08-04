

class Grid {
  constructor(rows, cols, containerId, numOfPlayers) {
    this.rows = rows;
    this.cols = cols;
    this.gridArray = this.createGridArray(); 
    this.container = document.getElementById(containerId);   
    this.numOfPlayers = numOfPlayers; 
    this.generateGrid();   
    //spike = new Spike(); 
    
    //spike.render(this.container.children[player.row * this.cols + player.col]); 

    // Create players 
    this.playerConfigs = [
      { name: 'player1', x: 5, y: 2, image: 'images/guy.png', rotation: 180, coins: 10, health: 100},
      { name: 'player2', x: 2, y: 2, image: 'images/guy2.png', rotation: 270, coins: 10, health: 100},
      { name: 'player3', x: 2, y: 5, image: 'images/guy3.png', rotation: 0, coins: 10, health: 100},
      { name: 'player4', x: 5, y: 5, image: 'images/guy4.png', rotation: 90, coins: 10, health: 100}
    ];
    
    for (let i = 0; i < numOfPlayers; i++) {
      const config = this.playerConfigs[i];
      const player = new Player(config.name, config.x, config.y, config.image, config.rotation, config.coins, config.health);
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

  placeAllItems(items){
    for(let i of items){
      this.#placeImageAtLocation(i.row, i.col, i.imagePath, 'img'); 
    }
  } 

  #placeImageAtLocation(row, col, imageUrl, altText = '') {
    // Get the grid item at the specified row and column
    const gridItem = this.container.children[row * this.cols + col];
    
    if (gridItem) {
        // Clear previous content (if needed)
        //gridItem.innerHTML = '';

        // Create an image element
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = altText;
        imageElement.className = 'grid-image';
        imageElement.style.position = 'absolute';
        imageElement.style.top = '0';
        imageElement.style.left = '0';
        imageElement.style.width = `50px`;
        imageElement.style.height = `50px`;

        // Append the image to the grid item
        gridItem.appendChild(imageElement);
    }
} 

  #handleItems(player){   
    this.placeAllItems(Items.Itemslist);  
    let items = Items.itemsAt(player.row, player.col); 
    for(let item of items){
      if(item.name == "spike"){
        player.health-=1;  
        this.playerConfigs[handlePlayers.turn-1].health = player.health; 
      }
    }


    /**
     * Increase player coin if the space contains at least 1 coin 
     */
    if (this.gridArray[player.row][player.col] > 0) {
      this.gridArray[player.row][player.col]--; 
      player.coins++;  
      this.playerConfigs[handlePlayers.turn-1].coins = player.coins; 
    }
  }
  

  placePlayer(player) { 

    const gridItem = this.container.children[player.row * this.cols + player.col];
    //this.placeAt(player, gridItem);
    if (gridItem) {
      // Clear previous content
      gridItem.innerHTML = '';  
      this.#handleItems(player); 
      
      // Decrease the value by one
      

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
      console.log("placePLayer: N: "+player.rotationAngle); 
      playerImage.style.transform = `rotate(${player.rotationAngle}deg)`;

      gridItem.appendChild(playerImage);
    }
    this.updatePlayerStats();
  } 

  placeSpike(player){
    this.#placeImageAtLocation(player.row, player.col, 'images/spike.png', 'An example image'); 
    //Items.add("Hello"); 
    Items.add(new Spike(player.row, player.col)); 
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

  goTo(player) {
    // Check if the new position is within bounds
      // Clear the current position
      this.#transformPlayer(player); 
      // Update player's position
      player.move(Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1);

      // Place the player at the new position
      this.placePlayer(player);
    
    this.updatePlayerStats(); 
  }  

  pointInDirection(player, angle){ 
    this.#transformPlayer(player); 
    player.rotationAngle = angle; 
    this.playerConfigs[handlePlayers.turn-1].rotation = player.rotationAngle;   
    
    this.placePlayer(player);  
  }

  itemEffect(player){
    
  }

  step(player) { 
    if(player.coins>2){ 
      player.coins-=3; 
      if(player.row + 1 <= 7) {
        this.#transformPlayer(player); 
        player.step(player.rotationAngle);
        this.placePlayer(player);
      }   
    this.updatePlayerStats(); 
    }
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
      playerHealth.textContent = `Health: ${this.playerConfigs[i].health}`;

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

