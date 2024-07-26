import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { $getSelection, $isRangeSelection } from "lexical";
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
// import { INSERT_BANNER_COMMAND } from "../Editor/Plugins/Banner/BannerPlugin";
// import { INSERT_CUSTOM_ORDERED_LIST_COMMAND } from "../Editor/Plugins/CustomOrderedList/CustomOrderedListPlugin";
// import { List } from "@mui/material";

const HeadingTypes = ["h1", "h2"];
const ListTypes = ["ol", "ul"];

function HeadingToolbarPlugin(props) {
  const [editor] = useLexicalComposerContext();
  const onClick = (heading) => {
    editor.update((editorState) => {
      const selection = $getSelection();
      console.log("SELECTION", selection);
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

// function ListToolbarPlugin(props) {
//   const [editor] = useLexicalComposerContext();
//   const onClick = (list) => {
//     if (list === "ol") {
//       editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
//       return;
//     }
//     editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
//   };
//   return ListTypes.map((list) => {
//     return (
//       <Grid item xs={0} key={list}>
//         <Button
//           variant={"outlined"}
//           onClick={() => {
//             onClick(list);
//           }}
//         >
//           {list}
//         </Button>
//       </Grid>
//     );
//   });
// }

// function ListPartHeadingPlugin(props) {
//   const [editor] = useLexicalComposerContext();
//   const onClick = () => {
//     editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
//   };
//   return (
//     <Grid item xs={0}>
//       <Button variant={"outlined"} onClick={onClick}>
//         List Part Heading
//       </Button>
//     </Grid>
//   );
// }

function ListPartHeadingPlugin() {
  const [editor] = useLexicalComposerContext();

  const onClick = () => {
    console.log("CLICKED");
    editor.update(() => {
      const selection = $getSelection();
      if (selection !== null) {
        console.log("SELECTION", selection);
        const nodes = selection.getNodes();
        console.log("NODES", nodes);
        nodes.forEach((node) => {
          if ($isTextNode(node)) {
            const listNode = $createListNode("custom-list-item");
            listNode.append(node);
            $getNodeByKey(node.getKey()).replace(listNode);
          }
        });
      }
    });
  };
  return (
    <Grid item xs={0}>
      <Button variant="outlined" onClick={onClick}>
        List Part Heading
      </Button>
    </Grid>
  );
}

// function BannerToolbarPlugin(props) {
//   const [editor] = useLexicalComposerContext();
//   const onClick = (event) => {
//     editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined);
//   };
//   return (
//     <Grid item xs={0}>
//       <Button variant={"outlined"} onClick={onClick}>
//         Banner
//       </Button>
//     </Grid>
//   );
// }

// function CustomOrderedListToolbarPlugin(props) {
//   const [editor] = useLexicalComposerContext();
//   const onClick = (event) => {
//     editor.dispatchCommand(INSERT_CUSTOM_ORDERED_LIST_COMMAND, undefined);
//   };
//   return (
//     <Grid item xs={0}>
//       <Button variant={"outlined"} onClick={onClick}>
//         Custom Ordered List
//       </Button>
//     </Grid>
//   );
// }

function ToolbarPlugin(props) {
  const [editor] = useLexicalComposerContext();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} columnSpacing={{ md: 0 }}>
          <HeadingToolbarPlugin />
          <ListPartHeadingPlugin />
        </Grid>
      </Box>
    </div>
  );
}

export default ToolbarPlugin;
