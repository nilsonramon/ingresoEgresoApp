import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';

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
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.ingresosSubs = this.store.select('ingresoEgreso').subscribe(({ items }) => this.ingresosEgresos = items);
  }

  ngOnDestroy(){
    console.log(this.ingresosSubs);
    if (this.ingresosSubs !== undefined) {
      this.ingresosSubs.unsubscribe();
    }
  }

  borrar( uid: string){
    console.log(uid)
  }

}
