import { ShowInventory } from "../../lib/casserole";
import { reheatGravy } from "../../lib/gravy";
import { FreshChoppedGarlic } from "../../lib/room";
import Thing from "../../lib/thing"

const playerThing: Thing = {
    name: 'player',

    room: 'startRoom',

    desc: () => <p>Here i am</p>,
    shortDesc: () => `player`,

    commands: () => [
        {
            label: `Inventory`,
            action: turkey => {
                const gravy = reheatGravy();
                gravy.showInventory = true;
                return <ShowInventory turkey={turkey} />
            }
        },
        {
            label: `Examine myself`,
            action: () => <p>You look very much like yourself.</p>
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