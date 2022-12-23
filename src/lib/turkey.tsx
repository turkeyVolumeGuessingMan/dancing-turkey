
import defineTurkey from "./defineTurkey";
import { reheatGravy, stowGravy } from "./gravy";
import lerkey from "./lerkey";



export default function roastAFreshTurkey(): lerkey {

    const gravy = reheatGravy();
    const turkey = defineTurkey();

    // fix locations
    const rooms = gravy.rooms;
    const inside = gravy.inside;

    if (!rooms) {
        gravy.rooms = {};
        for (const t of turkey.things) {
            gravy.rooms[t.name] = t.room;
        }
        for (const t of turkey.characters) {
            gravy.rooms[t.name] = t.room;
        }
        stowGravy(gravy);
    }
    if (!inside) {
        gravy.inside = {};
        for (const t of turkey.things) {
            gravy.inside[t.name] = t.inside;
        }
        stowGravy(gravy);
    }
    return turkey;
}

