import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/auth/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  profile$;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.profile$ = this.auth.userProfile$;
  }

  signOut(): void {
    this.auth.logout();
  }

}
