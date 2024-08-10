import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe({
        next: (response) => {
          this.localStorageService.set('token', response.data.token);
          this.authService.decodedTokenKey = this.authService.decodedToken(
            response.data.token
          );
          console.log(this.authService.getUserInfo());
          this.router.navigate(['']);
          this.toastrService.info('Giriş İşlemi Başarılı', 'Başarılı Giriş');
        },
        error: (responseError) => {
          if (responseError.error.ValidationErrors) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Hata'
              );
            }
          } else {
            this.toastrService.error(responseError.error.message, 'Hata');
          }
        },
      });
    } else {
      this.toastrService.error('Boş değerler girmeyiniz', 'Hata');
    }
  }
}
