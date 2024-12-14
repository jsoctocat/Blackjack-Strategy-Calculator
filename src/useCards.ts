import cards from './data/cards'

export interface Card {
    value: number;
    name: string;
}

const useCards = () => ({ data: cards });

export default useCards;