// HandlePlayers.js
class HandlePlayers {
  #playerTurnI = 0;
  constructor() {
      this.turn = 1;
  }

  nextTurn() {
    this.#playerTurnI++;
    this.turn = (this.#playerTurnI % game.grid.numOfPlayers)+1;
    
  }
}
let handlePlayers = new HandlePlayers();
(function () {
  let currentButton;
  
  function handlePlay(event) { 
    handleSave(); // Save the workspace before running the code
    //loadWorkspace(event.target);
    let code = javascript.javascriptGenerator.workspaceToCode(
      Blockly.getMainWorkspace(),
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
        Blockly.getMainWorkspace(),
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

  //document.querySelector('#edit').addEventListener('click', enableEditMode);
  //document.querySelector('#done').addEventListener('click', enableMakerMode);

  enableMakerMode();

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
        type: 'play_sound',
      },
      {
        kind: 'block',
        type: 'print',
      },
      {
        kind: 'block',
        type: 'go_to',
      }, 
      {
        kind: 'block',
        type: 'move_step',
      }
    ],
  };

  let workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    scrollbars: true,
    horizontalLayout: false,
    toolboxPosition: 'start',
  });

  // Save workspace every 5 seconds

  // Run the code when the button with text "1" is clicked
  document.querySelector('.button').addEventListener('click', handlePlay);
})();
