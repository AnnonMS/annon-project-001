/* eslint-disable @typescript-eslint/no-unused-expressions */
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ResourceType } from '@app/modules/game';
import { mockPeopleResource, mockStarShipResource } from '@mocks/resource.mock';
import { GameService } from './game.service';
import { ApiResourceResponse } from './models';

describe('GameService', () => {
    let service: GameService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        service = TestBed.inject(GameService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make a correct call to the API for people resources', () => {
        const mockPeopleResourceApiResponse: ApiResourceResponse = {
            count: 9,
            next: null,
            previous: null,
            results: mockPeopleResource,
        };

        const expected = mockPeopleResource;

        service.fetchResources(ResourceType.PEOPLE).then((res) => {
            expect(res).toEqual(expected), fail;
            expect(res.length).toEqual(mockPeopleResourceApiResponse.count), fail;
        });

        const req = httpMock.expectOne((request) => request.url === `https://swapi.dev/api/people`);
        expect(req.request.method).toEqual('GET');

        req.flush(mockPeopleResourceApiResponse);
    });

    it('should make a correct call to the API for starship resources', () => {
        const mockStarshipsResourceApiResponse: ApiResourceResponse = {
            count: 10,
            next: 'http://swapi.dev/api/starships/?page=2',
            previous: null,
            results: mockStarShipResource,
        };

        const expected = mockStarShipResource;

        service.fetchResources(ResourceType.STAR_SHIPS).then((res) => {
            expect(res).toEqual(expected), fail;
            expect(res.length).toEqual(20), fail;
        });

        const URL = 'https://swapi.dev/api/starships';

        const req = httpMock.expectOne((request) => request.url === URL);
        expect(req.request.method).toEqual('GET');

        req.flush(mockStarshipsResourceApiResponse);
    });
});
