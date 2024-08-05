let game; 
document.addEventListener('DOMContentLoaded', function() {
    game = new Game(parseInt(localStorage.getItem('numPlayers') ? localStorage.getItem('numPlayers').slice(-1) : null, 10));
});