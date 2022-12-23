import { reheatGravy, stowGravy } from "./gravy";
import lerkey from "./lerkey";

export const getInsideObj = () => {
    const gravy = reheatGravy();
    const inside = gravy.inside ?? {};
    return inside;
}


export const GetInventoryDesc = (props: {name: string, turkey: lerkey}) => {
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
    delete(roomObj[item]);
    gravy.inside = {...insideObj};
    gravy.rooms = {...roomObj};
    stowGravy(gravy);
}


export const moveOutOf = (item: string, room?: string) => {
    const gravy = reheatGravy();
    const insideObj = gravy.inside;
    const roomObj = gravy.rooms;
    const insideOf = insideObj[item];
    const r = (room) ? room : roomObj[insideOf];
    delete(insideObj[item]);
    roomObj[item] = r;
    gravy.inside = {...insideObj};
    gravy.rooms = {...roomObj};
    stowGravy(gravy);
}


export const moveToInventory = (item: string) => {
    moveInsideOf(item, 'player');
}


export const dropFromInventory = (item: string) => {
    moveOutOf(item);
}


export const ShowInventory = (props: {turkey: lerkey}) => {

    const inside = getInsideObj();

    return <div>
        <p>You're carrying:</p>
        {Object.keys(inside).filter(obj => inside[obj] === 'player').map(e => <GetInventoryDesc key={`inv-${e}`} name={e} turkey={props.turkey} />)}
        </div>
}
