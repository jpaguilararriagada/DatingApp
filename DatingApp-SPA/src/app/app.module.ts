import { JwtModule } from '@auth0/angular-jwt';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ValueComponent } from './components/value/value.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { AlertifyService } from './services/alertify.service';
import { NgxGalleryModule } from 'ngx-gallery';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
// BOOTSTRAP

import { BsDropdownModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { appRouting } from './routes';

// Guard
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './services/user.service';
import { MemberCardComponent } from './components/members/member-card/member-card.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './components/members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import {TimeAgoPipe} from 'time-ago-pipe';
import { defineLocale } from 'ngx-bootstrap';
import { esLocale } from 'ngx-bootstrap';
defineLocale('es', esLocale);
registerLocaleData(localeEs, 'es');


export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    appRouting,
    FileUploadModule,
    RouterModule.forRoot([]),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/auth/']
      }
    }),
    NgxGalleryModule
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberEditResolver,
    PreventUnsavedChangesGuard,
    { provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
