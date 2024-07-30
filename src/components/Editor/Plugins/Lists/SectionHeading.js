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

export class SectionHeadingNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    return "sectionHeading";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new SectionHeadingNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("ol");
    element.className = config.theme.sectionHeading || "sectionHeading";
    return element;
  }

  updateDOM() {
    return false;
  }

  // this triggers on "Enter" key press
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter");
    const newBlock = new SectionHeadingItemNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.append(newBlock);
    return newBlock;
  }

  //
  collapseAtStart() {
    console.log("collapseAtStart");
    const listNode = new SectionHeadingNode();
    const children = this.getChildren();
    children.forEach((child) => {
      listNode.appendChild(child);
    });
    this.replace(listNode);
    return true;
  }
}

export function $createSectionHeadingNode() {
  return new SectionHeadingNode();
}

export function $isSectionHeadingNode(node) {
  return node instanceof SectionHeadingNode;
}

export const INSERT_SECTIONHEADING_COMMAND = createCommand(
  "insertSectionHeading"
);

export function SectionHeadingPlugin() {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([SectionHeadingNode])) {
    throw new Error("Section Heading Node must be registered in the editor.");
  }
  editor.registerCommand(
    INSERT_SECTIONHEADING_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const newSectionHeadingNode = $createSectionHeadingNode();
        const newSectionHeadingItemNode = $createSectionHeadingItemNode();
        newSectionHeadingNode.append(newSectionHeadingItemNode);
        $setBlocksType(selection, () => newSectionHeadingNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
}

export class SectionHeadingItemNode extends ElementNode {
  /// element nodes have children so we use it here
  static getType() {
    return "sectionHeadingItem";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new SectionHeadingItemNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("li");
    element.className = config.theme.sectionHeadingItem || "sectionHeadingItem";
    return element;
  }

  updateDOM() {
    return false;
  }

  // this triggers on "Enter" key press
  insertNewAfter(selection, restoreSelection) {
    console.log("insertNewAfter sectionHeadingItem");
    const textContent = this.getTextContent();
    if (textContent === "") {
      const newParagraphNode = new ParagraphNode();
      const parentNode = this.getParent();
      if (parentNode != null && parentNode instanceof SectionHeadingNode) {
        // Insert the new paragraph node after the PartHeadingNode
        parentNode.insertAfter(newParagraphNode);
      }
      this.remove();
      return newParagraphNode;
    } else {
      const newBlock = new SectionHeadingItemNode();
      const direction = this.getDirection();
      newBlock.setDirection(direction);
      this.insertAfter(newBlock, restoreSelection);
      return newBlock;
    }
  }

  //
  collapseAtStart() {
    console.log("collapseAtStart");
    const listNode = new SectionHeadingItemNode();
    const children = this.getChildren();
    children.forEach((child) => {
      listNode.appendChild(child);
    });
    this.replace(listNode);
    return true;
  }
}

export function $createSectionHeadingItemNode() {
  return new SectionHeadingItemNode();
}

export function $isSectionHeadingItemNode(node) {
  return node instanceof SectionHeadingItemNode;
}

export const INSERT_SECTIONHEADINGITEM_COMMAND = createCommand(
  "insertSectionHeadingItem"
);
