import Command from "./command";
import { reheatGravy, stowGravy } from "./gravy";
import lerkey from "./lerkey";
import { FreshChoppedGarlic } from "./room";

export const getInsideObj = () => {
    const gravy = reheatGravy();
    const inside = gravy.inside ?? {};
    return inside;
}


export const GetInventoryDesc = (props: { name: string, turkey: lerkey }) => {
    const item = props.turkey.things.filter(x => x.name === props.name)[0];
    if (item.shortDesc) {
        return item.shortDesc();
    } else {
        return <div>{item.name}</div>;
    }
}


export const moveInsideOf = (item: string, inside: string) => {
    const gravy = reheatGravy();
    const insideObj = gravy.inside;
    const roomObj = gravy.rooms;
    insideObj[item] = inside;
    delete (roomObj[item]);
    gravy.inside = { ...insideObj };
    gravy.rooms = { ...roomObj };
    stowGravy(gravy);
}


export const moveToRoom = (item: string, room: string) => {
    const gravy = reheatGravy();
    const insideObj = gravy.inside;
    const roomObj = gravy.rooms;
    roomObj[item] = room;
    delete (insideObj[item]);
    gravy.inside = { ...insideObj };
    gravy.rooms = { ...roomObj };
    stowGravy(gravy);
}


export const moveOutOf = (item: string, room?: string) => {
    const gravy = reheatGravy();
    const insideObj = gravy.inside;
    const roomObj = gravy.rooms;
    const insideOf = insideObj[item];
    const r = (room) ? room : roomObj[insideOf];
    delete (insideObj[item]);
    roomObj[item] = r;
    gravy.inside = { ...insideObj };
    gravy.rooms = { ...roomObj };
    stowGravy(gravy);
}


export const moveToInventory = (item: string) => {
    moveInsideOf(item, 'player');
}


export const dropFromInventory = (item: string) => {
    moveOutOf(item);
}


export const ShowInventory = (props: { turkey: lerkey }) => {

    const inside = getInsideObj();
    const inv = Object.keys(inside).filter(obj => inside[obj] === 'player');
    if (inv.length === 0) {
        return <div>
            <p>You’re carrying noting.</p>
        </div>
    }

    return <div>
        <p>You’re carrying:</p>
        {inv.map(e => <GetInventoryDesc key={`inv-${e}`} name={e} turkey={props.turkey} />)}
    </div>
}


export const isDirectlyIn = (item: string, container: string) => {
    const gravy = reheatGravy();
    const insideObj = gravy.inside;
    const roomObj = gravy.rooms;
    const insideOf = insideObj[item];
    if (insideOf) {
        return insideObj[item] === container;
    } else {
        return roomObj[item] === container;
    }
}


export const canSee = (item: string) => {
    const gravy = reheatGravy();
    const insideObj = gravy.inside;
    const roomObj = gravy.rooms;
    const insideOf = insideObj[item];
    const playerRoom = roomObj['player'];
    if (insideOf) {
        return insideObj['player'] === item;
    } else {
        return roomObj[item] === playerRoom;
    }
}


export const getName = (item: string, turkey: lerkey) => {
    const searchQuery = [turkey.rooms, turkey.characters, turkey.things];
    for (const s of searchQuery) {
        for (const n of s) {
            if (item === n.name) {
                return n.name;
            }
        }
        for (const n of s) {
            if (item === n.name) {
                return n.name;
            }
        }
        for (const n of s) {
            if (item === n.name) {
                return n.name;
            }
        }
    }
    return item;
}


export const endConversation = (turkey: lerkey) => {

    return <div></div>
}


export const nav = (room: string, turkey: lerkey) => {
    moveToRoom('player', room);
    return <FreshChoppedGarlic turkey={turkey} />
}


export const takeableObj = (cmdItem: string, turkey: lerkey): Command[] => {
    const name = `${getName(cmdItem, turkey)}`;
    const takenMsg = <p>Taken.</p>;
    const action = () => {
        moveToInventory(cmdItem);
        return takenMsg;
    }
    const check = () => (canSee(cmdItem) && !isDirectlyIn(cmdItem, 'player'));
    const labels = [
        `Get the ${name}`,
        `Pick up the ${name}`,
        `Grab the ${name}`,
        `Take the ${name}`
    ];
    return [
        ...labels.map(label => {
            return {
                check: check,
                label: label,
                action: action
            }
        }),
        {
            check: () => isDirectlyIn(cmdItem, 'player'),
            label: `Drop the ${name}`,
            action: () => {
                dropFromInventory(cmdItem);
                return <p>Dropped.</p>
            }
        }
    ];
}

