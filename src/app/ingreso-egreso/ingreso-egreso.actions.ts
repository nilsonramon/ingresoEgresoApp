import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const unSetItems = createAction('[IngresoEgreso Component] unSetItems');
export const setItems = createAction('[IngresoEgreso Component] setItems',
  props<{ items: IngresoEgreso[] }>());
