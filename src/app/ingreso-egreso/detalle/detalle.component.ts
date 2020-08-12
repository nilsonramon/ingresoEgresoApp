import { AppStateWithIngreso } from './../ingreso-egreso.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit,OnDestroy {

  ingresosEgresos: IngresoEgreso[] = []
  ingresosSubs: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService,
  ) { }

  ngOnInit(): void {
    this.ingresosSubs = this.store.select('ingresoEgreso').subscribe(({ items }) => this.ingresosEgresos = items);
  }

  ngOnDestroy(){
    if (this.ingresosSubs !== undefined) {
      this.ingresosSubs.unsubscribe();
    }
  }

  borrar( uid: string){
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
    .then(()=>{
      Swal.fire('Borrado', 'Item Borrado', 'success');
    })
    .catch((err)=>{
      Swal.fire('Borraro', err.message, 'error');
    })
  }

}
