import lerkey from "../../lib/lerkey";
import { StopList } from "../../lib/rng";
import { GetRoomDesc } from "../../lib/room";

const startRoom = {
    name: 'startRoom',

    desc: () => <p>The prison cell is cold!</p>,

    commands: () => [
        {
            label: `open chest`,
    
            action: () => <StopList list={[
                <p>There's nothing in the chest. Really!</p>,
                <p>Did you hear me? There's nothing in the chest!</p>,
                <p>For the last time....</p>
            ]} />
        },
        {
            label: `Look around`,

            action: (turkey: lerkey) => {
                return <GetRoomDesc turkey={turkey} />
            }
        },
        {
            label: `open map`,
    
            verify: () => <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sit amet commodo nulla facilisi nullam vehicula. Diam sollicitudin tempor id eu nisl nunc mi. Blandit aliquam etiam erat velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Aenean sed adipiscing diam donec adipiscing. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Vitae tortor condimentum lacinia quis. Egestas quis ipsum suspendisse ultrices. Morbi tincidunt augue interdum velit euismod in pellentesque massa.
            </div>,
    
            action: () => {
                console.log("action complete")
            },
    
            score: -10
        },
        {
            label: `read book`,
    
            verify: () => <p><q>I don't have the book.</q></p>,
    
            action: () => {
                console.log("action complete")
            }
        },
        {
            label: `wear hat`,
    
            verify: () => <p><q>I don't have the hat.</q></p>,
    
            action: () => {
                console.log("action complete")
            }
        }
    
    ]
};

export default startRoom;