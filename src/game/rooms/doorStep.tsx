import * as casserole from "../../lib/casserole";
import { highlight } from "../../lib/gobble";
import { reheatGravy, stowGravy } from "../../lib/gravy";
import lerkey from "../../lib/lerkey";


const treeDoorOpen = () => {
    const gravy = reheatGravy();
    const open = gravy.treeDoorOpen ?? false;
    return open;
}


const openTheTreeDoor = () => {
    const gravy = reheatGravy();
    gravy.treeDoorOpen = true;
    stowGravy(gravy);
}


const setFire = () => {
    const gravy = reheatGravy();
    gravy.wickLit = true;
    stowGravy(gravy);
}


const fireLit = () => {
    const gravy = reheatGravy();
    const open = gravy.wickLit ?? false;
    return open;
}


const room = {
    name: 'doorStep',

    desc: () => <p>
        An especially large oak stands in a dusty barren grove, where the last bit of sunlight peeks in from above.
        In an iron cage, hung from a high branch, a bit of candlelight flickers merrily. Set into the trunk is a 
        wide green {highlight('door')}, which {(treeDoorOpen()) ? `presently hangs open` : `is presently shut`}.
    </p>,

    commands: (turkey: lerkey) => [
        {
            check: () => !treeDoorOpen(),
            label: `Open the door`,
    
            action: () => {
                openTheTreeDoor();
                return <p>With a loud creak, the door opens.</p>
            },
            score: 10
        },
        {
            check: () => casserole.isDirectlyIn('longHandleWick', 'player'),
            label: `Lift the wick to the candle`,
    
            verify: () => {
                if (fireLit()) {
                    return <p>The wick is already lit.</p>
                }
            },

            action: () => {
                setFire();
                return <p>A tiny bit of flame now clings to the oiled wick.</p>
            },
            score: 10
        },
        {
            check: () => treeDoorOpen(),
            label: `Enter the green door`,
    
            action: () => casserole.nav('insideTree', turkey),
        },
        {
            label: `Take the candle`,
    
            verify: () => <p>It's just a bit beyond your reach.</p>,
        },
        {
            label: `Get the candle`,
    
            verify: () => <p>It's just a bit beyond your reach.</p>,
        },
    ]
};


export default room;