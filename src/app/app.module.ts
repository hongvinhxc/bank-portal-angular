import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { ListAccountComponent } from './pages/list-account/list-account.component';
import { LoginComponent } from './pages/login/login.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ModalComponent,
    HeaderComponent,
    LoginComponent,
    ListAccountComponent,
    PaginationComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
