import Tangible from './tangible';
import ConversationState from "./conversationState";
import Locatable from "./locatable";

type Character = Tangible & Locatable & {

    state: string;
    states: () => ConversationState[];

}

export default Character;