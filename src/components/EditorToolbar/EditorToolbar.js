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
import { INSERT_PARTHEADING_COMMAND } from "../Editor/Plugins/Lists/PartHeading";
import { INSERT_SECTIONHEADING_COMMAND } from "../Editor/Plugins/Lists/SectionHeading";
import { INSERT_SUBSECTION_COMMAND } from "../Editor/Plugins/Lists/Subsection";
import { INSERT_SUBSECTIONLIST_COMMAND } from "../Editor/Plugins/Lists/SubsectionList";
import { INSERT_SUBSECTIONLISTDETAILS_COMMAND } from "../Editor/Plugins/Lists/SubsectionListDetails";
import { INSERT_SUBSUBSECTIONLISTDETAILS_COMMAND } from "../Editor/Plugins/Lists/SubSubsectionListDetails";

const TextTypes = ["paragraph"];
const HeadingTypes = ["h1", "h2", "h5"];
const ListTypes = ["ol", "ul"];

const TypeDisplayNames = {
  paragraph: "Paragraph",
  h1: "Heading 1",
  h2: "Heading 2",
  h5: "End Of Section",
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

function PartHeadingToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const onClick = () => {
    editor.dispatchCommand(INSERT_PARTHEADING_COMMAND, undefined);
  };
  return (
    <Grid item xs={0} key={"partheading"}>
      <Button
        variant={"outlined"}
        onClick={() => {
          onClick();
        }}
      >
        Part Heading
      </Button>
    </Grid>
  );
}

function SectionHeadingToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const onClick = () => {
    editor.dispatchCommand(INSERT_SECTIONHEADING_COMMAND, undefined);
  };
  return (
    <Grid item xs={0} key={"sectionheading"}>
      <Button
        variant={"outlined"}
        onClick={() => {
          onClick();
        }}
      >
        Section Heading
      </Button>
    </Grid>
  );
}

function SubsectionToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const onClick = () => {
    editor.dispatchCommand(INSERT_SUBSECTION_COMMAND, undefined);
  };
  return (
    <Grid item xs={0} key={"subsection"}>
      <Button
        variant={"outlined"}
        onClick={() => {
          onClick();
        }}
      >
        Subsection
      </Button>
    </Grid>
  );
}

function SubsectionListToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const onClick = () => {
    editor.dispatchCommand(INSERT_SUBSECTIONLIST_COMMAND, undefined);
  };
  return (
    <Grid item xs={0} key={"subsectionlist"}>
      <Button
        variant={"outlined"}
        onClick={() => {
          onClick();
        }}
      >
        Subsection List
      </Button>
    </Grid>
  );
}

function SubsectionListDetailsToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const onClick = () => {
    editor.dispatchCommand(INSERT_SUBSECTIONLISTDETAILS_COMMAND, undefined);
  };
  return (
    <Grid item xs={0} key={"subsectionlistdetails"}>
      <Button
        variant={"outlined"}
        onClick={() => {
          onClick();
        }}
      >
        Subsection List Details
      </Button>
    </Grid>
  );
}

function SubSubsectionListDetailsToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const onClick = () => {
    editor.dispatchCommand(INSERT_SUBSUBSECTIONLISTDETAILS_COMMAND, undefined);
  };
  return (
    <Grid item xs={0} key={"subsubsectionlistdetails"}>
      <Button
        variant={"outlined"}
        onClick={() => {
          onClick();
        }}
      >
        Sub Subsection List Details
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
          {/* <TextToolbarPlugin /> */}
          {/* <ListToolbarPlugin /> */}
          <PartHeadingToolbarPlugin />
          <SectionHeadingToolbarPlugin />
          <SubsectionToolbarPlugin />
          <SubsectionListToolbarPlugin />
          <SubsectionListDetailsToolbarPlugin />
          <SubSubsectionListDetailsToolbarPlugin />
        </Grid>
      </Box>
    </div>
  );
}

export default ToolbarPlugin;
