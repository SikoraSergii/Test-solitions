import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registartion',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    this.setForm()
  }
  // Set Form
  setForm() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }
  // Mail Errors
  getMailError() {
    const errors = this.registrationForm.get('email').errors
    if (!errors) return ''
    else if (errors.required) return 'This field is required'
    else if (errors.email) return 'Please, enter valid email address'

  }
  // Password Errors
  getPasswordError() {
    const errors = this.registrationForm.get('password').errors
    if (!errors) return ''
    else if (errors.required) return 'This field is required'
    else if (errors.minlength) return `The password must be at least ${errors.minlength.requiredLength} characters`

  }
  // Register
  onRegister() {
    if (this.registrationForm.invalid) return;
    let newUser = this.registrationForm.value;
    newUser.isActive = true;
    this.authService.register(newUser)
      .subscribe(res => {
        this.registrationForm.reset();
        this.router.navigateByUrl('');
      })

  }
}
