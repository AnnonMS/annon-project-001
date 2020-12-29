import { DARTH_VADER_MOCK, MILLENNIUM_FALCON } from '@mocks/resource.mock';
import { isPeopleResource, isStartShipResource } from './guards';

describe('isStartShipResource', () => {
    it('should correctly validate resource type', () => {
        const actual = isStartShipResource(DARTH_VADER_MOCK);
        expect(actual).toBe(false);
    });

    it('should correctly validate resource type', () => {
        const actual = isStartShipResource(MILLENNIUM_FALCON);
        expect(actual).toBe(true);
    });
});

describe('isStartShipResource', () => {
    it('should correctly validate resource type', () => {
        const actual = isPeopleResource(DARTH_VADER_MOCK);
        expect(actual).toBe(true);
    });

    it('should correctly validate resource type', () => {
        const actual = isPeopleResource(MILLENNIUM_FALCON);
        expect(actual).toBe(false);
    });
});
