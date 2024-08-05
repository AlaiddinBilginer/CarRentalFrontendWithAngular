import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CarService } from '../../services/car.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrl: './car-add.component.css',
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  selectedColorId: number | null = null;
  selectedBrandId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.sharedService.selectedBrandId$.subscribe((id) => {
      this.selectedBrandId = id;
      this.carAddForm.patchValue({ brandId: id });
    });
    this.sharedService.selectedColorId$.subscribe((id) => {
      this.selectedColorId = id;
      this.carAddForm.patchValue({ colorId: id });
    });
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      brandId: [this.selectedBrandId, Validators.required],
      colorId: [this.selectedColorId, Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe({
        next: (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        error: (responseError) => {
          console.log(responseError);
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        },
      });
    } else {
      this.toastrService.error('Hatalı değerler girdiniz', 'Dikkat');
    }
  }
}
