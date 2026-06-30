import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { SupervisorModule } from './features/supervisor/supervisor-module';
import { EstilistaModule } from './features/estilista/estilista-module';
import { ClienteModule } from './features/cliente/cliente-module';
import { SupervisorClientesComponent } from './features/supervisor/clientes/clientes.component';
import { SupervisorDashboardComponent } from './features/supervisor/dashboard/dashboard.component';
import { AsignarComponent } from './features/supervisor/asignar/asignar.component';
import { EstilistaServiciosComponent } from './features/estilista/mis-servicios/mis-servicios.component';
import { ClienteServiciosComponent } from './features/cliente/mis-servicios/mis-servicios.component';
import { AuthService } from './core/services/auth.service';
import { SeedService } from './core/services/seed.service';

describe('smoke: feature components through real module graph', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), SupervisorModule, EstilistaModule, ClienteModule],
    }).compileComponents();
    TestBed.inject(SeedService).ensureSeed();
  });

  function render(cmp: any) {
    const f = TestBed.createComponent(cmp);
    f.detectChanges();
    expect(f.nativeElement).toBeTruthy();
  }

  it('SupervisorClientes (logged as supervisor, shows ratings)', () => {
    TestBed.inject(AuthService).login('supervisor@salon.com', '123456');
    render(SupervisorClientesComponent);
  });

  it('SupervisorDashboard', () => {
    TestBed.inject(AuthService).login('supervisor@salon.com', '123456');
    render(SupervisorDashboardComponent);
  });

  it('Asignar', () => {
    TestBed.inject(AuthService).login('supervisor@salon.com', '123456');
    render(AsignarComponent);
  });

  it('EstilistaServicios (logged as estilista, shows ratings)', () => {
    TestBed.inject(AuthService).login('carla@salon.com', '123456');
    render(EstilistaServiciosComponent);
  });

  it('ClienteServicios (logged as cliente, shows rating widget + ratings)', () => {
    TestBed.inject(AuthService).login('maria@salon.com', '123456');
    render(ClienteServiciosComponent);
  });
});
