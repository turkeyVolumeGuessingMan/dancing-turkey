import * as casserole from "../../lib/casserole";
import { highlight } from "../../lib/gobble";
import { getTangibleDesc } from "../../lib/tangible";
import Thing from "../../lib/thing"

const thing: Thing = {
    name: 'hearthPassage',

    room: '',
    inside: '',

    desc: () => <div>A secret passage leads {highlight('down')} into darkness.</div>,
    shortDesc: () => `secret passage`,

    commands: (turkey) => [
        {
            label: `Climb down the stairs`,
            action: () => casserole.nav('narrowPassage', turkey)
        }
    ]    
}

export default thing;