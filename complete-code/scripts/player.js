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
  