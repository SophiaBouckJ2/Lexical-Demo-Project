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

export function traverseUpToNextParentNode(node) {
  return node.getParent();
}

// retrieve the last leaf node
export function traverseDownToLastChildNodeofType(node, type) {
  let currentNode = node;
  let children = currentNode.getChildren();
  console.log(children);
  for (let i = children.length - 1; i >= 0; i--) {
    if (children[i].getType() === type) {
      return children[i];
    }
  }
  return null;
}

export default traverseUpToRootNode;
