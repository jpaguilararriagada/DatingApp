import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo';
import { environment } from '../../../../environments/environment';
import { AlertifyService } from '../../../services/alertify.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
   uploader: FileUploader;
   hasBaseDropZoneOver = false;
   baseUrl = environment.apiUrl;
currentMain: Photo;
  constructor(private authService: AuthService, private userSerive: UserService, private alertifiy: AlertifyService) { }

  ngOnInit() {
    this.initializeUplaoder();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUplaoder() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 // 10 mb
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id : res.id,
          url : res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify( this.authService.currentUser));
        }
      }
    };
  }

  setMainPhoto(photo: Photo) {
this.userSerive.setMainPhoto(this.authService.decodedToken.nameid, photo.id)
                .subscribe(data => {
                  this.currentMain = this.photos.filter(p => p.isMain === true)[0];
                  this.currentMain.isMain = false;
                  photo.isMain = true;
                  // this.getMemberPhotoChange.emit(photo.url);
                  this.authService.changeMemberPhoto(photo.url);
                  this.authService.currentUser.photoUrl = photo.url;
                  localStorage.setItem('user', JSON.stringify( this.authService.currentUser));
                },
                   error => this.alertifiy.error(error) );
  }

  deletePhoto(photo: Photo) {
    this.alertifiy.confirm('Estas seguro que deseas eliminar la foto ? ', () => {
      this.userSerive.deletePhoto(this.authService.decodedToken.nameid , photo.id)
      .subscribe(response => {
        this.photos.splice(this.photos.findIndex(p => p.id === photo.id) , 1);
        this.alertifiy.success('La foto ha sido borrada');
      }, error => this.alertifiy.error(error));
    });

  }

}
