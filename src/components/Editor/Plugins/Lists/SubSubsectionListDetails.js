import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  createCommand,
  COMMAND_PRIORITY_LOW,
  ElementNode,
  ParagraphNode,
  KEY_TAB_COMMAND,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";

export class SubSubsectionListDetailsNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    return "subSubsectionListDetails";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new SubSubsectionListDetailsNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("ol");
    element.className =
      config.theme.subSubsectionListDetails || "subSubsectionListDetails";
    return element;
  }

  updateDOM() {
    return false;
  }

  // this triggers on "Enter" key press
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter");
    const newBlock = new SubSubsectionListDetailsItemNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.append(newBlock);
    return newBlock;
  }

  //
  collapseAtStart() {
    console.log("collapseAtStart");
    const listNode = new SubSubsectionListDetailsNode();
    const children = this.getChildren();
    children.forEach((child) => {
      listNode.appendChild(child);
    });
    this.replace(listNode);
    return true;
  }
}

export function $createSubSubsectionListDetailsNode() {
  return new SubSubsectionListDetailsNode();
}

export function $isSubSubsectionListDetailsNode(node) {
  return node instanceof SubSubsectionListDetailsNode;
}

export const INSERT_SUBSUBSECTIONLISTDETAILS_COMMAND = createCommand(
  "insertSubSubsectionListDetails"
);

export function SubSubsectionListDetailsPlugin() {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([SubSubsectionListDetailsNode])) {
    throw new Error(
      "Sub Subsection List Node must be registered in the editor."
    );
  }
  editor.registerCommand(
    INSERT_SUBSUBSECTIONLISTDETAILS_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const newSubSubsectionListDetailsNode =
          $createSubSubsectionListDetailsNode();
        const newSubSubsectionListDetailsItemNode =
          $createSubSubsectionListDetailsItemNode();
        newSubSubsectionListDetailsNode.append(
          newSubSubsectionListDetailsItemNode
        );
        $setBlocksType(selection, () => newSubSubsectionListDetailsNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );

  editor.registerCommand(
    KEY_TAB_COMMAND,
    (event) => {
      // do nothing
      event.preventDefault();
      return true;
    },
    COMMAND_PRIORITY_LOW
  );

  return null;
}

export class SubSubsectionListDetailsItemNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    return "subSubsectionListDetailsItem";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new SubSubsectionListDetailsItemNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("li");
    element.className =
      config.theme.subSubsectionListDetailsItem ||
      "subSubsectionListDetailsItem";
    return element;
  }

  updateDOM() {
    return false;
  }

  // this triggers on "Enter" key press
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter subSubsectionListDetailsItem");
    const textContent = this.getTextContent();
    if (textContent === "") {
      const newParagraphNode = new ParagraphNode();
      const parentNode = this.getParent();
      if (
        parentNode != null &&
        parentNode instanceof SubSubsectionListDetailsNode
      ) {
        // Insert the new paragraph node after the PartHeadingNode
        parentNode.insertAfter(newParagraphNode);
      }
      this.remove();
      return newParagraphNode;
    } else {
      const newBlock = new SubSubsectionListDetailsItemNode();
      const direction = this.getDirection();
      newBlock.setDirection(direction);
      this.insertAfter(newBlock, restoreSelection);
      return newBlock;
    }
  }

  //
  collapseAtStart() {
    console.log("collapseAtStart");
    const listNode = new SubSubsectionListDetailsItemNode();
    const children = this.getChildren();
    children.forEach((child) => {
      listNode.appendChild(child);
    });
    this.replace(listNode);
    return true;
  }
}

export function $createSubSubsectionListDetailsItemNode() {
  return new SubSubsectionListDetailsItemNode();
}

export function $isSubSubsectionListDetailsItemNode(node) {
  return node instanceof SubSubsectionListDetailsItemNode;
}

export const INSERT_SUBSUBSECTIONLISTDETAILSITEM_COMMAND = createCommand(
  "insertSubSubsectionListDetailsItem"
);
