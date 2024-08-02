import { $createTextNode, $getRoot } from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import {
  $createPartHeadingItemNode,
  $createPartHeadingNode,
} from "../Editor/Plugins/Lists/PartHeading";
import {
  $createSectionHeadingItemNode,
  $createSectionHeadingNode,
} from "../Editor/Plugins/Lists/SectionHeading";
import {
  $createSubsectionItemNode,
  $createSubsectionNode,
} from "../Editor/Plugins/Lists/Subsection";
import {
  $createSubsectionListItemNode,
  $createSubsectionListNode,
} from "../Editor/Plugins/Lists/SubsectionList";
import {
  $createSubsectionListDetailsItemNode,
  $createSubsectionListDetailsNode,
} from "../Editor/Plugins/Lists/SubsectionListDetails";
import {
  $createSubSubsectionListDetailsItemNode,
  $createSubSubsectionListDetailsNode,
} from "../Editor/Plugins/Lists/SubSubsectionListDetails";

export function prepopulatedRichText() {
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
    const partHeadingItemText = $createTextNode("This is a part heading item.");
    partHeadingItem.append(partHeadingItemText);
    partHeading.append(partHeadingItem);
    root.append(partHeading);
    // section heading
    const sectionHeading = $createSectionHeadingNode();
    const sectionHeadingItem = $createSectionHeadingItemNode();
    const sectionHeadingItemText = $createTextNode(
      "This is a section heading item."
    );
    sectionHeadingItem.append(sectionHeadingItemText);
    sectionHeading.append(sectionHeadingItem);
    partHeading.append(sectionHeading);
    // subsection
    const subsection = $createSubsectionNode();
    const subsectionItem = $createSubsectionItemNode();
    const subsectionItemText = $createTextNode("This is a subsection item.");
    subsectionItem.append(subsectionItemText);
    subsection.append(subsectionItem);
    sectionHeading.append(subsection);
    // subsection list
    const subsectionList = $createSubsectionListNode();
    const subsectionListItem = $createSubsectionListItemNode();
    const subsectionListItemText = $createTextNode(
      "This is a subsection list item."
    );
    subsectionListItem.append(subsectionListItemText);
    subsectionList.append(subsectionListItem);
    subsection.append(subsectionList);
    // subsection list details
    const subsectionListDetails = $createSubsectionListDetailsNode();
    const subsectionListDetailsItem = $createSubsectionListDetailsItemNode();
    const subsectionListDetailsItemText = $createTextNode(
      "This is a subsection list details item."
    );
    subsectionListDetailsItem.append(subsectionListDetailsItemText);
    subsectionListDetails.append(subsectionListDetailsItem);
    subsectionList.append(subsectionListDetails);
    // sub subsection list details
    const subSubsectionListDetails = $createSubSubsectionListDetailsNode();
    const subSubsectionListDetailsItem =
      $createSubSubsectionListDetailsItemNode();
    const subSubsectionListDetailsItemText = $createTextNode(
      "This is a sub subsection list details item."
    );
    subSubsectionListDetailsItem.append(subSubsectionListDetailsItemText);
    subSubsectionListDetails.append(subSubsectionListDetailsItem);
    subsectionListDetails.append(subSubsectionListDetails);
    // end of section
    const endOfSection = $createHeadingNode("h5");
    endOfSection.append($createTextNode("This is the end of the section."));
    root.append(endOfSection);
  }
}
