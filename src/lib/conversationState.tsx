import { ReactElement } from "react";
import Command from "./command";

type ConversationState = {

    name: string;
    desc: () => ReactElement;
    firstDesc?: () => ReactElement;

    commands: () => Command[]

}

export default ConversationState;