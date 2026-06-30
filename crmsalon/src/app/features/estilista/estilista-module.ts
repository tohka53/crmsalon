import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { EstilistaServiciosComponent } from './mis-servicios/mis-servicios.component';

const routes: Routes = [{ path: '', component: EstilistaServiciosComponent }];

@NgModule({
  declarations: [EstilistaServiciosComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class EstilistaModule {}
