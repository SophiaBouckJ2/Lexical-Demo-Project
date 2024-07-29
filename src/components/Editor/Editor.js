import "./Editor.css";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { HeadingNode } from "@lexical/rich-text";

import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListNode, ListItemNode, $createListNode } from "@lexical/list";

import ToolbarPlugin from "../EditorToolbar/EditorToolbar";
import { BannerNode, BannerPlugin } from "./Plugins/Banner/BannerPlugin";
import TreeViewPlugin from "./Plugins/TreeView/TreeViewPlugin";
import ListMaxIndentLevelPlugin from "./Plugins/ListMaxIndentLevel/ListMaxIndentLevelPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { $createHeadingNode } from "@lexical/rich-text";
import {
  $createPartHeadingItemNode,
  $createPartHeadingNode,
  PartHeadingItemNode,
  PartHeadingNode,
  PartHeadingPlugin,
} from "./Plugins/Lists/PartHeading";

const theme = {
  heading: {
    h1: `tools-editor-h1`,
    h2: `tools-editor-h2`,
    h5: `tools-editor-endOfSection`,
  },
  list: {
    // ul: `tools-editor-ul`,
    ol: `tools-editor-ol`,
  },
  partHeading: `tools-editor-partHeading`,
  partHeadingItem: `tools-editor-partHeadingItem`,
};

function prepopulatedRichText() {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    // title
    const heading = $createHeadingNode("h1");
    heading.append($createTextNode("This Is Heading One "));
    root.append(heading);
    // subtitle
    const subheading = $createHeadingNode("h2");
    subheading.append($createTextNode("And Here Is Heading Two."));
    root.append(subheading);
    // part heading
    const partHeading = $createPartHeadingNode();
    const partHeadingItem = $createPartHeadingItemNode();
    const partHeadingItemText = $createTextNode("This is a list item.");
    partHeadingItem.append(partHeadingItemText);
    partHeading.append(partHeadingItem);
    root.append(partHeading);
    // end of section
    const endOfSection = $createHeadingNode("h5");
    endOfSection.append($createTextNode("This is the end of the section."));
    root.append(endOfSection);
  }
}

// -- example of how to read the editor state
// editorState.read(() => {
//   const htmlString = $generateHtmlFromNodes(editor, null);
//   console.log("htmlString: ", htmlString);
// });

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

// Custom plugin that logs the editor state to the console - useful for debugging - example for how to create a custom plugin
function MyOnChangePlugin(props) {
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [onChange, editor]);
}

function DisableShortcutFormatting(props) {
  const [editor] = useLexicalComposerContext();
  /* Disable bold and italic formatting */
  useEffect(() => {
    editor.registerCommand(
      FORMAT_TEXT_COMMAND,
      (event) => {
        if (["bold", "italic"].includes(event)) {
          return true;
        }
        return false;
      },
      4
    );
  }, [editor]);
}

function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      PartHeadingNode,
      PartHeadingItemNode,
    ],
    editorState: prepopulatedRichText,
  };

  return (
    // LexicalComposer is the root component for the Lexical Editor
    <LexicalComposer initialConfig={initialConfig} className="lexicalComposer">
      <ToolbarPlugin />
      <RichTextPlugin // RichTextPlugin is a plugin that provides rich text editing capabilities
        contentEditable={<ContentEditable className="contentEditable" />}
        placeholder={<div className="placeholder">Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ListPlugin />
      <PartHeadingPlugin />
      <TreeViewPlugin />
      {/* <ListMaxIndentLevelPlugin maxDepth={3} /> */}
      <TabIndentationPlugin />

      {/* // HistoryPlugin is a plugin that provides undo/redo functionality */}
      <HistoryPlugin />

      {/* // Disable bold and italic formatting via CMD-b and CMD-i */}
      <DisableShortcutFormatting />

      {/* // MyOnChangePlugin is a custom plugin that logs the editor state to the console */}
      {/* <MyOnChangePlugin onChange={(editorState) => console.log(editorState)} /> */}
    </LexicalComposer>
  );
}

export default Editor;
