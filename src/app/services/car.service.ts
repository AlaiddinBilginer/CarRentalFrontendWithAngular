import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetailDto } from '../models/carDetailDto';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44358/api/';

  constructor(private httpClient: HttpClient) {}

  getCarDetails(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getCarDetails';
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarDetailsByBrand(
    brandId: number
  ): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getCarDetailsByBrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarDetailsByColor(
    colorId: number
  ): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getCarDetailsByColor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarDetailById(
    carId: number
  ): Observable<SingleResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getCarDetailById?carId=' + carId;
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newPath);
  }
}
