import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from '../shared/authorization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAccount } from '../shared/userAccount.model';
import { APP_URL, PROVIDERS_PAGE_URL } from '../shared/config';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  hasAccount = false;
  code: string;
  customerId: string;
  windowHandle: any;
  account: UserAccount;
  constructor(private authService: AuthorizationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let code = params['code'];
      if (localStorage.getItem('access_token')) {
        localStorage.removeItem('access_token');
      }
      this.authService.authenticate(code);
    });
  }

  getAllProviders() {
    this.windowHandle = window.open(PROVIDERS_PAGE_URL + localStorage.getItem('access_token'), 'Dynamic Popup', 'height=500,width=500');
    var interval = setInterval(() => {
      if (this.windowHandle.closed) {
        clearInterval(interval);
      }
      try {
        let href: string;
        href = this.windowHandle.location.href;
        if (href.includes(APP_URL) && href.includes('customer_id') ) {
          this.windowHandle.close();
          this.customerId = href.split('=')[1];
          this.authService.getAccs(this.customerId)
            .subscribe((data: UserAccount) => {
              this.account = data;
              this.hasAccount = true;
            });
        }
      } catch (err) {}
    }, 1000);
  }
  goBack() {
    this.hasAccount = false;
  }
}

