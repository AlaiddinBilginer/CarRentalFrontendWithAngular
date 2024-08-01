import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CustomerDetailDto } from '../models/customerDetailDto';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44358/api/';

  constructor(private httpClient: HttpClient) {}

  getCustomerDetails(): Observable<ListResponseModel<CustomerDetailDto>> {
    return this.httpClient.get<ListResponseModel<CustomerDetailDto>>(
      this.apiUrl + 'customers/getCustomerDetails'
    );
  }
}
