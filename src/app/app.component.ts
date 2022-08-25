import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-store';
  imgPadre = 'https://www.w3schools.com/howto/img_avatar.png';
  showImg = true;

  onLoaded(img: string){
    console.log('Loaded Padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

}
