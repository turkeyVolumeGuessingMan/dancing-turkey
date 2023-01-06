import { ReactElement } from "react";
import lerkey from "./lerkey";

type Command = {

    label: string;
    check?: (turkey: lerkey) => boolean;
    once?: () => boolean;
    verify?: (turkey: lerkey) => ReactElement | void;
    action?: (turkey: lerkey) => ReactElement | void;
    score?: number;

}

export default Command;
