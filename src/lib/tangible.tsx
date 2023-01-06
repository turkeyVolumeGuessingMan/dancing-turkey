
import { ReactElement } from "react";
import ReactDOMServer from "react-dom/server";
import Command from "./command";
import { reheatGravy, stowGravy } from "./gravy";
import lerkey from "./lerkey";
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
     * Returns the description of the object in an inventory listing.
     * @returns Description in React elements.
     */
    inventoryDesc?: () => ReactElement;

    /**
     * Get a one or two word description for the tangible object.
     * @returns Description in React elements.
     */
    shortDesc?: () => string;

    /**
     * List of commands to be associated with this game tangible.
     * @returns Command list.
     */
    commands: (turkey: lerkey) => Command[]

}


export const getTangibleDesc = (n: Tangible) => {
    if (n.firstDesc) {
        const first = n.firstDesc();
        const s = ReactDOMServer.renderToString(first);
        const hash = `dnd-${stringToHash(s)}`;
        const gravy = reheatGravy();
        const turn = gravy.turn;
        if (!gravy[hash] || gravy[hash] === turn) {
            gravy[hash] = turn;
            stowGravy(gravy);
            return first;
        }
    }
    const r = n.desc();
    if (n) {
        return r;
    }
    return <div></div>;
}

export default Tangible;
