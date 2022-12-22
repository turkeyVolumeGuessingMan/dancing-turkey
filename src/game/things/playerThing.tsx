import Thing from "../../lib/thing"

const playerThing: Thing = {
    name: 'player',

    room: 'startRoom',

    desc: () => <p>Here i am</p>,

    commands: () => [
        {
            label: `Inventory`,
            action: () => {
                return <p>I carry nothing.</p>
            }
        }
    ]    
}

export default playerThing;