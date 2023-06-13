import React from "react";
import { ConversationProps } from "@/types";

interface Props {
  conversation: ConversationProps;
  selected?: boolean;
}

const ConvoBox = ({ conversation, selected }: Props) => {
  return <div>ConvoBox</div>;
};

export default ConvoBox;
