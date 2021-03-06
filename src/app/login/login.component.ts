import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorService} from '../services/behavior.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberMe = false;
  password: string;
  email: string;
  username: string;
  user: any;
  data: any;
  u: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private behaviorService: BehaviorService
  ) { }

  ngOnInit() {
    console.log('here we are');
    this.authService.logout();
  }

  onLogin() {
    this.user = {
      username: this.username,
      password: this.password
    };
    this.authService.login(this.user).subscribe(data => {
      this.data = data;
      console.log('data: ', this.data);
      localStorage.setItem('currentUser', JSON.stringify(this.data.userDto));
      this.behaviorService.setLoginSubject(true);
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    });
  }

}
