import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelarRegistro = new EventEmitter();
  model: any = {};

  // tslint:disable-next-line:variable-name
  constructor(private _service: AuthService) {}

  ngOnInit() {}

  register() {
   this._service.register(this.model).subscribe( data => {
     console.log('ok');
   }, error => console.log(error));
  }

  cancel() {
    this.cancelarRegistro.emit(false);
  }
}
