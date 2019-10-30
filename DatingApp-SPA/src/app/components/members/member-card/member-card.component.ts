import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../_models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

    @Input() user: User;
  constructor(private authSerive: AuthService, private userSerive: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(recipientId: number) {
    this.userSerive.sendLike(this.authSerive.decodedToken.nameid, recipientId)
    .subscribe( data => {
      this.alertify.success('Le has dado like a ' + this.user.knownAs);
    }, error => {
      this.alertify.error( error );
    } );
  }
}
