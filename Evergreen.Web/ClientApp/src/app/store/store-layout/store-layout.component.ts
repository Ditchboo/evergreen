import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/auth/auth.service';

@Component({
  selector: 'app-store-layout',
  templateUrl: './store-layout.component.html',
  styleUrls: ['./store-layout.component.css']
})
export class StoreLayoutComponent implements OnInit {

  constructor(public  auth: AuthService) { }

  ngOnInit(): void {
  }

}
