import { Component, OnInit } from '@angular/core';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrl: './car-filter.component.css',
})
export class CarFilterComponent implements OnInit {
  selectedColorId: number | null = null;
  selectedBrandId: number | null = null;

  routeLink = '';

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.selectedBrandId$.subscribe(
      (id) => (this.selectedBrandId = id)
    );
    this.sharedService.selectedColorId$.subscribe(
      (id) => (this.selectedColorId = id)
    );
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
