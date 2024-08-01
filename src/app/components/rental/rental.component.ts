import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../services/rental.service';
import { RentalDetailDto } from '../../models/rentalDetailDto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [DatePipe],
})
export class RentalComponent implements OnInit {
  rentalDetails: RentalDetailDto[] = [];
  dataLoaded = false;

  constructor(
    private rentalService: RentalService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentalDetails() {
    this.rentalService.getRentalDetails().subscribe((response) => {
      this.rentalDetails = response.data;
      this.dataLoaded = true;
    });
  }

  formatDate(date: Date | null): string {
    if (!date) {
      return 'Teslim edilmedi';
    }
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm', 'UTC+3') || '';
  }
}
