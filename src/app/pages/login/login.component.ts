import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { setToken } from '../../helpers/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  error: string;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  setValueInput(e) {
    this[e.name] = e.value;
  }

  onLogin() {
    this.userService
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe((res: any) => {
        if (res.success) {
          setToken(res.token);
          this.router.navigate(['/']);
        } else {
          this.error = res.message;
        }
      });
  }

  onEnter(e) {
    if (e.name == 'password') {
      e.focus();
    } else {
      e.click();
    }
  }
}
