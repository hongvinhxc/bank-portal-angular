import { FormControl, FormGroup } from '@angular/forms';
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
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  error: string;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  setValueInput(e) {
    this[e.name] = e.value;
  }

  onLogin() {
    this.userService
      .login(this.loginForm.value)
      .subscribe((res: any) => {
        if (res.success) {
          setToken(res.token);
          this.router.navigate(['/']);
        } else {
          this.error = res.message;
        }
      });
  }
}
