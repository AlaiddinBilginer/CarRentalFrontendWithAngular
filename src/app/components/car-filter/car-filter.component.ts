import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrl: './car-filter.component.css',
})
export class CarFilterComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];
  filterTextBrand: string = '';
  filterTextColor: string = '';
  selectedColorId: number | null = null;
  selectedBrandId: number | null = null;
  routeLink = '';

  constructor(
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  changeRouteLink() {
    let routeSegments: string[] = [];

    if (this.selectedBrandId !== null) {
      routeSegments.push(`brand/${this.selectedBrandId}`);
    }

    if (this.selectedColorId !== null) {
      routeSegments.push(`color/${this.selectedColorId}`);
    }

    if (routeSegments.length > 0) {
      this.routeLink = '/cars/' + routeSegments.join('/');
    } else {
      this.routeLink = '';
    }

    return this.routeLink;
  }
}
