import { StoreModule } from '@ngrx/store';
import { DashboardRoutesModule } from './../dashboard/dashboard-routes.module';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdenIngresoPipe } from './../pipes/orden-ingreso.pipe';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { SharedModule } from '../shared/shared.module';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    RouterModule,
    DashboardRoutesModule,
  ]
})
export class IngresoEgresoModule { }
