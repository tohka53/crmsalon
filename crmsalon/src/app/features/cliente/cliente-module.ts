import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { ClienteServiciosComponent } from './mis-servicios/mis-servicios.component';

const routes: Routes = [{ path: '', component: ClienteServiciosComponent }];

@NgModule({
  declarations: [ClienteServiciosComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ClienteModule {}
