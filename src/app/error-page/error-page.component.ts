import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
	errorMessage: string;

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		// you can use either of the 2. 
		// The first expects the message to stay static during the course of this user cycle.
		// The second uses subscribe to watch for changes in the message
		// this.errorMessage = this.route.snapshot.data['message'];

		this.route.data.subscribe(
			(data: Data) => {
				this.errorMessage = data['message'];
			}
		);
	}

}
