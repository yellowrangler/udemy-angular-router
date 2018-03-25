import { Injectable } from '@angular/core';
import { 
	Resolve,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';

interface Svr {
	id: number, 
	name: string, 
	status: string
}

@Injectable()
export class ServerResolver implements Resolve<Svr> {
	constructor(private serversService: ServersService) {}

	resolve(route: ActivatedRouteSnapshot,
		    state: RouterStateSnapshot) : Observable<Svr> | Promise<Svr> | Svr {
		return this.serversService.getServer(+route.params['id']);
	}
}