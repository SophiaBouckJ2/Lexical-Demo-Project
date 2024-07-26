//this is a custom listitemnode that renders part x instead of 123 etc

import { ListNode, ListItemNode } from "@lexical/list";

// Custom List Item Node
class ListPartHeadingNode extends ListItemNode {
  static getType() {
    return "custom-list-item";
  }

  createDOM(config) {
    console.log("CONFIG", config);
    const dom = super.createDOM(config);
    this.updateDOM(dom);
    return dom;
  }

  updateDOM(dom) {
    const parent = this.getParent();
    console.log("PARENT", parent);
    console.log("DOM", dom);
    if (parent instanceof ListNode) {
      const index = parent.getChildren().indexOf(this) + 1;
      dom.style.listStyleType = "none";
      dom.setAttribute("data-marker", `PART ${index} - `);
      console.log("PART", index);
      console.log("DOM", dom);
    }
  }

  static importDOM() {
    const importers = super.importDOM();
    importers["LI"] = (node) => ({
      type: "custom-list-item",
      node,
    });
    return importers;
  }

  static importJSON(serializedNode) {
    return new ListPartHeadingNode(serializedNode.__key);
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "custom-list-item",
    };
  }

  static clone(node) {
    return new ListPartHeadingNode(node.__key);
  }
}

export { ListPartHeadingNode };
