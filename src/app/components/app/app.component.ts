import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {IUser} from '../../interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  user: IUser;
  users: IUser[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', (passControl): ValidationErrors => {
        return passControl.value.length < 5 ? {Less: true} : null;
      }),
      confirmPassword: new FormControl('')
    }, this.passValidator.bind(this));
    // this.form = formBuilder.group({
    //   email: ['', [Validators.email, Validators.required]],
    //   password: ''
    // });
  }

  save(form: FormGroup): void {
    console.log(form);
  }

  passValidator(form: FormGroup): ValidationErrors {
    const {value: password} = form.controls.password;
    const {value: confirmPassword} = form.controls.confirmPassword;
    return password === confirmPassword ? null : {passwordError: true};
  }
}
