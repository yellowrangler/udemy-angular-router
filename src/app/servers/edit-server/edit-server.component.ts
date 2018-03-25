import { Component, OnInit } from '@angular/core';
import { 
     ActivatedRoute, 
     Router,
     Params 
 } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;
  paramsSubscription: Subscription;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    
    this.route.queryParams
      .subscribe(
          (queryParams: Params) => {
            this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
          }
        )

    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.paramsSubscription = this.route.params
        .subscribe(
            (params: Params) => {
                const id = +params['id'];
                this.server = this.serversService.getServer(id);
                this.serverName = this.server.name;
                this.serverStatus = this.server.status;
            }
        );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route});
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
      if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
          return confirm('Do you want to discard your changes?')
      } else {
          return true;
      }
  }

}
