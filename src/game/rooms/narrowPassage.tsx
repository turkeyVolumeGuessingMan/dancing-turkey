import * as casserole from "../../lib/casserole";
import { highlight } from "../../lib/gobble";
import lerkey from "../../lib/lerkey";
import Room from "../../lib/room";


const room: Room = {
    name: 'narrowPassage',

    desc: () => <p>
        The {highlight('stairs')} end at a tight passage sloping further {highlight('downwards')}. The sound of trickling water echos
        just ahead.
    </p>,

    commands: (turkey: lerkey) => [
        {
            label: `Climb up the stairs`,

            action: () => casserole.nav('insideTree', turkey)
    
        },
        {
            label: `Continue downwards`,

            action: () => casserole.nav('doorStep', turkey)
    
        },
    ]
};

export default room;