import { Component, OnInit } from '@angular/core';
import { Product,createProductDTO,UpdateProductDTO } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2021,1,21);
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id:'',
      name:''
    },
    description: ''
  }
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getMyShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore();
    /*this.productsService.getAllProducts()
        .subscribe(data => {
          console.log('getAllProducts', data);
          this.products = data;
        });*/

  }

  onAddToShoppingCart(product: Product) {
    console.log(product);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id)
    .subscribe(data => {
      console.log('Product => ', data);
      this.productChosen = data;
      this.statusDetail = 'success';
    }, errorMSG => {
      window.alert(errorMSG);
      this.statusDetail = 'error'
      Swal.fire({
        icon: 'error',
        title: errorMSG,
        text: errorMSG,
        confirmButtonText: 'Close'
      })
    });
  }

  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id,{title:"change"})),
      switchMap((product) => this.productsService.update(product.id,{title:"change2"}))
    ).subscribe(data => {
        console.log(data);
    })
    //
    this.productsService.featchReadAndUpdat(id,{title:"change3"})
    .subscribe(response => {
      const readProduct = response[0];
      const updateProduct = response[1];
      console.log(readProduct);
      console.log(updateProduct);
    })

  }



  createNewProduct(){
    const product: createProductDTO = {
      title: 'Nuevo Producto',
      description: '123 456 789',
      price: 1500,
      images: ['image1','image2','image3'],
      categoryId: 1
    }
    this.productsService.create(product)
    .subscribe(data => {
      console.log('createNewProduct ',data);
      this.products.unshift(data);
    });
  }

  updateProduct(){
    const changeProduct = {
      title: 'Nuevo Producto2'
    }
    const id = this.productChosen.id;
    this.productsService.update(id,changeProduct)
    .subscribe(data => {
      this.products.map(function(dato){
        if(dato.id == id){
          dato.title = changeProduct.title;
        }
        return dato;
      });
      console.log('updateProduct ',this.products);

      const productIndex = this.products.findIndex(
        item => item.id == this.productChosen.id
      );
      this.products[productIndex] = data;
      this.productChosen = data;

    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(
        item => item.id == this.productChosen.id
      );
      this.products.splice(productIndex,1);
      this.showProductDetail= false;
    });
  }

  loadMore(){
    this.productsService.getProductbyPage(this.limit,this.offset)
        .subscribe(dataByPage => {
          this.products = this.products.concat(dataByPage);
          this.offset += this.limit;
        });
  }

}
