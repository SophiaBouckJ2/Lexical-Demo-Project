/*
// adding a new node type to lexical example
*/

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  createCommand,
  COMMAND_PRIORITY_LOW,
  ElementNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";

export class PartHeadingNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    return "partHeading";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new PartHeadingNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("ol");
    element.className = config.theme.partHeading || "partHeading";
    return element;
  }

  updateDOM() {
    return false;
  }

  // this triggers on "Enter" key press
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter");
    const newBlock = new PartHeadingItemNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.append(newBlock);
    return newBlock;
  }

  //
  collapseAtStart() {
    console.log("collapseAtStart");
    const listNode = new PartHeadingNode();
    const children = this.getChildren();
    children.forEach((child) => {
      listNode.appendChild(child);
    });
    this.replace(listNode);
    return true;
  }
}

export function $createPartHeadingNode() {
  return new PartHeadingNode();
}

export function $isPartHeadingNode(node) {
  return node instanceof PartHeadingNode;
}

export const INSERT_PARTHEADING_COMMAND = createCommand("insertPartHeading");

export function PartHeadingPlugin() {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([PartHeadingNode])) {
    throw new Error("Part Heading Node must be registered in the editor.");
  }
  editor.registerCommand(
    INSERT_PARTHEADING_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const newPartHeadingNode = $createPartHeadingNode();
        const newPartHeadingItemNode = $createPartHeadingItemNode();
        newPartHeadingNode.append(newPartHeadingItemNode);
        $setBlocksType(selection, () => newPartHeadingNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
}

export class PartHeadingItemNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    return "partHeadingItem";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new PartHeadingItemNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("li");
    element.className = config.theme.partHeadingItem || "partHeadingItem";
    return element;
  }

  updateDOM() {
    return false;
  }

  // this triggers on "Enter" key press
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter");
    const newBlock = new PartHeadingItemNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }

  //
  collapseAtStart() {
    console.log("collapseAtStart");
    const listNode = new PartHeadingItemNode();
    const children = this.getChildren();
    children.forEach((child) => {
      listNode.appendChild(child);
    });
    this.replace(listNode);
    return true;
  }
}

export function $createPartHeadingItemNode() {
  return new PartHeadingItemNode();
}

export function $isPartHeadingItemNode(node) {
  return node instanceof PartHeadingItemNode;
}

export const INSERT_PARTHEADINGITEM_COMMAND = createCommand(
  "insertPartHeadingItem"
);
