import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth-callback',
  template: `Please wait...`
})
export class AuthCallbackComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.handleRedirectCallback$.subscribe(x => console.log(x));
  }

}
