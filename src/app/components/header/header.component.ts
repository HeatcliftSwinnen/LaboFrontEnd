import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  isActive: boolean = false;
  isConnected: boolean = false;
  userName : string |undefined = ''
  private authSubscription?: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.updateConnectionStatus();
    this.authSubscription = this.authService.isLoggedInObservable().subscribe(() => {
      this.updateConnectionStatus();
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  private updateConnectionStatus() {
    this.isConnected = this.authService.isLoggedIn();
    if (this.isConnected) {
      this.userName = this.authService.username;
    } else {
      this.userName = '';
    }
  }
}
