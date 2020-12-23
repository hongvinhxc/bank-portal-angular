import { Routes } from '@angular/router';
import { ListAccountComponent } from './pages/list-account/list-account.component';
import { LoginComponent } from './pages/login/login.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: ListAccountComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
