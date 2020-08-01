import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });

  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
  login() {
    /*
      Swal.fire({
        title: 'Espere...',

        onBeforeOpen: () => {
          Swal.showLoading()
        }
      })
    */

    this.store.dispatch(ui.isLoading());

    if (this.loginForm.invalid) { return; }
    const { correo, password } = this.loginForm.value;

    this.authService.loginUsuario(correo, password)
      .then(loguin => {
        console.log(loguin);
        /*Swal.close();*/
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      }).catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })

  }
}
