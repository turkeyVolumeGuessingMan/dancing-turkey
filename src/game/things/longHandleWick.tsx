import * as casserole from "../../lib/casserole";
import { highlight } from "../../lib/gobble";
import { reheatGravy } from "../../lib/gravy";
import Thing from "../../lib/thing"


const fireLit = () => {
    const gravy = reheatGravy();
    const open = gravy.wickLit ?? false;
    return open;
}


const thing: Thing = {
    name: 'longHandleWick',

    room: 'insideTree',

    desc: () => <p>Lying here is an oiled wick at the end of a long iron handle. {fireLit() ? `The wick is lit with a tiny flickering flame.` : ``}</p>,
    firstDesc: () => <p>
        A bit of oil {highlight('wick')} at the end of a long iron handle leans on the wall.
        It's probably what somebody used to light that candle outside.</p>,
    inventoryDesc: () => <p>a long-handled wick {fireLit() ? `(which is currently lit)` : ''}</p>,
    shortDesc: () => `long-handled ${fireLit() ? 'flickering wick.' : 'wick.'}`,

    commands: (turkey) => [
        casserole.examinableObj('longHandleWick', turkey),
        ...casserole.takeableObj('longHandleWick', turkey)
    ]    
}

export default thing;