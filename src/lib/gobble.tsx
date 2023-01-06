import { useEffect, useState } from "react";
import Command from "./command";
import Cranberries from "./cranberries";
import MashedPotato from "./mashedPotato";
import SpoiledPotato from "./spoiledPotato";
import RawPotato from "./rawPotato";
import Result from "./result";
import { FreshChoppedGarlic } from "./room";
import { pourTheGravy, reheatGravy, stowGravy } from "./gravy";
import lerkey from "./lerkey";




const lbl = (c: Command) =>
    c.label.toLowerCase().replaceAll('“', '').replaceAll('”', '').replaceAll('‘', '').replaceAll('’', '')


const getNarrowedSuggestions = (suggestions: Command[], k: string[]) => {
    const r = new RegExp(k.join('.*'));
    return [...suggestions].sort((a, b) => {
        const aScore = a.score ?? 0;
        const bScore = a.score ?? 0;
        return aScore - bScore;
    }).filter(choice => {
        const f = lbl(choice).search(r);
        if (f > -1) {
            return true;
        } else {
            return false;
        }
    });
}


const getCommands = (cmdList: Command[], turkey: lerkey) =>
    cmdList.filter(x => {
        if (x.check) {
            return x.check(turkey);
        }
        return true;
    })


const getAllSuggestions = (turkey: lerkey) => {
    const gravy = reheatGravy();
    const r = turkey.rooms.filter(x => x.name === gravy.rooms['player'])[0];
    const a = getCommands([...r.commands(turkey)], turkey);
    const y = [...a];
    const itemList = [...turkey.things.map(t => t.name), ...turkey.characters.map(t => t.name)];
    const inSameRoom = itemList.filter((thing: string) => gravy.rooms[thing] === r.name);
    const inPlayer = turkey.things.filter((thing) => gravy.inside[thing.name] === 'player');
    for (const itemName of inSameRoom) {
        for (const thing of turkey.things) {
            if (itemName === thing.name) {
                y.push(...getCommands(thing.commands(turkey), turkey));
            }
        }
        for (const char of turkey.characters) {
            if (itemName === char.name) {
                y.push(...getCommands(char.commands(turkey), turkey));
            }
        }
    }
    for (const thing of inPlayer) {
        y.push(...getCommands(thing.commands(turkey), turkey).map(t => {
            t.label = `${t.label} (in Inventory)`;
            return t;
        }));
    }
    return y;
}


const execute = (s: Command, setOutput: (s: Result | undefined) => void, turkey: lerkey, clearField: () => void) => {
    if (s) {
        if (s.verify) {
            const t = s.verify(turkey);
            if (t) {
                setOutput({
                    text: t
                });
                clearField();
                return;
            }
        }
        if (s.action) {
            const a = s.action(turkey) ?? <p></p>;
            setOutput({
                text: a
            });
            const gravy = reheatGravy();
            const turn = gravy.turn ?? 0;
            gravy.turn = turn + 1;
            stowGravy(gravy);
            clearField();
        }
    }
}


export let highlight = (str: string) => {
    return <em onClick={() => {}}>
        {str}
    </em>
}


const Gobble = (props: { turkey: lerkey }) => {

    const [keyBuf, setKeyBuf] = useState('');
    const [command, setCommand] = useState<Command | undefined>(undefined);
    const [output, setOutput] = useState<Result | undefined>(undefined);
    const [selector, setSelector] = useState(1);
    const [choices, setChoices] = useState<Command[]>([]);


    const clearStuffing = () => {
        setCommand(undefined);
        setKeyBuf('');
        setSelector(1);
    }



    const handleGreenBeans = (event: HTMLInputElement) => {
    }


    /*
    useEffect(() => {

        //document.addEventListener("keydown", handleGreenBeans);
        //return () => document.removeEventListener("keydown", handleGreenBeans);

    });
    */


    const cannedYams = (value: string) => {
        const suggestions = getAllSuggestions(props.turkey);
        const cb = getNarrowedSuggestions(suggestions, [...value]);
        if (cb.length > 1) {
            const buf = { ...cb[0] };
            cb[0] = { ...cb[1] };
            cb[1] = { ...buf };
        }
        setKeyBuf(value);
        setSelector(1);
        setChoices([...cb]);
        if (cb.length === 1) {
            setSelector(0);
            setCommand(cb[0]);
        } else {
            setSelector(1);
            setCommand(cb[1]);
        }
    }


    highlight = (str: string) => {
        return <em onClick={() => {
            cannedYams(str);
            setKeyBuf(str);
        }}>
            {str}
        </em>
    }


    return <div className="primary-display">
        <Cranberries output={output ?? { text: <div><FreshChoppedGarlic turkey={props.turkey} /></div> }} />
        {(keyBuf === '') && <RawPotato />}
        {(keyBuf.length > 0 && command) && <MashedPotato selector={selector} execute={c => execute(c, setOutput, props.turkey, clearStuffing)} suggestions={choices} />}
        {(keyBuf.length > 0 && !command) && <SpoiledPotato />}
        <form
            className="inputForm"
            onSubmit={e => {
                e.preventDefault();
            }}
        >
            <input type='text'
                className="inputField"
                autoFocus={true}
                value={keyBuf}
                onKeyDown={e => {
                    if (e.key.toLowerCase() === 'tab') {
                        e.preventDefault();
                        let s = selector + 1;
                        if (s >= choices.length || s > 2) {
                            s = 0;
                        }
                        setSelector(s);
                    }
                }}
                onChange={t => {
                    const value = t.currentTarget.value.toLowerCase() ?? '';
                    cannedYams(value);
                }}
            />
            <button
            className="formButton"
            onClick={() => {
                if (keyBuf === '=') {
                    pourTheGravy();
                } else {
                    if (keyBuf.length > 0 && command) {
                        execute(choices[selector], setOutput, props.turkey, clearStuffing);
                        setKeyBuf('');
                    }
                }
            }}>Enter</button>
        </form>
    </div>

}

export default Gobble;
