import { Routes } from '@angular/router';
import { ListAccountComponent } from './pages/list-account/list-account.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

export const AppRoutes: Routes = [
  {
    path: '',
    component: ListAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
