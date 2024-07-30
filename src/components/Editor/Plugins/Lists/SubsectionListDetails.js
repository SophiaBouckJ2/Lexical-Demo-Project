import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  createCommand,
  COMMAND_PRIORITY_LOW,
  ElementNode,
  ParagraphNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";

export class SubsectionListDetailsNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    return "subsectionListDetails";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new SubsectionListDetailsNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("ol");
    element.className =
      config.theme.subsectionListDetails || "subsectionListDetails";
    return element;
  }

  updateDOM() {
    return false;
  }

  // this triggers on "Enter" key press
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter");
    const newBlock = new SubsectionListDetailsItemNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.append(newBlock);
    return newBlock;
  }

  //
  collapseAtStart() {
    console.log("collapseAtStart");
    const listNode = new SubsectionListDetailsNode();
    const children = this.getChildren();
    children.forEach((child) => {
      listNode.appendChild(child);
    });
    this.replace(listNode);
    return true;
  }
}

export function $createSubsectionListDetailsNode() {
  return new SubsectionListDetailsNode();
}

export function $isSubsectionListDetailsNode(node) {
  return node instanceof SubsectionListDetailsNode;
}

export const INSERT_SUBSECTIONLISTDETAILS_COMMAND = createCommand(
  "insertSubsectionListDetails"
);

export function SubsectionListDetailsPlugin() {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([SubsectionListDetailsNode])) {
    throw new Error("Subsection List Node must be registered in the editor.");
  }
  editor.registerCommand(
    INSERT_SUBSECTIONLISTDETAILS_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const newSubsectionListDetailsNode = $createSubsectionListDetailsNode();
        const newSubsectionListDetailsItemNode =
          $createSubsectionListDetailsItemNode();
        newSubsectionListDetailsNode.append(newSubsectionListDetailsItemNode);
        $setBlocksType(selection, () => newSubsectionListDetailsNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
}

export class SubsectionListDetailsItemNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    return "subsectionListDetailsItem";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new SubsectionListDetailsItemNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("li");
    element.className =
      config.theme.subsectionListDetailsItem || "subsectionListDetailsItem";
    return element;
  }

  updateDOM() {
    return false;
  }

  // this triggers on "Enter" key press
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter subsectionListDetailsItem");
    const textContent = this.getTextContent();
    if (textContent === "") {
      const newParagraphNode = new ParagraphNode();
      const parentNode = this.getParent();
      if (
        parentNode != null &&
        parentNode instanceof SubsectionListDetailsNode
      ) {
        // Insert the new paragraph node after the PartHeadingNode
        parentNode.insertAfter(newParagraphNode);
      }
      this.remove();
      return newParagraphNode;
    } else {
      const newBlock = new SubsectionListDetailsItemNode();
      const direction = this.getDirection();
      newBlock.setDirection(direction);
      this.insertAfter(newBlock, restoreSelection);
      return newBlock;
    }
  }

  //
  collapseAtStart() {
    console.log("collapseAtStart");
    const listNode = new SubsectionListDetailsItemNode();
    const children = this.getChildren();
    children.forEach((child) => {
      listNode.appendChild(child);
    });
    this.replace(listNode);
    return true;
  }
}

export function $createSubsectionListDetailsItemNode() {
  return new SubsectionListDetailsItemNode();
}

export function $isSubsectionListDetailsItemNode(node) {
  return node instanceof SubsectionListDetailsItemNode;
}

export const INSERT_SUBSECTIONLISTDETAILSITEM_COMMAND = createCommand(
  "insertSubsectionListDetailsItem"
);
