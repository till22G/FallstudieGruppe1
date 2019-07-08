import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {MatToolbarModule,
        MatMenuModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatPaginatorModule} from '@angular/material';

import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './startingPage/login/login.component';
import { RegisterComponent } from './startingPage/register/register.component';
import { InfoPageComponent } from './startingPage/info-page/info-page.component';

import { HomePageComponent } from './restricted-pages/home-page/home-page.component';
import { BalanceComponent } from './restricted-pages/balance/balance.component';
import { LastTransactionsComponent } from './restricted-pages/last-transactions/last-transactions.component';
import { SendMoneyComponent } from './restricted-pages/send-money/send-money.component';
import { SearchContanctsComponent } from './restricted-pages/search-contancts/search-contancts.component';

import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { FilterTransactionsPipe } from './shared/pipes/filter-transactions.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddNewContactComponent } from './restricted-pages/add-new-contact/add-new-contact.component';
import { AuthenticationInterceptorService } from './shared/services/authentication-interceptor.service';
import { FilterContactsPipe } from './shared/pipes/filter-contacts.pipe';
import { CheckTransactionComponent } from './restricted-pages/check-transaction/check-transaction.component';

// can be hadneled in an outsorced module
const appRoutes: Routes = [
  { path: 'info', component: InfoPageComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},

  { path: 'home', component: HomePageComponent, canActivate: [AuthenticationGuard]},
  { path: 'lastTransactions', component: LastTransactionsComponent, canActivate: [AuthenticationGuard]},
  { path: 'searchContacts', component: SearchContanctsComponent, canActivate: [AuthenticationGuard]},
  { path: 'addNewContact', component: AddNewContactComponent, canActivate: [AuthenticationGuard]},
  { path: 'sendMoney', component: SendMoneyComponent, canActivate: [AuthenticationGuard]},
  { path: 'checkTransaction', component: CheckTransactionComponent, canActivate: [AuthenticationGuard]}
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
  ],
  providers: [AuthenticationGuard,
                {
                  provide: HTTP_INTERCEPTORS,
                  useClass: AuthenticationInterceptorService,
                  multi: true
                }
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
