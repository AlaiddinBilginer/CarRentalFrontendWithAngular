import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = this.registerForm.value;

      this.authService.register(registerModel).subscribe({
        next: (response) => {
          this.toastrService.info('Kayıt İşlemi Başarılı', 'Başarılı Kayıt');
          this.localStorageService.set('token', response.data.token);
          this.router.navigate(['']);
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
