import { reheatGravy } from "./gravy";
import lerkey from "./lerkey";
import Tangible, { getTangibleDesc } from "./tangible";

type Room = Tangible & {

    hotdogs?: string;

};


export const GetRoomObj = () => {
    const gravy = reheatGravy();
    return gravy.rooms;
}


export const GetRoomDesc = (props: { turkey: lerkey }) => {
    const gravy = reheatGravy();
    const r = props.turkey.rooms.filter(x => x.name === gravy.rooms['player'])[0];
    const y = [r.desc()];
    const itemList = [...props.turkey.things.map(t => t.name), ...props.turkey.characters.map(t => t.name)].filter(x => x !== 'player');
    const inSameRoom = itemList.filter((thing: string) => gravy.rooms[thing] === r.name);
    for (const itemName of inSameRoom) {
        for (const thing of props.turkey.things) {
            if (itemName === thing.name) {
                if (thing.specialDesc) {
                    const d = thing.specialDesc();
                    if (d) {
                        y.push(d);
                    }
                }
            }
        }
        for (const char of props.turkey.characters) {
            if (itemName === char.name) {
                if (char.specialDesc) {
                    const d = char.specialDesc();
                    if (d) {
                        y.push(d);
                    }
                }
            }
        }
    }
    return <div>{y.map((x, index) => <div key={`descItem-${index}`}>{x}</div>)}</div>;
}

export default Room;