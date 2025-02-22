import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  createCommand,
  COMMAND_PRIORITY_LOW,
  ElementNode,
  ParagraphNode,
  KEY_TAB_COMMAND,
  $createTextNode,
  $createNodeSelection,
  $setSelection,
  RootNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import {
  $createSubSubsectionListDetailsItemNode,
  $createSubSubsectionListDetailsNode,
} from "./SubSubsectionListDetails";
import {
  traverseDownToLastChildNodeofType,
  traverseDownToLastLeafNode,
  traverseDownToLastLeafNodeofType,
  traverseDownToNextChildNode,
  traverseUpToNextParentNode,
  traverseUpToParentNode,
} from "./Utils/Utils";
import { SubsectionListItemNode } from "./SubsectionList";

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

  // // Register a command for the Tab key
  // editor.registerCommand(
  //   KEY_TAB_COMMAND,
  //   (event) => {
  //     const selection = $getSelection();
  //     if ($isRangeSelection(selection)) {
  //       const node = selection.anchor.getNode();

  //       const parentNode = node.getParent();
  //       const nextLeafNode = traverseDownToLastChildNodeofType(
  //         parentNode,
  //         "subSubsectionListDetails"
  //       );

  //       // remove existing node
  //       node.remove();

  //       // create the new node
  //       const sectionHeadingItem = $createSubSubsectionListDetailsItemNode();
  //       const sectionHeadingItemTextNode = $createTextNode();
  //       sectionHeadingItem.append(sectionHeadingItemTextNode);

  //       // Insert the new node after the last child node of the parent
  //       if (nextLeafNode) {
  //         nextLeafNode.append(sectionHeadingItem);
  //       }

  //       // set the selection (cursor)
  //       const someKey = sectionHeadingItemTextNode.getKey();
  //       const nodeSelection = $createNodeSelection();
  //       nodeSelection.add(someKey);
  //       $setSelection(nodeSelection);

  //       event.preventDefault();

  //       return true;
  //     }
  //     return false;
  //   },
  //   COMMAND_PRIORITY_LOW
  // );

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
      const newSubsectionNode = new SubsectionListItemNode();
      const parentNode = traverseUpToNextParentNode(this);
      if (parentNode) {
        parentNode.insertAfter(newSubsectionNode);
      }
      this.remove();
      return newSubsectionNode;
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
