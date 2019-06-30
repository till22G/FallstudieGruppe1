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
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './startingPage/login/login.component';
import { RegisterComponent } from './startingPage/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { InfoPageComponent } from './startingPage/info-page/info-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './restricted-pages/home-page/home-page.component';
import { AuthenticationGuard } from './restricted-pages/services/authentication.guard';
import { BalanceComponent } from './restricted-pages/balance/balance.component';
import { LastTransactionsComponent } from './restricted-pages/last-transactions/last-transactions.component';
import { FilterTransactionsPipe } from './restricted-pages/services/filter-transactions.pipe';

// can be hadneled in an outsorced module
const appRoutes: Routes = [
  { path: 'info', component: InfoPageComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomePageComponent, canActivate: [AuthenticationGuard]},
  { path: 'lastTransactions', component: LastTransactionsComponent, canActivate: [AuthenticationGuard]}
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
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
