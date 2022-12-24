import * as casserole from "../../lib/casserole";
import Thing from "../../lib/thing"

const thing: Thing = {
    name: 'compass',

    inside: 'player',

    desc: () => <p>It's an old brass compass.</p>,
    specialDesc: () => <p>An old brass compass lies on the ground.</p>,
    shortDesc: () => <p>a compass</p>,

    commands: (turkey) => [
        {
            label: `Read compass`,
            action: () => <p>The compass appears to be broken.</p>
        },
        ...casserole.takeableObj('compass', turkey)
    ]    
}

export default thing;