import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStorage } from '../libs/storage';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  localStorage: AppStorage = new AppStorage();
  title = 'nftmax';
  isCloseMenu: boolean = false;
  loggedIn = false;

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    const user = this.localStorage.getItem('user', null);
    if (user) {
      this.loggedIn = true;
    }
  }

  receiveData(data: any) {
    this.isCloseMenu = data;
  }

  receiveCheckLogin(data: any) {
    this.loggedIn = data;
  }

  receiveDataLogout(data: any) {
    this.loggedIn = data;
  }

}
