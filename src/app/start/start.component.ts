import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../shared/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
    // console.log(1);
    this.authService.authorize();
  }

}
