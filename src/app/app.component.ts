import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showConnect = false;
  constructor() {}
  connect() {
    this.showConnect = !this.showConnect;
  }
}
