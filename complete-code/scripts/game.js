class Game {
    constructor() {
      const rows = 8;
      const cols = 8;
      const containerId = 'grid-container';
      const numberOfPlayers = 3;
      this.grid = new Grid(rows, cols, containerId, numberOfPlayers);   
      this.generatePlayerStats(numberOfPlayers);
    } 
    
    generatePlayerStats(playerCount) {
      // Get the container element
      const statsContainer = document.getElementById('statsContainer');
      
      // Clear any existing content
      statsContainer.innerHTML = ''; 
    
      // Loop through the number of players and create their stats
      for (let i = 0; i < playerCount; i++) {
        // Create elements for player stats
        const playerName = document.createElement('p');
        playerName.textContent = `Player ${i+1}:`;
  
        const playerCoins = document.createElement('p');
        playerCoins.textContent = `Coins: ${this.grid.playerConfigs[i].coins}`;
  
        const playerHealth = document.createElement('p');
        playerHealth.textContent = `Health: ${this.grid.playerConfigs[i].health}`;
  
        // Append elements to the container
        statsContainer.appendChild(playerName);
        statsContainer.appendChild(playerCoins);
        statsContainer.appendChild(playerHealth);
  
        // Add a horizontal line between players, except after the last player
        if (i < playerCount - 1) {
          const hr = document.createElement('hr');
          statsContainer.appendChild(hr);
        }
      }
    }
  }
  
  let game = new Game();