import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerDetailDto } from '../../models/customerDetailDto';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  customerDetails: CustomerDetailDto[] = [];
  dataLoaded = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomerDetails();
  }

  getCustomerDetails() {
    this.customerService.getCustomerDetails().subscribe((response) => {
      this.customerDetails = response.data;
      this.dataLoaded = true;
    });
  }
}
