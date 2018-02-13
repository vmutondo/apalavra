import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(public auth: AuthService,
              private router: Router) { }



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
  /// Social Login
  


  /// Shared
  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.router.navigate(['/inicio']);
  }

}