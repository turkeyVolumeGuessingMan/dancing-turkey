import { useEffect, useState, useContext } from "react";
import Command from "./command";
import Cranberries from "./cranberries";
import MashedPotato from "./mashedPotato";
import SpoiledPotato from "./spoiledPotato";
import RawPotato from "./rawPotato";
import Result from "./result";
import { StopList } from "./rng";
import { getTangibleDesc } from "./tangible";
import roastAFreshTurkey from "./turkey";
import { GetRoomDesc } from "./room";
import { gravyBoat, reheatGravy, stowGravy } from "./gravy";


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


const getCommands = (cmdList: Command[]) => 
    cmdList.filter(x => {
        if (x.check) {
            return x.check();
        }
        return true;
    })


const getAllSuggestions = () => {
    const turkey = roastAFreshTurkey();
    const player = turkey.things.filter(x => x.name === 'player')[0];
    const r = turkey.rooms.filter(x => x.name === player.room)[0];
    const a = getCommands(r.commands());
    const [c, t] = [turkey.characters, turkey.things].map(x => x.filter(x => x.room === player.room).map((x => getCommands(x.commands()))));
    const y = [...a];
    c.map(x => y.push(...x));
    t.map(x => y.push(...x));
    return y;
}


const Gobble = (props: {}) => {

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
                const t = s.verify();
                if (t) {
                    setOutput({
                        text: t
                    });
                    clearStuffing();
                    return;
                }
            }
            const a = s.action() ?? <p></p>;
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
            const suggestions = getAllSuggestions();
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
        <Cranberries output={output ?? { text: <div><GetRoomDesc /></div> }} />
        {(keyBuf.length === 0) && <RawPotato />}
        {(keyBuf.length > 0 && command) && <MashedPotato selector={selector} execute={execute} suggestions={choices} />}
        {(keyBuf.length > 0 && !command) && <SpoiledPotato />}
    </div>

}

export default Gobble;
