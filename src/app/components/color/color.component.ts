import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { Color } from '../../models/color';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrl: './color.component.css',
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  filterTextColor: string = '';
  selectedColorId: number;

  constructor(
    private colorService: ColorService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  onColorChange() {
    this.sharedService.setSelectedColorId(this.selectedColorId);
  }
}
