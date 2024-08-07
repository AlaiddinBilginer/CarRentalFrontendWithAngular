import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = 'https://localhost:44358/api/';

  constructor(private httpCilent: HttpClient) {}

  pay(paymentRequest: PaymentRequest): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'payment/pay';
    return this.httpCilent.post<ResponseModel>(newPath, paymentRequest);
  }
}
