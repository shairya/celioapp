import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Celio';
  isLoggedIn = false;
  constructor() {

  }
  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('user') ? true : false;
  }
}
