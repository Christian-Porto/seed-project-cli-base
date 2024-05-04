import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: [
        null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")])
      ],
      password: [
        null, Validators.compose([Validators.required, Validators.minLength(4), this.minusculoFValidator])
      ]
    });
  }

  minusculoFValidator(control: AbstractControl) {
    const pass = control.value as string;

    if ((pass !== pass?.toLowerCase()) && (pass !== null)) {
      return { minusculoF: true};
    }

    return null;
  }

  onSubmit() {
    const userAux: User = new User(
      this.formulario.get('password')?.value,
      this.formulario.get('email')?.value
    );

    this.userService.signinUser(userAux).subscribe({
      next: (res: any) => {
        console.log(res.myMsgSucesso);
        console.log({ firstName: res.objUser.firstName });
        console.log({ id: res.objUser._id });

        localStorage.setItem('userId', res.objUser._id);
        localStorage.setItem('userFirstName', res.objUser.firstName);

        this.userService.updateUserLoginDetails(res.objUser._id, res.objUser.firstName);
        alert('Login realizado com sucesso! Bem-vindo(a), ' + res.objUser.firstName + '!');
      },
      error: (err) => {
        console.log(`$== !!Error (subscribe): - ${err.info_extra} ==`);
        console.log(err);
      }
     });
    this.formulario.reset();
  }
}
