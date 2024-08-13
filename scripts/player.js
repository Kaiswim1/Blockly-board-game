class Player { 

    constructor(name, row, col, image, rotationAngle, coins) {
      this.name = name;
      this.row = row;
      this.col = col; 
      this.coins = coins; 
      this.health = 100;  
      this.rotationAngle = rotationAngle; 
      this.image = image;  
      this.blockUpgrades = {"go_to": 1, "move_step":0, "leave_spike":0, "point_in_direciton":0, "repeat":0}; 
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
  
