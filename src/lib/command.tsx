import { ReactElement } from "react";

type Command = {

    label: string;
    check?: () => boolean;
    verify?: () => ReactElement | void;
    action: () => ReactElement | void;
    score?: number;

}

export default Command;
