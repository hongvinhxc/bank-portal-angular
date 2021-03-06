import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseToken, removeToken } from '../../helpers/utils';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showLogout = true;
  username: string;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngDoCheck() {
    if (this.router.url == '/login') {
      this.showLogout = false;
    } else {
      this.showLogout = true;
    }
    let payload: any = parseToken();
    this.username = payload?.username;
  }

  onLogout() {
    removeToken();
    this.router.navigate(['/login']);
  }
}
