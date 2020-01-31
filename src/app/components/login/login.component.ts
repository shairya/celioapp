import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/api/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  disbleSubmitButton = true;
  errorMsg = '';

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router, private authService: AuthService, private http: HttpClient ) {
    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password : ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {

  }

  login() {
    this.disbleSubmitButton = false;
    if (this.loginForm.valid) {
      const data = {mail: this.loginForm.value.username, password: this.loginForm.value.password};
      this.apiService.login(data).subscribe((d: any) => {
        console.log(d)
        if (d.status === 200) {
          localStorage.setItem('token', d.data.token);
          localStorage.setItem('user', JSON.stringify(d.data));
          this.router.navigateByUrl('/report');
        } else {
          this.errorMsg = 'Invalid credentials!';
        }
      });
    }
  }
}
