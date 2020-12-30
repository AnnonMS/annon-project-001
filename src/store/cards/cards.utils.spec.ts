import { Card, RoundState } from '@app/modules/card';
import { GamePlayingResource, People } from '@app/modules/game';
import { DARTH_VADER_MOCK, MILLENNIUM_FALCON, mockPeopleResource, mockStarShipResource } from '@mocks/resource.mock';
import { GameStateResources } from '@store/game/game.state';
import {
    getResource,
    getResourceValue,
    getRoundStateTuple,
    pickRandomResources,
    updatedCards,
    updatePlayerState,
} from './cards.utils';

const mockResources: GameStateResources = {
    people: mockPeopleResource,
    starships: mockStarShipResource,
};

describe('.getResource', () => {
    it('should correctly determinate that game settings was set to PERSON , and return them', () => {
        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
        ];

        const actual = getResource(mockResources, GamePlayingResource.PERSON, cards);
        expect(actual).toEqual(mockPeopleResource);
    });

    it('should correctly determinate that game settings was set to starships, and return them', () => {
        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
        ];

        const actual = getResource(mockResources, GamePlayingResource.STARSHIP, cards);
        expect(actual).toEqual(mockStarShipResource);
    });

    it('should correctly determinate that we are in random mode and return the same type as the first player choose (people)', () => {
        (() => {
            const cards: readonly Card[] = [
                { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: DARTH_VADER_MOCK },
                { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            ];

            const actual = getResource(mockResources, GamePlayingResource.RANDOM, cards);
            expect(actual).toEqual(mockPeopleResource);
        })();

        (() => {
            const cards: readonly Card[] = [
                { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
                { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: DARTH_VADER_MOCK },
            ];

            const actual = getResource(mockResources, GamePlayingResource.RANDOM, cards);
            expect(actual).toEqual(mockPeopleResource);
        })();
    });

    it('should correctly determinate that we are in random mode and return the same type as the first player choose (starship)', () => {
        (() => {
            const cards: readonly Card[] = [
                { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: MILLENNIUM_FALCON },
                { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            ];

            const actual = getResource(mockResources, GamePlayingResource.RANDOM, cards);
            expect(actual).toEqual(mockStarShipResource);
        })();

        (() => {
            const cards: readonly Card[] = [
                { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
                { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: MILLENNIUM_FALCON },
            ];

            const actual = getResource(mockResources, GamePlayingResource.RANDOM, cards);
            expect(actual).toEqual(mockStarShipResource);
        })();
    });

    it('should correctly determinate that we are in random mode and return random resource', () => {
        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
        ];

        getResource(mockResources, GamePlayingResource.RANDOM, cards);
    });
});

describe('updatePlayerState', () => {
    it('should correctly update the player state based on the cards values (only player one PICKED CARD)', () => {
        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: DARTH_VADER_MOCK },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
        ];

        const actual = updatePlayerState(cards);

        const expected: readonly Card[] = [
            { id: '001', roundState: RoundState.PENDING, resource: DARTH_VADER_MOCK },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
        ];

        expect(actual).toEqual(expected);
    });

    it('should correctly update the player state when both players picked a card (DRAW)', () => {
        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.PENDING, resource: MILLENNIUM_FALCON },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: MILLENNIUM_FALCON },
        ];

        const actual = updatePlayerState(cards);

        const expected: readonly Card[] = [
            { id: '001', roundState: RoundState.DRAW, resource: MILLENNIUM_FALCON },
            { id: '002', roundState: RoundState.DRAW, resource: MILLENNIUM_FALCON },
        ];

        expect(actual).toEqual(expected);
    });

    it('should correctly update the player state when both players picked a card(player one LOSE)', () => {
        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.PENDING, resource: { ...DARTH_VADER_MOCK, mass: '40' } },
            {
                id: '002',
                roundState: RoundState.WAITING_FOR_USER_ACTION,
                resource: { ...DARTH_VADER_MOCK, mass: '60' },
            },
        ];

        const actual = updatePlayerState(cards);

        const expected: readonly Card[] = [
            { id: '001', roundState: RoundState.LOSE, resource: { ...DARTH_VADER_MOCK, mass: '40' } },
            { id: '002', roundState: RoundState.WON, resource: { ...DARTH_VADER_MOCK, mass: '60' } },
        ];

        expect(actual).toEqual(expected);
    });
});

describe('.pickRandomResources', () => {
    it('should correctly return one of the possible resources arrays (people or starships)', () => {
        const actual = pickRandomResources(mockResources);
        expect(Array.isArray(actual)).toBeTruthy();
    });
});

describe('.updatedCards', () => {
    it('should correctly update Cards on player action', () => {
        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
        ];

        const actual = updatedCards(0, cards, DARTH_VADER_MOCK);

        const expected: readonly Card[] = [
            { id: '001', roundState: RoundState.PENDING, resource: DARTH_VADER_MOCK },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
        ];

        expect(actual).toEqual(expected);
    });

    it('should correctly assign a PERSON resource to second player and set DRAW state', () => {
        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.PENDING, resource: DARTH_VADER_MOCK },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
        ];

        const actual = updatedCards(1, cards, DARTH_VADER_MOCK);

        const expected: readonly Card[] = [
            { id: '001', roundState: RoundState.DRAW, resource: DARTH_VADER_MOCK },
            { id: '002', roundState: RoundState.DRAW, resource: DARTH_VADER_MOCK },
        ];

        expect(actual).toEqual(expected);
    });

    it('should correctly assign a PERSON resource to second player', () => {
        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.PENDING, resource: { ...DARTH_VADER_MOCK, mass: '40' } },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
        ];

        const actual = updatedCards(1, cards, { ...DARTH_VADER_MOCK, mass: '60' });

        const expected: readonly Card[] = [
            { id: '001', roundState: RoundState.LOSE, resource: { ...DARTH_VADER_MOCK, mass: '40' } },
            { id: '002', roundState: RoundState.WON, resource: { ...DARTH_VADER_MOCK, mass: '60' } },
        ];

        expect(actual).toEqual(expected);
    });
});

describe('.utils.getResourceValue', () => {
    it('should correctly parse simple resource string value', () => {
        const mockData: People = { ...DARTH_VADER_MOCK, mass: '136' };
        const result = getResourceValue(mockData);
        expect(result).toBe(136);
    });

    it('should correctly parse complex resource string value with a dash', () => {
        const mockData: People = { ...DARTH_VADER_MOCK, mass: '30-165' };
        const result = getResourceValue(mockData);
        expect(result).toBe(30);
    });

    it('should correctly parse complex resource string value with a comma', () => {
        const mockData: People = { ...DARTH_VADER_MOCK, mass: '136,77' };
        const result = getResourceValue(mockData);
        expect(result).toBe(13677);
    });

    it('should correctly parse complex resource string value with a dot', () => {
        const mockData: People = { ...DARTH_VADER_MOCK, mass: '136.77' };
        const result = getResourceValue(mockData);
        expect(result).toBe(136.77);
    });

    it('should correctly parse undefined resource string value', () => {
        const result = getResourceValue(undefined);
        expect(result).toBe(null);
    });
});

describe('getRoundStateTuple', () => {
    it('should correctly determinate a first player win', () => {
        const result = getRoundStateTuple(100, 50);
        expect(result).toEqual([RoundState.WON, RoundState.LOSE]);
    });

    it('should correctly determinate a second player win', () => {
        const result = getRoundStateTuple(50, 100);
        expect(result).toEqual([RoundState.LOSE, RoundState.WON]);
    });

    it('should correctly determinate a draw', () => {
        const result = getRoundStateTuple(50, 50);
        expect(result).toEqual([RoundState.DRAW, RoundState.DRAW]);
    });

    it('should correctly determinate a pending state for first player', () => {
        const result = getRoundStateTuple(100, undefined);
        expect(result).toEqual([RoundState.PENDING, RoundState.WAITING_FOR_USER_ACTION]);
    });

    it('should correctly determinate a pending state for second player', () => {
        const result = getRoundStateTuple(undefined, 100);
        expect(result).toEqual([RoundState.WAITING_FOR_USER_ACTION, RoundState.PENDING]);
    });
});
