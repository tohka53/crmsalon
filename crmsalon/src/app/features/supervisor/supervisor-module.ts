import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { SupervisorDashboardComponent } from './dashboard/dashboard.component';
import { AsignarComponent } from './asignar/asignar.component';
import { SupervisorClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
  { path: '', component: SupervisorDashboardComponent },
  { path: 'asignar', component: AsignarComponent },
  { path: 'clientes', component: SupervisorClientesComponent },
];

@NgModule({
  declarations: [SupervisorDashboardComponent, AsignarComponent, SupervisorClientesComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class SupervisorModule {}
