// Flag to control whether the print block is enabled or disabled

// Define the blocks
Blockly.defineBlocksWithJsonArray([ 
  
  // Block for colour picker.
  // Conditional block definition for print block
  /*{ 
    type: 'print',
    message0: 'Print %1',
    args0: [
      {
        type: 'field_input',
        name: 'print',
        text: 'default text',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 214, 
  },*/
  {
    type: 'go_to',
    message0: 'go to random',
    previousStatement: null,
    nextStatement: null,
    colour: 444,
  },
  {
    type: 'move_step',
    message0: 'move step',
    previousStatement: null,
    nextStatement: null,
    colour: 615, 
  }, 
  { 
    type: 'leave_spike',
    message0: 'leave spike',
    previousStatement: null,
    nextStatement: null,
    colour: 214, 
  }, 
  {
    type: 'point_in_direction',
    message0: 'point in direction %1',
    args0: [
        {
            type: 'field_dropdown',
            name: 'direction',
            options: [ 
                ['up', '0'],
                ['left', '270'],
                ['down', '180'],
                ['right', '90'],
            ]
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 214,
}
]);

// Generator code for print block remains unchanged
/*javascript.javascriptGenerator.forBlock['print'] = function(block) { 
  var text = block.getFieldValue('print');
  return 'console.log(' + JSON.stringify(text) + ');\n';
}; */

// Generator code for go_to block remains unchanged
javascript.javascriptGenerator.forBlock['go_to'] = function(block) {
  //var textY = block.getFieldValue('go_to_1');
  //var textX = block.getFieldValue('go_to_2'); 
  console.log("Handleplayers turn:::, "+handlePlayers.turn); 
  return 'game.grid.goTo(game.grid.player'+handlePlayers.turn+');\n';
}; 

javascript.javascriptGenerator.forBlock['move_step'] = function() {  
    return 'game.grid.step('+"game.grid."+game.grid.playerConfigs[handlePlayers.turn-1].name+');\n';
}; 

javascript.javascriptGenerator.forBlock['leave_spike'] = function() {  
  return 'game.grid.placeSpike('+"game.grid."+game.grid.playerConfigs[handlePlayers.turn-1].name+');\n';
};  

javascript.javascriptGenerator.forBlock['point_in_direction'] = function(block) {   
  let p = game.grid.playerConfigs[handlePlayers.turn-1].name;  
  let d = parseInt(block.getFieldValue('direction'), 10);  
  console.log("point in direction x18: "+p+", "+d); 
  return 'game.grid.pointInDirection(game.grid.'+p+','+d+');\n';
}; 


