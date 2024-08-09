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
    const noClickDiv = document.querySelector('#no-click-div');
    console.log(`Number of 'move_step' blocks: ${countBlocksOfType('move_step')}`); 
    console.log(`Number of 'go_to' blocks: ${countBlocksOfType('go_to')}`);  
    const repeatCount = countBlocksOfType('controls_repeat_ext'); 
    if (repeatCount <= 0) {
      noClickDiv.style.display = 'none'; // Hide div
    } else {
      noClickDiv.style.display = 'flex'; // Show div
    }
    // You can update a UI element with this count if needed
  }

  // Initialize Blockly workspace and set up event listeners
  const toolbox = {
    kind: 'flyoutToolbox',
    contents: [
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

  // Initial block count
  updateBlockCount();

  // Save workspace every 5 seconds
  //setInterval(handleSave, 5000);

  // Run the code when the button with text "run code" is clicked
  document.querySelector('.button').addEventListener('click', handlePlay);

  // Automatically switch to Maker Mode
  enableMakerMode();
});
