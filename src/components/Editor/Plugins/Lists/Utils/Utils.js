import { RootNode } from "lexical";

export function traverseUpToRootNode(node) {
  let currentNode = node;
  while (currentNode && !(currentNode instanceof RootNode)) {
    console.log(currentNode);
    currentNode = currentNode.getParent();
  }
  return currentNode instanceof RootNode ? currentNode : null;
}

export function traverseUpToParentNode(node, parentType) {
  let currentNode = node;
  while (currentNode && !(currentNode instanceof RootNode)) {
    if (currentNode.getType() === parentType) {
      return currentNode;
    }
    currentNode = currentNode.getParent();
  }
  return null;
}

export default traverseUpToRootNode;
