import { useEffect, useState } from "react";
import Command from "./command";
import Cranberries from "./cranberries";
import MashedPotato from "./mashedPotato";
import SpoiledPotato from "./spoiledPotato";
import RawPotato from "./rawPotato";
import Result from "./result";
import { GetRoomDesc } from "./room";
import { gravyBoat, reheatGravy, stowGravy } from "./gravy";
import lerkey from "./lerkey";


const validKeys = 'abcdefghijklmnopqrstuvwxyz ';


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
    const a = getCommands([...r.commands()], turkey);
    const y = [...a];
    const itemList = [...turkey.things.map(t => t.name), ...turkey.characters.map(t => t.name)];
    const inSameRoom = itemList.filter((thing: string) => gravy.rooms[thing] === r.name);
    const inPlayer = turkey.things.filter((thing) => gravy.inside[thing.name] === 'player');
    for (const itemName of inSameRoom) {
        for (const thing of turkey.things) {
            if (itemName === thing.name) {
                y.push(...getCommands(thing.commands(), turkey));
            }
        }
        for (const char of turkey.characters) {
            if (itemName === char.name) {
                y.push(...getCommands(char.commands(), turkey));
            }
        }
    }
    for (const thing of inPlayer) {
        y.push(...getCommands(thing.commands(), turkey));
    }
    return y;
}


const Gobble = (props: { turkey: lerkey }) => {

    const [keyBuf, setKeyBuf] = useState<string[]>([]);
    const [output, setOutput] = useState<Result | undefined>(undefined);
    const [selector, setSelector] = useState(1);
    const [command, setCommand] = useState<Command | undefined>(undefined);
    const [choices, setChoices] = useState<Command[]>([]);

    const clearStuffing = () => {
        setCommand(undefined);
        setKeyBuf([]);
        setSelector(1);
    }


    const execute = (s: Command) => {
        if (s) {
            if (s.verify) {
                const t = s.verify(props.turkey);
                if (t) {
                    setOutput({
                        text: t
                    });
                    clearStuffing();
                    return;
                }
            }
            const a = s.action(props.turkey) ?? <p></p>;
            setOutput({
                text: a
            });
            const gravy = reheatGravy();
            const turn = gravy.turn ?? 0;
            gravy.turn = turn + 1;
            stowGravy(gravy);
            clearStuffing();
        }
    }


    const handleGreenBeans = (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        if (validKeys.indexOf(key) > -1) {
            const suggestions = getAllSuggestions(props.turkey);
            const ch = getNarrowedSuggestions(suggestions, [...keyBuf, key]);
            if (ch.length > 1) {
                const buf = { ...ch[0] };
                ch[0] = { ...ch[1] };
                ch[1] = { ...buf };
            }
            setKeyBuf([...keyBuf, key]);
            setSelector(1);
            setChoices([...ch]);
            if (ch.length === 1) {
                setSelector(0);
                setCommand(ch[0]);
            } else {
                setSelector(1);
                setCommand(ch[1]);
            }
        } else if (key === 'backspace') {
            if (keyBuf.length > 0) {
                if (command) {
                    keyBuf.pop();
                    setKeyBuf([...keyBuf]);
                    setSelector(1);
                } else {
                    setKeyBuf([]);
                    setSelector(1);
                }
            }
        } else if (key === '=') {
            gravyBoat();
        } else if (key === 'arrowleft') {
            if ((selector > 0)) {
                setSelector(selector - 1);
                setCommand(choices[selector - 1]);
            }
        } else if (key === 'arrowright') {
            if ((selector < 2)) {
                setSelector(selector + 1);
                setCommand(choices[selector + 1]);
            }
        } else if (key === 'enter') {
            if (command) {
                execute(command);
            }
        }
    }


    useEffect(() => {

        document.addEventListener("keydown", handleGreenBeans);
        return () => document.removeEventListener("keydown", handleGreenBeans);

    });


    return <div className="primary-display">
        <Cranberries output={output ?? { text: <div><GetRoomDesc turkey={props.turkey} /></div> }} />
        {(keyBuf.length === 0) && <RawPotato />}
        {(keyBuf.length > 0 && command) && <MashedPotato selector={selector} execute={execute} suggestions={choices} />}
        {(keyBuf.length > 0 && !command) && <SpoiledPotato />}
    </div>

}

export default Gobble;
