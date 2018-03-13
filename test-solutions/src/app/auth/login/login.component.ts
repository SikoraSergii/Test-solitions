import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.setForm()
  }
  // Set Form
  setForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }
  // Mail Errors
  getMailError() {
    const errors = this.loginForm.get('email').errors
    if (!errors) return ''
    else if (errors.required) return 'This field is required'
    else if (errors.email) return 'Please, enter valid email address'

  }
  // Password Errors
  getPasswordError() {
    const errors = this.loginForm.get('password').errors
    if (!errors) return ''
    else if (errors.required) return 'This field is required'
    else if (errors.minlength) return `The password must be at least ${errors.minlength.requiredLength} characters`

  }
  // Register
  onLogin() {
    if (this.loginForm.invalid) return;
    let user = this.loginForm.value;
    this.authService.login(user)
      .subscribe(
      res => {
        this.loginForm.reset();
        this.router.navigateByUrl('');
      },
      error => {
        this.snackBar.open('Failed', error, {duration: 3000})
      }
    )

  }
}
