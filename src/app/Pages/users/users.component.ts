import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users : any = [];
  constructor() {
    if (localStorage.getItem('users')) {
        let users : any= localStorage.getItem('users');
        this.users = JSON.parse(users);
        console.log("------------- lista users ",this.users);
    } else {
      
    }
  }

  ngOnInit() {
  }

}
