import { ShowInventory } from "../../lib/casserole";
import { FreshChoppedGarlic } from "../../lib/room";
import Thing from "../../lib/thing"

const playerThing: Thing = {
    name: 'player',

    room: 'startRoom',

    desc: () => <p>Here i am</p>,
    shortDesc: () => <p>Player</p>,

    commands: () => [
        {
            label: `Inventory`,
            action: turkey => <ShowInventory turkey={turkey} />
        },
        {
            label: `Examine myself`,
            action: () => <p>Hello world</p>
        },
        {
            label: `Look around`,

            action: turkey => {
                return <FreshChoppedGarlic turkey={turkey} />
            }
        },
    ]    
}

export default playerThing;