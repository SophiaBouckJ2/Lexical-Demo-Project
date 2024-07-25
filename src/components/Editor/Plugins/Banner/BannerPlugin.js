// adding a new node type to lexical example
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  createCommand,
  COMMAND_PRIORITY_LOW,
  ElementNode,
  COMMAND_PRIORITY_HIGH,
  $createParagraphNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";

export class BannerNode extends ElementNode {
  static getType() {
    return "banner";
  }
  constructor(key) {
    super(key);
  }

  static clone(node) {
    return new BannerNode(node.__key);
  }

  createDOM(config) {
    const element = document.createElement("div");
    element.className = config.theme.banner;
    return element;
  }

  updateDOM() {
    return false;
  }

  insertNewAfter(selection, restoreSelection) {
    const newBlock = $createParagraphNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }

  collapseAtStart() {
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach((child) => {
      paragraph.appendChild(child);
    });
    this.replace(paragraph);
    return true;
  }
}

export function $createBannerNode() {
  return new BannerNode();
}

export function $isBannerNode(node) {
  return node instanceof BannerNode;
}

export const INSERT_BANNER_COMMAND = createCommand("insertBanner");

export function BannerPlugin() {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([BannerNode])) {
    throw new Error("BannerNode must be registered in the editor.");
  }
  editor.registerCommand(
    INSERT_BANNER_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, $createBannerNode);
      }
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
}
