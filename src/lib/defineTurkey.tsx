import startRoom from "../game/rooms/startRoom";
import doorStep from "../game/rooms/doorStep";
import sealedEnvelope from "../game/things/sealedEnvelope";
import longHandleWick from "../game/things/longHandleWick";
import playerThing from "../game/things/playerThing";
import lerkey from "./lerkey";
import insideTree from "../game/rooms/insideTree";
import hearthPassage from "../game/things/hearthPassage";
import narrowPassage from "../game/rooms/narrowPassage";
import importantSign from "../game/things/importantSign";


export default (): lerkey => {
    return {
        startRoom: 'start',
        rooms: [
            startRoom,
            doorStep,
            insideTree,
            narrowPassage,
        ],
        things: [
            importantSign,
            sealedEnvelope,
            longHandleWick,
            hearthPassage,
            playerThing
        ],
        characters: [
            
        ],
    };
}


