import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelarRegistro = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  locale = 'es';

  // tslint:disable-next-line:variable-name
  constructor(private _service: AuthService, private alertify: AlertifyService, private fb: FormBuilder,
              private _local: BsLocaleService, private router: Router) {  this._local.use(this.locale); }

  ngOnInit() {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator );
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { missmatch : true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this._service.register(this.user).subscribe(data => {
        this.alertify.success('Registro realizado con éxito!');
      }, error => this.alertify.error(error),
      () => this._service.login(this.user).subscribe( response => {
        this.router.navigate(['/members']);
      }));
    }
  //  this._service.register(this.model).subscribe( data => {
  //    this.alertify.success('Registro realizado con éxito!');
  //  }, error => this.alertify.error(error));
  // console.log(this.registerForm);
  }

  cancel() {
    this.cancelarRegistro.emit(false);
  }
}
