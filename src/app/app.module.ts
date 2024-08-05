import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterCarPipePipe } from './pipes/filter-car-pipe.pipe';
import { FilterBrandPipePipe } from './pipes/filter-brand-pipe.pipe';
import { FilterColorPipePipe } from './pipes/filter-color-pipe.pipe';

import { ToastrModule } from 'ngx-toastr';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NavbarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarFilterComponent,
    CarDetailComponent,
    FilterCarPipePipe,
    FilterBrandPipePipe,
    FilterColorPipePipe,
    CarAddComponent,
    ColorAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
