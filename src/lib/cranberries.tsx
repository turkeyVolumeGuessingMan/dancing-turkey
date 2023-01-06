import { ReactElement } from "react";
import ReactDOMServer from 'react-dom/server';
import Result from "./result";


function Cranberries(props: { output: Result }) {

    const str = ReactDOMServer.renderToString(props.output.text);
    const centered = (str.length < 60) ? true : false;

    return <div className="stuffingArea">
        {(centered) ? <div className="centerAlign">{props.output.text}</div> : <div className="leftAlign">{props.output.text}</div>}
    </div>;
}

export default Cranberries;
