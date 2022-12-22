
import { ReactElement } from "react";
import ReactDOMServer from "react-dom/server";
import Command from "./command";
import { reheatGravy, stowGravy } from "./gravy";
import stringToHash from "./stringToHash";

type Tangible = {

    /**
     * Name of tangible. This is an internal identifier and will not be displayed.
     */
    name: string;

    /**
     * Get description of this game object. The output will be displayed at some point in the game.
     * @returns Description in React elements.
     */
    desc: () => ReactElement;

    /**
     * Get the description that will be used the first time this game object is displayed.
     * @returns Description in React elements.
     */
    firstDesc?: () => ReactElement;

    /**
     * List of commands to be associated with this game tangible.
     * @returns Command list.
     */
    commands: () => Command[]

}


export const getTangibleDesc = (n: Tangible) => {
    if (n?.firstDesc) {
        const first = n.firstDesc();
        const s = ReactDOMServer.renderToString(first);
        const hash = `dnd-${stringToHash(s)}`;
        const gravy = reheatGravy();
        if (!gravy.map[hash]) {
            gravy.map[hash] = true;
            stowGravy(gravy);
            return first;
        }
    }
    const r = n.desc();
    if (n) {
        return r;
    } else {
        return [];
    }
}

export default Tangible;
