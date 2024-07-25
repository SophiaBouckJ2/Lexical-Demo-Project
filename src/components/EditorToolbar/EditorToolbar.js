import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { $getSelection, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";

// import { Button } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { INSERT_BANNER_COMMAND } from "../Editor/Plugins/Banner/BannerPlugin";

const HeadingTypes = ["h1", "h2", "h3"];
const ListTypes = ["ul", "ol"];

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
          {heading}
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
          {list}
        </Button>
      </Grid>
    );
  });
}

function BannerToolbarPlugin(props) {
  const [editor] = useLexicalComposerContext();
  const onClick = (event) => {
    editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined);
  };
  return (
    <Grid item xs={0}>
      <Button variant={"outlined"} onClick={onClick}>
        Banner
      </Button>
    </Grid>
  );
}

function ToolbarPlugin(props) {
  const [editor] = useLexicalComposerContext();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} columnSpacing={{ md: 0 }}>
          <HeadingToolbarPlugin />
          <ListToolbarPlugin />
          <BannerToolbarPlugin />
        </Grid>
      </Box>
    </div>
  );
}

export default ToolbarPlugin;
