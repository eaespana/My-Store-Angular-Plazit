import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
