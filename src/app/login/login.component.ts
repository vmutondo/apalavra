import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userForm: FormGroup;
  newUser = true; // to toggle login or signup form
  passReset = false; // set to true when password reset is triggered
  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
  };
//private fb: FormBuilder, 
  constructor(public auth: AuthService, private router:Router) { }



            /*  onSubmit(formData) {
                if (formData.valid) {
                  console.log(formData.value);
                  this.auth.emailLogin(
                    formData.value.email,
                    formData.value.password
                  );
                }
              }
  */

              onSubmit(formData) {
                if (formData.valid) {
                  console.log(formData.value);
                  this.auth.emailLogin(
                    formData.value.email,
                    formData.value.password
                  );
                }
              }
  

/*
  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });

  }
  */
  /// Shared
  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.router.navigate(['/inicio']);
  }

}