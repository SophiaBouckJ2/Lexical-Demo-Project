import "./Editor.css";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $createTextNode, $getRoot, FORMAT_TEXT_COMMAND } from "lexical";
import { HeadingNode, $createHeadingNode } from "@lexical/rich-text";

import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListNode, ListItemNode } from "@lexical/list";

import ToolbarPlugin from "../EditorToolbar/EditorToolbar";
import TreeViewPlugin from "./Plugins/TreeView/TreeViewPlugin";
import ListMaxIndentLevelPlugin from "./Plugins/ListMaxIndentLevel/ListMaxIndentLevelPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import {
  $createPartHeadingItemNode,
  $createPartHeadingNode,
  PartHeadingItemNode,
  PartHeadingNode,
  PartHeadingPlugin,
} from "./Plugins/Lists/PartHeading";
import {
  $createSectionHeadingItemNode,
  $createSectionHeadingNode,
  SectionHeadingItemNode,
  SectionHeadingNode,
  SectionHeadingPlugin,
} from "./Plugins/Lists/SectionHeading";
import {
  $createSubsectionItemNode,
  $createSubsectionNode,
  SubsectionItemNode,
  SubsectionNode,
  SubsectionPlugin,
} from "./Plugins/Lists/Subsection";
import {
  $createSubsectionListItemNode,
  $createSubsectionListNode,
  SubsectionListItemNode,
  SubsectionListNode,
  SubsectionListPlugin,
} from "./Plugins/Lists/SubsectionList";
import {
  $createSubsectionListDetailsItemNode,
  $createSubsectionListDetailsNode,
  SubsectionListDetailsItemNode,
  SubsectionListDetailsNode,
  SubsectionListDetailsPlugin,
} from "./Plugins/Lists/SubsectionListDetails";
import {
  $createSubSubsectionListDetailsItemNode,
  $createSubSubsectionListDetailsNode,
  SubSubsectionListDetailsItemNode,
  SubSubsectionListDetailsNode,
  SubSubsectionListDetailsPlugin,
} from "./Plugins/Lists/SubSubsectionListDetails";

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
  sectionHeading: `tools-editor-sectionHeading`,
  sectionHeadingItem: `tools-editor-sectionHeadingItem`,
  subsection: `tools-editor-subsection`,
  subsectionItem: `tools-editor-subsectionItem`,
  subsectionList: `tools-editor-subsectionList`,
  subsectionListItem: `tools-editor-subsectionListItem`,
  subsectionListDetails: `tools-editor-subsectionListDetails`,
  subsectionListDetailsItem: `tools-editor-subsectionListDetailsItem`,
  subSubsectionListDetails: `tools-editor-subSubsectionListDetails`,
  subSubsectionListDetailsItem: `tools-editor-subSubsectionListDetailsItem`,
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
    const partHeadingItemText = $createTextNode(
      "This is a part heading list item."
    );
    partHeadingItem.append(partHeadingItemText);
    partHeading.append(partHeadingItem);
    root.append(partHeading);
    // section heading
    const sectionHeading = $createSectionHeadingNode();
    const sectionHeadingItem = $createSectionHeadingItemNode();
    const sectionHeadingItemText = $createTextNode(
      "This is a section heading list item."
    );
    sectionHeadingItem.append(sectionHeadingItemText);
    sectionHeading.append(sectionHeadingItem);
    root.append(sectionHeading);
    // subsection
    const subsection = $createSubsectionNode();
    const subsectionItem = $createSubsectionItemNode();
    const subsectionItemText = $createTextNode(
      "This is a subsection list item."
    );
    subsectionItem.append(subsectionItemText);
    subsection.append(subsectionItem);
    root.append(subsection);
    // subsection list
    const subsectionList = $createSubsectionListNode();
    const subsectionListItem = $createSubsectionListItemNode();
    const subsectionListItemText = $createTextNode(
      "This is a subsection list."
    );
    subsectionListItem.append(subsectionListItemText);
    subsectionList.append(subsectionListItem);
    root.append(subsectionList);
    // subsection list details
    const subsectionListDetails = $createSubsectionListDetailsNode();
    const subsectionListDetailsItem = $createSubsectionListDetailsItemNode();
    const subsectionListDetailsItemText = $createTextNode(
      "This is a subsection list details."
    );
    subsectionListDetailsItem.append(subsectionListDetailsItemText);
    subsectionListDetails.append(subsectionListDetailsItem);
    root.append(subsectionListDetails);
    // sub subsection list details
    const subSubsectionListDetails = $createSubSubsectionListDetailsNode();
    const subSubsectionListDetailsItem =
      $createSubSubsectionListDetailsItemNode();
    const subSubsectionListDetailsItemText = $createTextNode(
      "This is a sub subsection list details."
    );
    subSubsectionListDetailsItem.append(subSubsectionListDetailsItemText);
    subSubsectionListDetails.append(subSubsectionListDetailsItem);
    root.append(subSubsectionListDetails);
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
      // heading
      HeadingNode,
      // built in list
      ListNode,
      ListItemNode,
      // part heading
      PartHeadingNode,
      PartHeadingItemNode,
      // section heading
      SectionHeadingNode,
      SectionHeadingItemNode,
      // subsection
      SubsectionNode,
      SubsectionItemNode,
      // subsection list
      SubsectionListNode,
      SubsectionListItemNode,
      // subsection list details
      SubsectionListDetailsNode,
      SubsectionListDetailsItemNode,
      // sub subsection list details
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
