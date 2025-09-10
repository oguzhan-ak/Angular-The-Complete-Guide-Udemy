import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value && !control.value.includes('?')) {
    return { mustContainQuestionMark: true };
  }
  return null;
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@test.com') {
    return of(null);
  }
  return of({ notUnique: true });
}

let initialEmailValue = '';
const savedForm = localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
    }),
  });

  ngOnInit(): void {
    // const savedForm = localStorage.getItem('saved-login-form');
    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   this.form.patchValue({ email: loadedForm.email });
    // }

    this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        localStorage.setItem(
          'saved-login-form',
          JSON.stringify({ email: value.email })
        );
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form);
  }

  get emailIsInvalid() {
    return (
      this.form.controls['email'].invalid &&
      this.form.controls['email'].touched &&
      this.form.controls['email'].dirty
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls['password'].invalid &&
      this.form.controls['password'].touched &&
      this.form.controls['password'].dirty
    );
  }
}
