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
  $createSubsectionListItemNode,
  $createSubsectionListNode,
} from "./SubsectionList";
import {
  traverseUpToNextParentNode,
  traverseUpToParentNode,
} from "./Utils/Utils";
import { SectionHeadingItemNode } from "./SectionHeading";

export class SubsectionNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    return "subsection";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new SubsectionNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("ol");
    element.className = config.theme.subsection || "subsection";
    return element;
  }

  updateDOM() {
    return false;
  }

  // this triggers on "Enter" key press
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter");
    const newBlock = new SubsectionItemNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.append(newBlock);
    return newBlock;
  }

  //
  collapseAtStart() {
    console.log("collapseAtStart");
    const listNode = new SubsectionNode();
    const children = this.getChildren();
    children.forEach((child) => {
      listNode.appendChild(child);
    });
    this.replace(listNode);
    return true;
  }
}

export function $createSubsectionNode() {
  return new SubsectionNode();
}

export function $isSubsectionNode(node) {
  return node instanceof SubsectionNode;
}

export const INSERT_SUBSECTION_COMMAND = createCommand("insertSubsection");

export function SubsectionPlugin() {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([SubsectionNode])) {
    throw new Error("Subsection Node must be registered in the editor.");
  }
  editor.registerCommand(
    INSERT_SUBSECTION_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const newSubsectionNode = $createSubsectionNode();
        const newSubsectionItemNode = $createSubsectionItemNode();
        newSubsectionNode.append(newSubsectionItemNode);
        $setBlocksType(selection, () => newSubsectionNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );

  // Register a command for the Tab key
  editor.registerCommand(
    KEY_TAB_COMMAND,
    (event) => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const node = selection.anchor.getNode();
        if ($isSubsectionItemNode(node)) {
          const parentNode = node.getParent();
          if ($isSubsectionNode(parentNode)) {
            // remove existing node
            node.remove();
            // create the new node
            const sectionHeading = $createSubsectionListNode();
            const sectionHeadingItem = $createSubsectionListItemNode();
            const sectionHeadingItemTextNode = $createTextNode();
            sectionHeadingItem.append(sectionHeadingItemTextNode);
            sectionHeading.append(sectionHeadingItem);
            parentNode.append(sectionHeading);
            // set the selection (cursor)
            const someKey = sectionHeadingItemTextNode.getKey();
            const nodeSelection = $createNodeSelection();
            nodeSelection.add(someKey);
            $setSelection(nodeSelection);

            event.preventDefault();
            return true;
          }
        }
      }
      return false;
    },
    COMMAND_PRIORITY_LOW
  );

  return null;
}

export class SubsectionItemNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    return "subsectionItem";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new SubsectionItemNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("li");
    element.className = config.theme.subsectionItem || "subsectionItem";
    return element;
  }

  updateDOM() {
    return false;
  }

  // this triggers on "Enter" key press
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter subsectionItem");
    const textContent = this.getTextContent();
    if (textContent === "") {
      const newSubsectionNode = new SectionHeadingItemNode();
      const parentNode = traverseUpToNextParentNode(this);
      if (parentNode) {
        parentNode.insertAfter(newSubsectionNode);
      }
      this.remove();
      return newSubsectionNode;
    } else {
      const newBlock = new SubsectionItemNode();
      const direction = this.getDirection();
      newBlock.setDirection(direction);
      this.insertAfter(newBlock, restoreSelection);
      return newBlock;
    }
  }

  //
  collapseAtStart() {
    console.log("collapseAtStart");
    const listNode = new SubsectionItemNode();
    const children = this.getChildren();
    children.forEach((child) => {
      listNode.appendChild(child);
    });
    this.replace(listNode);
    return true;
  }
}

export function $createSubsectionItemNode() {
  return new SubsectionItemNode();
}

export function $isSubsectionItemNode(node) {
  return node instanceof SubsectionItemNode;
}

export const INSERT_SUBSECTIONITEM_COMMAND = createCommand(
  "insertSubsectionItem"
);
