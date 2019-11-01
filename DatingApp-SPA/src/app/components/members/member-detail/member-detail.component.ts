import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../_models/user';
import { UserService } from '../../../services/user.service';
import { AlertifyService } from '../../../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryImage,
  NgxGalleryOptions,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });

    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.staticTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imagePercent: 100,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls= [];
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.user.photos.length; index++) {
      imageUrls.push({
        small: this.user.photos[index].url,
        medium: this.user.photos[index].url,
        big: this.user.photos[index].url,
        descripction: this.user.photos[index].description
      });
    }
    console.log(imageUrls);
    return imageUrls;
  }
  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params.id).subscribe( (user: User) => {
  //     this.user = user;
  //   }, error => this.alertify.error(error));
  // }
}
