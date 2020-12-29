import { HttpErrorResponse } from '@angular/common/http';
import { ApiResource, Game, ResourceType } from '@app/modules/game';

export class StartGame {
    public static readonly type = '[Game] Create';
    constructor(public game: Game) {}
}

export class ResetGame {
    public static readonly type = '[Game] Reset';
}

export class GameFetchResourceRequested {
    public static readonly type = '[Game] Fetch resource requested';
    constructor(public resourceType: ResourceType) {}
}

export class GetRequiredResources {
    public static readonly type = '[Game] Get requested resource';
}

export class GameFetchResourceSucceeded {
    public static readonly type = '[Game] Fetch resource succeeded';
    constructor(public payload: { resource: readonly ApiResource[]; resourceType: ResourceType }) {}
}

export class GameFetchResourceFailed {
    public static readonly type = '[Game] Fetch resource failed';
    constructor(public error: HttpErrorResponse) {}
}
