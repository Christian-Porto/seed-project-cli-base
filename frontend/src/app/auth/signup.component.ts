import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.formulario = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, [
        Validators.required, Validators.minLength(4), Validators.maxLength(16)
      ]),
      email: new FormControl(null, [
        Validators.required, Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
      ]),
      password: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      personType: new FormControl(null, [Validators.required]),
      terms: new FormControl(false, Validators.requiredTrue) 
    });
  }

  onSubmit() {
    console.log(this.formulario.value);
    const userAux: User = new User(
      this.formulario.get('firstName')?.value,
      this.formulario.get('lastName')?.value,
      this.formulario.get('password')?.value,
      this.formulario.get('email')?.value,
      this.formulario.get('gender')?.value,
      this.formulario.get('personType')?.value,
      this.formulario.get('terms')?.value
    );
    this.userService.addUser(userAux).subscribe({
      next: (res: any) => {
        console.log(res.myMsgSucesso);
        console.log({ content: res.objUserSave.content });
        console.log({ id: res.objUserSave._id });
      },
      error: (err) => {
        console.log(`$== !!Error (subscribe): - ${err.info_extra} ==`);
        console.log(err);
      }
     });
    this.formulario.reset();
  }
}
