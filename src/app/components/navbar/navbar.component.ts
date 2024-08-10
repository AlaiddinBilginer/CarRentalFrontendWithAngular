import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../models/userModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userInfo: UserModel;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    this.toastrService.info('Çıkış Yapıldı', 'Başarılı');
  }
}
