import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-register',
  template: `
    <main class="mb-4">
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
              <div class="col-md-12">
                <div>
                  <a [routerLink]="['/book/']" class="btn btn-light">Back</a>
                </div>
              </div>
                <div class="col-md-10 col-lg-8 col-xl-7">
                    <div class="my-5">
                        <form id="contactForm" (ngSubmit)="createUser()" [formGroup]="userForm">
                            <div class="form-floating">
                                <input class="form-control" id="name" type="text" name="name" placeholder="Enter your name..." required formControlName="name" />
                                <label for="name">Username</label>
                                <div style="color:red" *ngIf="userForm.get('name').dirty && userForm.get('name').hasError('required')">
                                  <small style="font-size:0.75em;">* Il campo Username è obbligatorio!</small>
                                </div>
                                <div style="color:red" *ngIf="userForm.get('name').dirty && userForm.get('name').hasError('minLength')">
                                  <small style="font-size:0.75em;">Inserisci minimo 3 caratteri!</small>
                                </div>
                            </div>
                            <div class="form-floating">
                                <input class="form-control" id="email" type="email" name="email" placeholder="Enter your email..." required formControlName="email" />
                                <label for="email">Email</label>
                                <div style="color:red" *ngIf="userForm.get('email').dirty && userForm.get('email').hasError('required')">
                                  <small style="font-size:0.75em;">* Il campo Email è obbligatorio!</small>
                                </div>
                                <div style="color:red" *ngIf="userForm.get('email').dirty && userForm.get('email').hasError('minLength')">
                                  <small style="font-size:0.75em;">Inserisci minimo 3 caratteri!</small>
                                </div>
                                <div style="color:red" *ngIf="userForm.get('email').dirty && userForm.get('email').hasError('invalidEmail')">
                                  <small style="font-size:0.75em;">Inserisci una mail valida!</small>
                                </div>
                            </div>
                            <div class="form-floating">
                                <input class="form-control" id="pass" type="password" name="password" placeholder="Enter your Password..." required formControlName="password" />
                                <label for="pass">Password</label>
                                <div style="color:red" *ngIf="userForm.get('password').dirty && userForm.get('password').hasError('required')">
                                  <small style="font-size:0.75em;">* Il campo Password è obbligatorio!</small>
                                </div>
                                <div style="color:red" *ngIf="userForm.get('password').dirty && userForm.get('password').hasError('minLength')">
                                  <small style="font-size:0.75em;">Inserisci minimo 8 caratteri!</small>
                                </div>
                                <div style="color:red" *ngIf="userForm.get('password').dirty && userForm.get('password').hasError('maxLength')">
                                  <small style="font-size:0.75em;">Inserisci massimo 32 caratteri!</small>
                                </div>
                                <div style="color:red" *ngIf="userForm.get('password').dirty && userForm.get('password').hasError('invalidPass')">
                                  <small style="font-size:0.75em;">Richiesto un carattere maiuscolo, uno minuscolo, numeri e caratteri speciali</small>
                                </div>
                            </div>
                            <div class="checkbox m-5 d-flex flex-column align-items-center">
                              <p class="">Torna alla <a routerLink=""><span>Home</span></a></p>
                            </div>

                            <br />
                            <!-- Submit Button-->
                            <div class="d-grid gap-2">
                              <a [routerLink]="['/book/']" class="btn btn-light">Cancel</a>
                              <button class="btn btn-primary text-uppercase" id="submitButton" type="submit" [disabled]=userForm.invalid>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
  `,
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;

  constructor(fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.userForm = fb.group({
      email: fb.control('', [Validators.required, Validators.minLength(3), RegisterComponent.isValidEmail]),
      name: fb.control('', [Validators.required, Validators.minLength(3)]),
      password: fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), RegisterComponent.isValidPass])
    })
  }

  ngOnInit(): void {
  }

  createUser(): void {
    this.auth.register(this.userForm.value)
      .subscribe(
        user => {
          console.log(user);
          this.router.navigate(['book']);
        },
        error => console.log(error)
      )
    // console.log(this.userForm.value)
  }

  static isValidEmail(control: FormControl) {
    let emailRegExp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return emailRegExp.test(control.value) ? null : {
      invalidEmail: true
    };
  }

  static isValidPass(control: FormControl) {
    let passRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    return passRegExp.test(control.value) ? null : {
      invalidPass: true
    };
  }

}
