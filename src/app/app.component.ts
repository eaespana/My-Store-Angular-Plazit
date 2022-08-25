import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-store';
  imgPadre = 'https://www.w3schools.com/howto/img_avatar.png';
  showImg = true;

  products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: 'https://www.w3schools.com/howto/img_avatar.png'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: 'https://www.w3schools.com/howto/img_avatar.png'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: 'https://www.w3schools.com/howto/img_avatar.png'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: 'https://www.w3schools.com/howto/img_avatar.png'
    }
  ];

  onLoaded(img: string){
    console.log('Loaded Padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

}
