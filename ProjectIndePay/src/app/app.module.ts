import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatMenuModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatPaginatorModule
} from '@angular/material';

import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './starting-pages/login/login.component';
import { RegisterComponent } from './starting-pages/register/register.component';
import { InfoPageComponent } from './starting-pages/info-page/info-page.component';

import { HomePageComponent } from './restricted-pages/home-page/home-page.component';
import { BalanceComponent } from './restricted-pages/balance/balance.component';
import { LastTransactionsComponent } from './restricted-pages/last-transactions/last-transactions.component';
import { SendMoneyComponent } from './restricted-pages/send-money/send-money.component';
import { SearchContanctsComponent } from './restricted-pages/search-contancts/search-contancts.component';

import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { AuthenticationInterceptorService } from './shared/services/authentication-interceptor.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddNewContactComponent } from './restricted-pages/add-new-contact/add-new-contact.component';
import { FilterTransactionsPipe } from './shared/pipes/filter-transactions.pipe';
import { FilterContactsPipe } from './shared/pipes/filter-contacts.pipe';
import { CheckTransactionComponent } from './restricted-pages/check-transaction/check-transaction.component';
import { NotifierModule } from 'angular-notifier';
import { BusinessUserPanelComponent } from './restricted-pages/business-user-panel/business-user-panel.component';

import { AuthorizeBusinessUserGuard } from './shared/guards/authorize-business-user.guard';
import { AdminConsoleComponent } from './restricted-pages/admin-console/admin-console.component';
import { AuthorizeAdminGuard } from './shared/guards/authorize-admin.guard';


// can be hadneled in an outsorced module
const appRoutes: Routes = [
  { path: 'info', component: InfoPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomePageComponent, canActivate: [AuthenticationGuard] },
  { path: 'lastTransactions', component: LastTransactionsComponent, canActivate: [AuthenticationGuard] },
  { path: 'searchContacts', component: SearchContanctsComponent, canActivate: [AuthenticationGuard] },
  { path: 'addNewContact', component: AddNewContactComponent, canActivate: [AuthenticationGuard] },
  { path: 'sendMoney', component: SendMoneyComponent, canActivate: [AuthenticationGuard] },
  { path: 'checkTransaction', component: CheckTransactionComponent, canActivate: [AuthenticationGuard] },
  { path: 'businessUserPanel', component: BusinessUserPanelComponent, canActivate: [AuthenticationGuard, AuthorizeBusinessUserGuard] },
  { path: 'adminConsole', component: AdminConsoleComponent, canActivate: [AuthenticationGuard, AuthorizeAdminGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    InfoPageComponent,
    HomePageComponent,
    BalanceComponent,
    LastTransactionsComponent,
    FilterTransactionsPipe,
    FilterContactsPipe,
    SearchContanctsComponent,
    SendMoneyComponent,
    AddNewContactComponent,
    CheckTransactionComponent,
    BusinessUserPanelComponent,
    AdminConsoleComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatPaginatorModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NotifierModule,
  ],
  providers: [AuthenticationGuard,
    AuthorizeBusinessUserGuard,
    AuthorizeAdminGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
