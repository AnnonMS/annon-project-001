import { Card, RoundState } from '@app/modules/card';
import { ApiResource, GamePlayingResource, isStartShipResource } from '@app/modules/game';
import { GameStateResources } from '@store/game/game.state';
import * as R from 'ramda';

export const getRandomArrayIndex = <T>(array: readonly T[]): number => Math.floor(Math.random() * array.length);
/** istanbul ignore next */
export const getRandomArrayItem = <T>(array: readonly T[]): T => array[getRandomArrayIndex(array)];

export const getRoundStateTuple = (
    cardOneValue?: number | null,
    cardTwoValue?: number | null,
): readonly [RoundState, RoundState] => {
    if (R.isNil(cardOneValue)) {
        return [RoundState.WAITING_FOR_USER_ACTION, RoundState.PENDING];
    }

    if (R.isNil(cardTwoValue)) {
        return [RoundState.PENDING, RoundState.WAITING_FOR_USER_ACTION];
    }

    if (cardOneValue > cardTwoValue) {
        return [RoundState.WON, RoundState.LOSE];
    }

    if (cardOneValue < cardTwoValue) {
        return [RoundState.LOSE, RoundState.WON];
    }

    return [RoundState.DRAW, RoundState.DRAW];
};

export const getResource = (
    resources: GameStateResources,
    resourceType: GamePlayingResource,
    cards: readonly Card[],
): readonly ApiResource[] => {
    if (resourceType === GamePlayingResource.PERSON) {
        return resources.people;
    }

    if (resourceType === GamePlayingResource.STARSHIP) {
        return resources.starships;
    }

    return getRandomResource(resources, cards);
};

export const getRandomResource = (resources: GameStateResources, cards: readonly Card[]): readonly ApiResource[] => {
    const pickedResource = cards.find(({ resource }) => resource)?.resource;

    if (pickedResource) {
        return isStartShipResource(pickedResource) ? resources.starships : resources.people;
    }

    // should only choose a random resource when no players picked card yet,
    // to prevent case when people with mass would fought starships with crew;

    return pickRandomResources(resources);
};

export const pickRandomResources = (resources: GameStateResources): readonly ApiResource[] =>
    getRandomArrayItem([resources.people, resources.starships]);

export const getRandomResourceItem = (
    resources: GameStateResources,
    resourceType: GamePlayingResource,
    cards: readonly Card[],
) => {
    const resource = getResource(resources, resourceType, cards);
    return getRandomArrayItem(resource);
};

export const updatedCards = (index: number, cards: readonly Card[], randomItem: ApiResource): readonly Card[] =>
    R.pipe(assignRandomResourceItem, updatePlayerState)(cards, index, randomItem);

export const updatePlayerState = (cards: readonly Card[]) => {
    const cardOneValue = getResourceValue(cards[0].resource);
    const cardTwoValue = getResourceValue(cards[1].resource);
    const states = getRoundStateTuple(cardOneValue, cardTwoValue);

    return R.pipe(
        R.set(R.lensPath([0, 'roundState']), states[0]),
        R.set(R.lensPath([1, 'roundState']), states[1]),
    )(cards);
};

export const getResourceValue = (resource?: ApiResource | null): number | null => {
    const stringValue = resource ? (isStartShipResource(resource) ? resource.crew : resource.mass) : null;
    return stringValue ? parseFloat(stringValue.replace(/,/g, '')) : null;
};

export const assignRandomResourceItem = (cards: readonly Card[], index: number, resource: ApiResource) =>
    R.assocPath<ApiResource, readonly Card[]>([index, 'resource'], resource)(cards);
