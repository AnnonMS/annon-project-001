import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceURL } from '@app/common';
import * as R from 'ramda';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResourceType } from '.';
import { ApiResource, ApiResourceResponse } from './models';
import { isPeopleResource } from './types';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    api = 'https://swapi.dev/api';

    constructor(private http: HttpClient) {}

    public fetchResources(resourceType: ResourceType) {
        const isValueUnknown = (resource: ApiResource) =>
            isPeopleResource(resource) ? resource.mass === 'unknown' : resource.crew === 'unknown';

        const aggregate = async (
            url: ResourceURL,
            resources: readonly ApiResource[] = [],
        ): Promise<readonly ApiResource[]> => {
            const { results, next } = await this.getPageResource(url).toPromise();

            const pageResources = R.reject(isValueUnknown, results);
            const aggregatedResources = [...resources, ...pageResources];

            if (next !== null) {
                return aggregate(next, aggregatedResources);
            }

            return aggregatedResources;
        };

        return aggregate(`${this.api}/${resourceType}`);
    }

    getPageResource(url: ResourceURL) {
        return this.http.get<ApiResourceResponse>(url).pipe(
            catchError((e: HttpErrorResponse) => {
                const error = new Error(
                    `Something went wrong and we couldn't fetch the data from the ${url}, statusCode: ${
                        e.statusText || 'unknown'
                    } `,
                );
                return throwError(error);
            }),
        );
    }
}
