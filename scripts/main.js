class HandlePlayers {
  #playerTurnI = 0;
  constructor() {
      this.turn = 1;
  }

  nextTurn() {
    this.#playerTurnI++;
    this.turn = (this.#playerTurnI % game.grid.numOfPlayers) + 1;
  }
}

let handlePlayers = new HandlePlayers();

document.addEventListener('DOMContentLoaded', function () {
  let currentButton;

  function handlePlay(event) {
    handleSave(); // Save the workspace before running the code
    // loadWorkspace(event.target);
    let code = javascript.javascriptGenerator.workspaceToCode(
      Blockly.getMainWorkspace()
    );
    code += 'MusicMaker.play();';
    // Eval can be dangerous. For more controlled execution, check
    // https://github.com/NeilFraser/JS-Interpreter.
    try {
      eval(code);
    } catch (error) {
      console.log(error);
    }
    workspace.clear();
    handlePlayers.nextTurn();
  }

  function loadWorkspace(button) {
    const workspace = Blockly.getMainWorkspace();
    if (button.blocklySave) {
      Blockly.serialization.workspaces.load(button.blocklySave, workspace);
    } else {
      workspace.clear();
    }
  }

  function save() {
    if (currentButton) {
      currentButton.blocklySave = Blockly.serialization.workspaces.save(
        Blockly.getMainWorkspace()
      );
    }
  }

  function handleSave() {
    save();
  }

  function enableMakerMode() {
    handleSave();
    document.body.setAttribute('mode', 'maker');
    document.querySelectorAll('.button').forEach((btn) => {
      btn.addEventListener('click', handlePlay);
      btn.removeEventListener('click', enableBlocklyMode);
    });
  }

  function enableBlocklyMode(e) {
    document.body.setAttribute('mode', 'blockly');
    currentButton = e.target;
    loadWorkspace(currentButton);
  }

  function countBlocksOfType(blockType) {
    const workspace = Blockly.getMainWorkspace();
    if (!workspace) {
      console.error('Workspace is not available');
      
      return 0;
    }
    const allBlocks = workspace.getAllBlocks();
    return allBlocks.filter(block => block.type === blockType).length;
  }

  function updateBlockCount() {  
    console.log("rer2: "+game.grid.playerConfigs[handlePlayers.turn-1].blockUpgrades["repeat"]); 
    document.querySelector('#no-click-repeat').style.display = countBlocksOfType('controls_repeat_ext') < game.grid.playerConfigs[handlePlayers.turn-1].blockUpgrades["repeat"] ? 'none' : 'flex'; 
    document.querySelector('#no-click-move-step').style.display = countBlocksOfType('move_step') < game.grid.playerConfigs[handlePlayers.turn-1].blockUpgrades["move_step"] ? 'none' : 'flex'; 
    document.querySelector('#no-click-leave-spike').style.display = countBlocksOfType('leave_spike') < game.grid.playerConfigs[handlePlayers.turn-1].blockUpgrades["leave_spike"] ? 'none' : 'flex'; 
    document.querySelector('#no-click-point-in-direction').style.display = countBlocksOfType('point_in_direction') < game.grid.playerConfigs[handlePlayers.turn-1].blockUpgrades["point_in_direction"] ? 'none' : 'flex';
  }

  // Initialize Blockly workspace and set up event listeners
  const toolbox = {
    kind: 'flyoutToolbox',
    contents: [
      {
        kind: 'block',
        type: 'go_to',
      },
      {
        kind: 'block',
        type: 'move_step',
      },
      {
        kind: 'block',
        type: 'leave_spike',
      },
      {
        kind: 'block',
        type: 'point_in_direction',
      },
      {
        kind: 'block',
        type: 'controls_repeat_ext',
        inputs: {
          TIMES: {
            shadow: {
              type: 'math_number',
              fields: {
                NUM: 5,
              },
            },
          },
        },
      },
    ],
  };
  

  const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    scrollbars: true,
    horizontalLayout: false,
    toolboxPosition: 'start',
  });

  // Ensure the workspace is correctly initialized
  if (workspace) {
    workspace.addChangeListener(function (event) {
      if (event.type === Blockly.Events.BLOCK_CREATE || event.type === Blockly.Events.BLOCK_DELETE) {
        updateBlockCount();
      }
    });
  } else {
    console.error('Failed to initialize Blockly workspace');
  }  

  function handleUpgrade(upgrade, cost) {
    // Determine the current player's index based on their turn
    const currentPlayerIndex = handlePlayers.turn - 1;
    const currentPlayer = game.grid[`player${handlePlayers.turn}`];
    const currentPlayerConfig = game.grid.playerConfigs[currentPlayerIndex];
    if (currentPlayerConfig.coins >= cost) {
        currentPlayerConfig.blockUpgrades[upgrade]++;
        currentPlayer.blockUpgrades[upgrade]++;  // Ensure the player object reflects the upgrade
        currentPlayerConfig.coins -= cost;
        currentPlayer.coins = currentPlayerConfig.coins;  // Synchronize the coins in player object
        game.grid.updatePlayerStats();
        updateBlockCount();
    }
}




  const upgradeButtons = document.querySelectorAll('.upgradeButton');  
  upgradeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = button.textContent.trim(); // Get the button text content to determine the action

            switch (action) {
                case 'Buy move step': 
                    handleUpgrade("move_step", 3); 
                    break;
                case 'Buy point in direction': 
                    handleUpgrade("point_in_direction", 6);  
                    console.log("3ere: "+game.grid.playerConfigs[handlePlayers.turn-1].coins); 
                    break;
                case 'Unlock leave spike': 
                    handleUpgrade("leave_spike", 4); 
                    break;
                case 'Unlock repeat': 
                    handleUpgrade("repeat", 20); 
                    break;
                case 'Unlock Move 1': 
                    console.log("unlock move 1"); 
                    break;
                case 'Unlock Move 2': 
                    console.log("unlock move 2"); 
                    break;
                default:
                    console.log('Unknown action: ' + action);
            }
        });
    });

  // Initial block count
  updateBlockCount();

  // Save workspace every 5 seconds
  //setInterval(handleSave, 5000);

  // Run the code when the button with text "run code" is clicked
  document.querySelector('.button').addEventListener('click', handlePlay);

  // Automatically switch to Maker Mode
  enableMakerMode();
});

