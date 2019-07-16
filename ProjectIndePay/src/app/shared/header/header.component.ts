import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authenticationStatusListenerSubs: Subscription;
  private authenticationNameListenerSubs: Subscription;
  userIsAuthenticated = false;
  authenticatedUserName = null;
  role = null;


  constructor(private authenticationService: AuthenticationService) {}

  // subscribe to the authenticationListener on OnInit
  ngOnInit() {
    // subscribe to authenticationStatusListener
    this.authenticationStatusListenerSubs = this.authenticationService
      .getAuthenticationStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    // subscribe to authenticationNameListener
    this.authenticationNameListenerSubs = this.authenticationService
      .getAuthenticationNameListener()
      .subscribe(authenticatedUserName => {
        this.authenticatedUserName = authenticatedUserName;
      });
    // check if user is authenticated
    this.userIsAuthenticated = this.authenticationService.getIsAuthenticated();
    this.role = this.authenticationService.getRole();
  }

  onLogout() {
    this.authenticationService.logout();
  }

  // manual handeling of unsubscribung inDestroy
  ngOnDestroy() {
    // unsubscribe authenticationStatusListenerSubs
    this.authenticationStatusListenerSubs.unsubscribe();
    // unsubscribe authenticationStatusListenerSubs
    this.authenticationStatusListenerSubs.unsubscribe();
  }
}
