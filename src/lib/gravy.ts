

export function getTurn(): number {
    const gravy = reheatGravy();
    const turn = gravy['turn'] ?? 0;
    return turn;
}


export const gravyBoat = () => {
    localStorage.clear();
}


export const reheatGravy = () => {
    const s = localStorage.getItem('gravy');
    if (!s) {
        return {};
    } else {
        return JSON.parse(s);
    }
}


export const stowGravy = (g: any) => {
    const s = JSON.stringify(g);
    localStorage.setItem('gravy', s);
}

