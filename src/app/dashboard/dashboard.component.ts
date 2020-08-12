import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import * as ingresoEgresoActions from 'src/app/ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresosSubs: Subscription;
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService,
  ) { }

  ngOnInit(): void {

    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({ user }) => {
        this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
          .subscribe(ingresosEgresos => {
            this.store.dispatch(ingresoEgresoActions.setItems({ items: ingresosEgresos }));
          });
      });
  }

  ngOnDestroy() {
    if (this.ingresosSubs !== undefined) {
      this.ingresosSubs.unsubscribe();
    }
    if (this.userSubs !== undefined) {
      this.userSubs.unsubscribe();
    }
  }
}
