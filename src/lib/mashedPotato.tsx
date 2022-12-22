import { useEffect } from "react";
import Command from "./command";


const MashedPotato = (props: {
    selector: number,
    execute: (s: Command) => void,
    suggestions: Command[],
}) => {

    const selector = props.selector;
    const choices = [...props.suggestions];
    choices.length = 3;
    return <div className="potatoBar">
        {choices.map((s, index) => {
            return <button
                key={`ks-${s.label}`}
                className={(selector === index) ? "selectedSuggestion" : "suggestions"}
                onClick={() => props.execute(s)}
            >
                {s.label}
            </button>
        })}
    </div>
}


export default MashedPotato;