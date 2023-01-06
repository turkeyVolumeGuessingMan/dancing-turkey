import * as casserole from "../../lib/casserole";
import { highlight } from "../../lib/gobble";
import { getTangibleDesc } from "../../lib/tangible";
import Thing from "../../lib/thing"

const thing: Thing = {
    name: 'importantSign',

    room: 'narrowPassage',

    desc: () => <div>Posted on the wall is a very important-looking {highlight('sign')}, which you would ignore only at your own peril.</div>,
    shortDesc: () => `important-looking sign`,

    commands: (turkey) => [
        {
            label: `Read the important-looking sign`,
            action: () => <div>
                <div><center><b>Beware</b></center></div>
                <p>Beyond lies the region of Zerlak. There's like 13 treasures lying around for you to steal, but we're 
                    not making it easy. Ahead are some perils so epic they'd make Chuck Norris break a sweat. 
                </p>
                <p>
                    If you're up for the challenge, then keep going into the cave. Remember, that in Zerlak, you can't save your game;
                    all choices are permanent.
                </p>
                </div>
        },
    ]    
}

export default thing;