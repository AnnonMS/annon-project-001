import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceURL } from '@app/common';
import * as R from 'ramda';
import { ResourceType } from '.';
import { isPeopleResource } from './guards';
import { ApiResource, ApiResourceResponse } from './models';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    private baseURL = 'https://swapi.dev/api';

    constructor(private http: HttpClient) {}

    public fetchResources(resourceType: ResourceType) {
        const isValueUnknown = (resource: ApiResource) =>
            isPeopleResource(resource) ? resource.mass === 'unknown' : resource.crew === 'unknown';

        const aggregate = async (
            url: ResourceURL,
            resources: readonly ApiResource[] = [],
        ): Promise<readonly ApiResource[]> => {
            const { results, next } = await this.getPageResource(url);

            const pageResources = R.reject(isValueUnknown, results);
            const aggregatedResources = [...resources, ...pageResources];

            if (next !== null) {
                return aggregate(next, aggregatedResources);
            }

            return aggregatedResources;
        };

        return aggregate(`${this.baseURL}/${resourceType}`);
    }

    private getPageResource(url: ResourceURL): Promise<ApiResourceResponse> {
        return this.http.get<ApiResourceResponse>(url).toPromise();
    }
}
