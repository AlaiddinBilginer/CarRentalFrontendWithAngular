import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private selectedBrandIdSource = new BehaviorSubject<number>(null);
  selectedBrandId$ = this.selectedBrandIdSource.asObservable();

  private selectedColorIdSource = new BehaviorSubject<number>(null);
  selectedColorId$ = this.selectedColorIdSource.asObservable();

  setSelectedBrandId(id: number) {
    this.selectedBrandIdSource.next(id);
  }

  setSelectedColorId(id: number) {
    this.selectedColorIdSource.next(id);
  }
}
