import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface DemoUser {
  role: string;
  email: string;
  color: string;
}

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';

  demos: DemoUser[] = [
    { role: 'Supervisor', email: 'supervisor@salon.com', color: '#db2777' },
    { role: 'Estilista', email: 'carla@salon.com', color: '#7c3aed' },
    { role: 'Cliente', email: 'maria@salon.com', color: '#059669' },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl(this.auth.homeRoute());
    }
  }

  submit(): void {
    this.error = '';
    const user = this.auth.login(this.email, this.password);
    if (user) {
      this.router.navigateByUrl(this.auth.homeRoute());
    } else {
      this.error = 'Correo o contraseña incorrectos.';
    }
  }

  usarDemo(email: string): void {
    this.email = email;
    this.password = '123456';
    this.submit();
  }
}
