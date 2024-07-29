import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createTextNode, $getSelection, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $createListNode } from "@lexical/list";
import { $getNodeByKey, $isTextNode } from "lexical";

// import { Button } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const TextTypes = ["paragraph"];
const HeadingTypes = ["h1", "h2"];
const ListTypes = ["ol", "ul"];

const TypeDisplayNames = {
  paragraph: "End Of Section",
  h1: "Heading 1",
  h2: "Heading 2",
  ol: "Ordered List",
  ul: "Unordered List",
};

function TextToolbarPlugin(props) {
  const [editor] = useLexicalComposerContext();
  const onClick = (format) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText(format);
      }
    });
  };
  return TextTypes.map((type) => {
    return (
      <Grid item xs={0} key={type}>
        <Button
          variant={"outlined"}
          onClick={() => {
            onClick(type);
          }}
        >
          {TypeDisplayNames[type]}
        </Button>
      </Grid>
    );
  });
}

function HeadingToolbarPlugin(props) {
  const [editor] = useLexicalComposerContext();
  const onClick = (heading) => {
    editor.update((editorState) => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(heading));
      }
    });
  };
  return HeadingTypes.map((heading) => {
    return (
      <Grid item xs={0} key={heading}>
        <Button
          variant={"outlined"}
          onClick={() => {
            onClick(heading);
          }}
        >
          {TypeDisplayNames[`${heading}`]}
        </Button>
      </Grid>
    );
  });
}

function ListToolbarPlugin(props) {
  const [editor] = useLexicalComposerContext();

  const onClick = (list) => {
    if (list === "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };
  return ListTypes.map((list) => {
    return (
      <Grid item xs={0} key={list}>
        <Button
          variant={"outlined"}
          onClick={() => {
            onClick(list);
          }}
        >
          {TypeDisplayNames[`${list}`]}
        </Button>
      </Grid>
    );
  });
}

function ToolbarPlugin(props) {
  const [editor] = useLexicalComposerContext();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} columnSpacing={{ md: 0 }}>
          <HeadingToolbarPlugin />
          <ListToolbarPlugin />
          <TextToolbarPlugin />
        </Grid>
      </Box>
    </div>
  );
}

export default ToolbarPlugin;
