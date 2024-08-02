import "./Editor.css";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { HeadingNode } from "@lexical/rich-text";

import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListNode, ListItemNode } from "@lexical/list";

import ToolbarPlugin from "../EditorToolbar/EditorToolbar";
import TreeViewPlugin from "./Plugins/TreeView/TreeViewPlugin";
import ListMaxIndentLevelPlugin from "./Plugins/ListMaxIndentLevel/ListMaxIndentLevelPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import {
  PartHeadingItemNode,
  PartHeadingNode,
  PartHeadingPlugin,
} from "./Plugins/Lists/PartHeading";
import {
  SectionHeadingItemNode,
  SectionHeadingNode,
  SectionHeadingPlugin,
} from "./Plugins/Lists/SectionHeading";
import {
  SubsectionItemNode,
  SubsectionNode,
  SubsectionPlugin,
} from "./Plugins/Lists/Subsection";
import {
  SubsectionListItemNode,
  SubsectionListNode,
  SubsectionListPlugin,
} from "./Plugins/Lists/SubsectionList";
import {
  SubsectionListDetailsItemNode,
  SubsectionListDetailsNode,
  SubsectionListDetailsPlugin,
} from "./Plugins/Lists/SubsectionListDetails";
import {
  SubSubsectionListDetailsItemNode,
  SubSubsectionListDetailsNode,
  SubSubsectionListDetailsPlugin,
} from "./Plugins/Lists/SubSubsectionListDetails";
import { theme } from "../Theme/Theme";
import { prepopulatedRichText } from "../Theme/PrePopulatedRichText";

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
      SectionHeadingNode,
      SectionHeadingItemNode,
      SubsectionNode,
      SubsectionItemNode,
      SubsectionListNode,
      SubsectionListItemNode,
      SubsectionListDetailsNode,
      SubsectionListDetailsItemNode,
      SubSubsectionListDetailsNode,
      SubSubsectionListDetailsItemNode,
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
      <SectionHeadingPlugin />
      <SubsectionPlugin />
      <SubsectionListPlugin />
      <SubsectionListDetailsPlugin />
      <SubSubsectionListDetailsPlugin />
      <TreeViewPlugin />
      <ListMaxIndentLevelPlugin maxDepth={3} />
      <TabIndentationPlugin />{" "}
      {/* // TabIndentationPlugin is a plugin that provides tab indentation functionality */}
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
