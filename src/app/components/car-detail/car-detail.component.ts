import { Component, OnInit } from '@angular/core';
import { CarDetailDto } from '../../models/carDetailDto';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css',
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetailDto | null;
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailById(params['carId']);
    });
  }

  getCarDetailById(carId: number) {
    this.carService.getCarDetailById(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true;
      console.log(this.carDetail);
    });
  }

  getCarImage(imagePath: string): string {
    return 'https://localhost:44358/CarImages/' + imagePath;
  }
}
