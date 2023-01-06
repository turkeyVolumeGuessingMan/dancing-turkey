import * as casserole from "../../lib/casserole";
import { getTangibleDesc } from "../../lib/tangible";
import Thing from "../../lib/thing"

const thing: Thing = {
    name: 'sealedEnvelope',

    inside: 'player',

    desc: () => <div>A sealed envelope lies in the dust.</div>,
    shortDesc: () => `sealed envelope`,
    inventoryDesc: () => <p>a sealed envelope</p>,

    commands: (turkey) => [
        {
            label: `Open the envelope`,
            action: () => <p>Um, it doesn't belong to you.</p>
        },
        {
            label: `Read the envelope`,
            action: () => <p><q>Deliver to Mr Troll</q></p>
        },
        casserole.examinableObj('sealedEnvelope', turkey),
        ...casserole.takeableObj('sealedEnvelope', turkey)
    ]    
}

export default thing;