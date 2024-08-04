import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarDetailDto } from '../../models/carDetailDto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetailDto[] = [];
  dataLoaded = false;
  filterText: string = '';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (!params['brandId'] && !params['colorId']) {
        this.getCarDetails();
      } else if (params['brandId'] && params['colorId']) {
        this.getCarByBrandAndColor(params['brandId'], params['colorId']);
      } else if ([params['brandId']] && !params['colorId']) {
        this.getCarByBrand(params['brandId']);
      } else {
        this.getCarByColor(params['colorId']);
      }
    });
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarByBrandAndColor(brandId?: number, colorId?: number) {
    this.carService
      .getCarByColorAndBrand(brandId, colorId)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
  }

  getCarByBrand(brandId: number) {
    this.carService.getCarDetailsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarByColor(colorId: number) {
    this.carService.getCarDetailsByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarImage(images: { imagePath: string }[]): string {
    if (images && images.length > 0) {
      return 'https://localhost:44358/CarImages/' + images[0].imagePath;
    } else {
      return this.getDefaultImage();
    }
  }

  getDefaultImage(): string {
    return 'https://localhost:44358/CarImages/defaultImage.jpg';
  }
}
