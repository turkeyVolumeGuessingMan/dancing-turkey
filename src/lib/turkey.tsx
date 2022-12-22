import startRoom from "../game/rooms/startRoom";
import playerThing from "../game/things/playerThing";
import lerkey from "./lerkey";


export default function roastAFreshTurkey(): lerkey {

    return {
        startRoom: 'start',
        rooms: [
            startRoom,
        ],
        things: [
            playerThing,
        ],
        characters: [],
    };
}

