import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

// var LexicalComposerContext = require("@lexical/react/LexicalComposerContext");
var utils = require("@lexical/utils");
var lexical = require("lexical");
var react = require("react");

export function CustomTab(editor, event) {
  console.log("tab command");
  //   const selection = $getSelection();
  //   if (!selection || !selection.isCollapsed()) {
  //     return false;
  //   }
  //   const rangeSelection = $createRangeSelection();
  //   console.log("rangeSelection: ", rangeSelection);
  //   const anchor = rangeSelection.anchor;
  //   const node = anchor.getNode();
  //   console.log("node: ", node);
  //   // Check node type and handle accordingly
  //   if ($isTextNode(node)) {
  //     // Handle text node tabbing
  //     handleTextNodeTab(node, anchor);
  //   } else if (node.isListItem()) {
  //     // Handle list item tabbing
  //     handleListItemTab(node, anchor);
  //   } else if (node.isBlock()) {
  //     // Handle block node tabbing
  //     handleBlockNodeTab(node, anchor);
  //   } else {
  //     // Default tab behavior
  //     // editor.dispatchCommand(lexical.INSERT_TAB_COMMAND, undefined);
  //   }
  //   return false; // default tab behavior
}

// Helper functions for different node types
function handleTextNodeTab(node, anchor) {
  console.log("Tabbing within a text node.");
  // Implement text node-specific tab handling logic here
}

function handleListItemTab(node, anchor) {
  console.log("Tabbing within a list item.");
  // Implement list item-specific tab handling logic here
}

function handleBlockNodeTab(node, anchor) {
  console.log("Tabbing within a block node.");
  // Implement block node-specific tab handling logic here
}
