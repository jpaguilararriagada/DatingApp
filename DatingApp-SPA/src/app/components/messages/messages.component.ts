import { Component, OnInit } from '@angular/core';

import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'unread';
  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private userService: UserService,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid,
       this.pagination.currentPage,
        this.pagination.itemsPerPage,
         this.messageContainer).subscribe(
           (data: PaginatedResult<Message[]>) => {
           this.messages = data.result;
           this.pagination = data.pagination;
         }, error => this.alertifyService.error(error));
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number ) {
    this.alertifyService.confirm('Estas seguro que deseas eliminar el mensaje?', () => {
      this.userService.deleteMessage( id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertifyService.success('Mensaje ha sido eliminado');
      }, error => this.alertifyService.error(error));
    });
  }
}
