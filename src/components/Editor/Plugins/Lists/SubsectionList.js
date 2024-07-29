import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  createCommand,
  COMMAND_PRIORITY_LOW,
  ElementNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";

export class SubsectionListNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    return "subsectionList";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new SubsectionListNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("ol");
    element.className = config.theme.subsectionList || "subsectionList";
    return element;
  }

  updateDOM() {
    return false;
  }

  // this triggers on "Enter" key press
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter");
    const newBlock = new SubsectionListItemNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.append(newBlock);
    return newBlock;
  }

  //
  collapseAtStart() {
    console.log("collapseAtStart");
    const listNode = new SubsectionListNode();
    const children = this.getChildren();
    children.forEach((child) => {
      listNode.appendChild(child);
    });
    this.replace(listNode);
    return true;
  }
}

export function $createSubsectionListNode() {
  return new SubsectionListNode();
}

export function $isSubsectionListNode(node) {
  return node instanceof SubsectionListNode;
}

export const INSERT_SUBSECTIONLIST_COMMAND = createCommand(
  "insertSubsectionList"
);

export function SubsectionListPlugin() {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([SubsectionListNode])) {
    throw new Error("Subsection List Node must be registered in the editor.");
  }
  editor.registerCommand(
    INSERT_SUBSECTIONLIST_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const newSubsectionListNode = $createSubsectionListNode();
        const newSubsectionListItemNode = $createSubsectionListItemNode();
        newSubsectionListNode.append(newSubsectionListItemNode);
        $setBlocksType(selection, () => newSubsectionListNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
}

export class SubsectionListItemNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    return "subsectionListItem";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new SubsectionListItemNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("li");
    element.className = config.theme.subsectionListItem || "subsectionListItem";
    return element;
  }

  updateDOM() {
    return false;
  }

  // this triggers on "Enter" key press
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter");
    const newBlock = new SubsectionListItemNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }

  //
  collapseAtStart() {
    console.log("collapseAtStart");
    const listNode = new SubsectionListItemNode();
    const children = this.getChildren();
    children.forEach((child) => {
      listNode.appendChild(child);
    });
    this.replace(listNode);
    return true;
  }
}

export function $createSubsectionListItemNode() {
  return new SubsectionListItemNode();
}

export function $isSubsectionListItemNode(node) {
  return node instanceof SubsectionListItemNode;
}

export const INSERT_SUBSECTIONLISTITEM_COMMAND = createCommand(
  "insertSubsectionListItem"
);
