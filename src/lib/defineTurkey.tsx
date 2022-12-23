import startRoom from "../game/rooms/startRoom";
import compass from "../game/things/compass";
import playerThing from "../game/things/playerThing";
import lerkey from "./lerkey";


export default (): lerkey => {
    return {
        startRoom: 'start',
        rooms: [
            startRoom
        ],
        things: [
            compass,
playerThing
        ],
        characters: [
            
        ],
    };
}


