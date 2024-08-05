import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/brand';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  filterTextBrand: string = '';
  selectedBrandId: number;

  @Output() brandSelected = new EventEmitter<number | null>();

  constructor(
    private brandService: BrandService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  onBrandChange() {
    this.sharedService.setSelectedBrandId(this.selectedBrandId);
  }
}
