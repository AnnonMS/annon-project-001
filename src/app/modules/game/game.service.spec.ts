/* eslint-disable @typescript-eslint/no-unused-expressions */
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockPeopleResource, mockStarShipResource } from '@mocks/resource.mock';
import { GameService } from './game.service';
import { ApiResourceResponse } from './models';
import { ResourceType } from './types/game.types';

describe('GameService', () => {
    let service: GameService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GameService],
            imports: [HttpClientTestingModule],
        });

        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(GameService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should retrieve people resources from API via GET method', (done) => {
        const mockPeopleResourceApiResponse: ApiResourceResponse = {
            count: 9,
            next: null,
            previous: null,
            results: mockPeopleResource,
        };

        service.fetchResources(ResourceType.PEOPLE).then((res) => {
            expect(res).toEqual(mockPeopleResource), fail;
            expect(res.length).toEqual(mockPeopleResourceApiResponse.count), fail;
            done();
        });

        const req = httpMock.expectOne(`${service.api}/people`);
        expect(req.request.method).toEqual('GET');
        req.flush(mockPeopleResourceApiResponse);
    });

    it('should retrieve starships resources from API via GET method', (done) => {
        const mockStarshipsResourceApiResponse: ApiResourceResponse = {
            count: 10,
            next: null,
            previous: null,
            results: mockStarShipResource,
        };

        service.fetchResources(ResourceType.STAR_SHIPS).then((res) => {
            expect(res).toEqual(mockStarShipResource), fail;
            expect(res.length).toEqual(mockStarshipsResourceApiResponse.count), fail;
            done();
        });

        const req = httpMock.expectOne(`${service.api}/starships`);
        expect(req.request.method).toEqual('GET');

        req.flush(mockStarshipsResourceApiResponse);
    });
});
