import * as casserole from "../../lib/casserole";
import Thing from "../../lib/thing"

const thing: Thing = {
    name: 'compass',

    inside: 'player',

    desc: () => <p>It's an old brass compass.</p>,
    specialDesc: () => <p>An old brass compass lies on the ground.</p>,
    shortDesc: () => <p>a compass</p>,

    commands: () => [
        {
            label: `Read compass`,
            action: () => <p>The compass appears to be broken.</p>
        },
        {
            label: `Get the compass`,
            action: () => {
                casserole.moveToInventory('compass');
                return <p>Taken.</p>
            }
        },
        {
            label: `Drop the compass`,
            action: () => {
                casserole.dropFromInventory('compass');
                return <p>Dropped.</p>
            }
        }
    ]    
}

export default thing;