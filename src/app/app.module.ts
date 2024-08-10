import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from './models/tokenModel';

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
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';

import { ToastrModule } from 'ngx-toastr';
import { CarAddComponent } from './components/car-add/car-add.component';
import { LoginComponent } from './components/login/login.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';

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
    BrandAddComponent,
    LoginComponent,
    RegisterComponent,
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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['http://localhost:4200/'],
      },
    }),
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
