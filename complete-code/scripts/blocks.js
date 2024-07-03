// Flag to control whether the print block is enabled or disabled

// Define the blocks
Blockly.defineBlocksWithJsonArray([ 
  
  // Block for colour picker.
  {
    type: 'play_sound',
    message0: 'Play %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'note',
        options: [
          ['C4', 'sounds/c4.m4a'],
          ['D4', 'sounds/d4.m4a'],
          ['E4', 'sounds/e4.m4a'],
          ['F4', 'sounds/f4.m4a'],
          ['G4', 'sounds/g4.m4a'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 355,
  },
  // Conditional block definition for print block
  { 
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
  },
  {
    type: 'go_to',
    message0: 'GoTo %1 and %2',
    args0: [
      {
        type: 'field_label_serializable',
        name: 'go_to_1',
        text: null, // Placeholder, will be set programmatically
      },
      {
        type: 'field_label_serializable',
        name: 'go_to_2',
        text: null, // Placeholder, will be set programmatically
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 444,
  },
]);

// Generator code for print block remains unchanged
javascript.javascriptGenerator.forBlock['print'] = function(block) { 
  var text = block.getFieldValue('print');
  return 'console.log(' + JSON.stringify(text) + ');\n';
}; 

// Generator code for go_to block remains unchanged
javascript.javascriptGenerator.forBlock['go_to'] = function(block) {
  block.setFieldValue(Math.floor(Math.random() * 6) + 1, 'go_to_1');
  block.setFieldValue(Math.floor(Math.random() * 6) + 1, 'go_to_2');
  var textY = block.getFieldValue('go_to_1');
  var textX = block.getFieldValue('go_to_2');
  return 'grid.movePlayer(player, ' + textX + ', ' + textY + ');\n';
};

