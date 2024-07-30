import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  createCommand,
  COMMAND_PRIORITY_LOW,
  ElementNode,
  TextNode,
  $createTextNode,
  ParagraphNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";

export class PartHeadingNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    // console.log("getType partHeadingNode");
    return "partHeading";
  }
  constructor(key) {
    // console.log("constructor partHeadingNode");
    super(key);
  }

  static clone(node) {
    // console.log("clone partHeadingNode");
    return new PartHeadingNode(node.__key);
  }

  createDOM(config) {
    // console.log("createDOM partHeadingNode");
    const element = document.createElement("ol");
    element.className = config.theme.partHeading || "partHeading";
    return element;
  }

  updateDOM() {
    // console.log("updateDOM partHeadingNode");
    return false;
  }

  // this triggers on "Enter" key press, hitting enter on an empty list item should create a paragraph node instead
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter partHeadingNode");
    const newBlock = new PartHeadingItemNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.append(newBlock);
    return newBlock;
  }

  //
  collapseAtStart() {
    // console.log("collapseAtStart partHeadingNode");
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
  // console.log("createPartHeadingNode");
  return new PartHeadingNode();
}

export function $isPartHeadingNode(node) {
  // console.log("isPartHeadingNode");
  return node instanceof PartHeadingNode;
}

export const INSERT_PARTHEADING_COMMAND = createCommand("insertPartHeading");

export function PartHeadingPlugin() {
  // console.log("PartHeadingPlugin");
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
    // console.log("getType partHeadingItem");
    return "partHeadingItem";
  }
  constructor(key) {
    // console.log("constructor partHeadingItem");
    super(key);
  }

  static clone(node) {
    // console.log("clone partHeadingItem");
    return new PartHeadingItemNode(node.__key);
  }

  createDOM(config) {
    // console.log("createDOM partHeadingItem");
    const element = document.createElement("li");
    element.className = config.theme.partHeadingItem || "partHeadingItem";
    return element;
  }

  updateDOM() {
    // console.log("updateDOM partHeadingItem");
    return false;
  }

  // this triggers on "Enter" key press, hitting enter on an empty list item should create a paragraph node instead
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter partHeadingItem");
    const textContent = this.getTextContent();
    if (textContent === "") {
      const newTextNode = new ParagraphNode();
      this.replace(newTextNode);
      return newTextNode;
    } else {
      const newBlock = new PartHeadingItemNode();
      const direction = this.getDirection();
      newBlock.setDirection(direction);
      this.insertAfter(newBlock, restoreSelection);
      return newBlock;
    }
  }

  // this triggers on "Backspace" key press at beginning of the node
  collapseAtStart() {
    // console.log("collapseAtStart partHeadingItem");
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
  // console.log("createPartHeadingItemNode");
  return new PartHeadingItemNode();
}

export function $isPartHeadingItemNode(node) {
  // console.log("isPartHeadingItemNode");
  return node instanceof PartHeadingItemNode;
}

export const INSERT_PARTHEADINGITEM_COMMAND = createCommand(
  "insertPartHeadingItem"
);
