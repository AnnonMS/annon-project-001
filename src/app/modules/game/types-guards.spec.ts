import { DARTH_VADER_MOCK, MILLENNIUM_FALCON } from '@mocks/resource.mock';
import { isPeopleResource, isStartShipResource } from './types-guards';

describe('isStartShipResource', () => {
    it('should correctly detect its not a starship type', () => {
        const actual = isStartShipResource(DARTH_VADER_MOCK);
        expect(actual).toBe(false);
        // @ts-expect-error
        expect(DARTH_VADER_MOCK.crew).toBeUndefined();
    });

    it('should correctly detect its a starship type', () => {
        const actual = isStartShipResource(MILLENNIUM_FALCON);
        expect(actual).toBe(true);
        expect(MILLENNIUM_FALCON.crew).toBeDefined();
    });
});

describe('isPeopleResource', () => {
    it('should correctly detect its a person type', () => {
        const actual = isPeopleResource(DARTH_VADER_MOCK);
        expect(actual).toBe(true);
    });

    it('should correctly detect its not a person type', () => {
        const actual = isPeopleResource(MILLENNIUM_FALCON);
        expect(actual).toBe(false);
        // @ts-expect-error
        expect(MILLENNIUM_FALCON.mass).toBeUndefined();
    });
});
