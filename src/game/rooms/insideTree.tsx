import * as casserole from "../../lib/casserole";
import { highlight } from "../../lib/gobble";
import { reheatGravy, stowGravy } from "../../lib/gravy";
import lerkey from "../../lib/lerkey";
import Room from "../../lib/room";


const fireLit = () => {
    const gravy = reheatGravy();
    const open = gravy.noFire ?? false;
    return open;
}


const setFire = () => {
    const gravy = reheatGravy();
    gravy.noFire = true;
    stowGravy(gravy);
}


const wickLit = () => {
    const gravy = reheatGravy();
    const open = gravy.wickLit ?? false;
    return open;
}


const room: Room = {
    name: 'insideTree',

    desc: () => <p>
        The innards of the tree form a comfortable little den, lined with shelves simply overflowing with old books.
        A dusty old stone hearth fills a corner, {(!fireLit()) ? `cold and dark` : `blazing with a hot cheery fire`}.
        There's a slight draft coming from the green {highlight('door')}.
    </p>,

    commands: (turkey: lerkey) => [
        {
            label: `Exit the green door (to outside)`,

            action: () => casserole.nav('doorStep', turkey)
    
        },
        {
            check: () => {
                if (!casserole.isDirectlyIn('longHandleWick', 'player')) {
                    return false;
                }
                if (!wickLit()) {
                    return false;
                }
                return true;
            },
            label: `Light the hearth with the long-handled wick`,

            action: () => {
                casserole.moveToRoom('longHandleWick', 'fz');
                setFire();
                casserole.moveToRoom('hearthPassage', 'insideTree');
                return <div>
                            <p>
                                The hearth comes to life with a good roaring orange glow.
                            </p>
                            <p>
                                With a low creak, a hidden passage with a secret stair descending {highlight('down')} into darkness opens
                                behind the hearth.
                            </p>
                        </div>;
            }
        }
    ]
};

export default room;