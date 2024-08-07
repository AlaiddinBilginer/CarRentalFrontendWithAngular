import { Component, OnInit } from '@angular/core';
import { CarDetailDto } from '../../models/carDetailDto';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RentalService } from '../../services/rental.service';
import { differenceInDays } from 'date-fns';
import { Rental } from '../../models/rental';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css',
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetailDto | null;
  dataLoaded = false;
  step: number = 1;

  rentalAddForm: FormGroup;
  paymentAddForm: FormGroup;
  amount: number;
  rentalModel: Rental;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.createRentalAddForm();
    this.createPaymentAddForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailById(params['carId']);
    });
  }

  getCarDetailById(carId: number) {
    this.carService.getCarDetailById(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true;
    });
  }

  getCarImage(imagePath: string): string {
    return 'https://localhost:44358/CarImages/' + imagePath;
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cardHolderName: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  nextStep() {
    if (this.step === 1) {
      if (this.rentalAddForm.valid) {
        let rentalModel = Object.assign(
          { carId: this.carDetail.id, customerId: 9 },
          this.rentalAddForm.value
        );
        this.rentalService.checkAreRulesValid(rentalModel).subscribe({
          next: (response) => {
            this.rentalModel = rentalModel;
            this.toastrService.success(response.message, 'Başarılı');
            const rentDate = new Date(this.rentalAddForm.value.rentDate);
            const returnDate = new Date(this.rentalAddForm.value.returnDate);
            const dayCount = differenceInDays(returnDate, rentDate);
            this.amount = dayCount * this.carDetail.dailyPrice;
            this.step = 2;
          },
          error: (responseError) => {
            this.toastrService.error(responseError.error.message, 'Hata');
          },
        });
      } else {
        this.toastrService.error('Hatalı değerler girdiniz', 'Dikkat');
      }
    } else {
      let paymentRequest = Object.assign(
        { customerId: 9, amount: this.amount },
        this.paymentAddForm.value
      );
      this.paymentService.pay(paymentRequest).subscribe({
        next: (response) => {
          this.rentalService.rent(this.rentalModel).subscribe((response) => {
            this.toastrService.success(response.message, 'Başarılı Kiralama');
          });
          this.toastrService.success(response.message, 'Başarılı');
          this.step = 3;
        },
        error: (responseError) => {
          this.toastrService.error(responseError.error.message);
        },
      });
    }
  }

  prevStep() {
    if (this.step === 2) {
      this.step = 1;
    }
  }
}
