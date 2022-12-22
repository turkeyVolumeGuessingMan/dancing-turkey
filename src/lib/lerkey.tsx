import Room from "./room";
import Thing from "./thing";
import Character from "./character";

type lerkey = {

    startRoom: string;
    rooms: Room[];
    things: Thing[];
    characters: Character[];
    
}

export default lerkey;