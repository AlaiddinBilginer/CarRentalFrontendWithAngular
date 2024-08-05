import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrl: './color-add.component.css',
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe({
        next: (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        error: (responseError) => {
          console.log(responseError);
          if (responseError.error) {
            this.toastrService.error(responseError.error.message, 'Hata');
          }
        },
      });
    } else {
      this.toastrService.error('Hatalı değerler girdiniz', 'Dikkat');
    }
  }
}
