import * as casserole from "../../lib/casserole";
import { highlight } from "../../lib/gobble";
import lerkey from "../../lib/lerkey";
import Room from "../../lib/room";

const room: Room = {
    name: 'startRoom',

    desc: () => <p>Shadows grow longer in the gathering dark. A chill rides on the breeze whistling through the branches.
        Ahead, a spark of orange {highlight('light')} glimmers between the trees.
    </p>,

    commands: (turkey: lerkey) => [
        {
            label: `Follow the light`,
    
            action: () => casserole.nav('doorStep', turkey)
        },
        {
            label: `Explore the forest`,
    
            verify: () => <p>You could easily get lost.</p>,
    
        }
    ]
};

export default room;