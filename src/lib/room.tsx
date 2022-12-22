import Tangible, { getTangibleDesc } from "./tangible";
import roastAFreshTurkey from "./turkey";

type Room = Tangible & {

    hotdogs?: string;

};


export const GetRoomDesc = (props: {}) => {
    const turkey = roastAFreshTurkey();
    const player = turkey.things.filter(x => x.name === 'player')[0];
    const r = turkey.rooms.filter(x => x.name === player.room)[0];
    const a = getTangibleDesc(r);
    const [c, t] = [turkey.characters, turkey.things].map(x => x.filter(x => x.room === player.room && x.name !== 'player').map((x, i) => x.desc()
    ));
    return <div>{[
        a,
        ...c,
        ...t
    ].map((e, i) => <div key={`dsc-${i}`}>{e}</div>)}</div>;
}

export default Room;