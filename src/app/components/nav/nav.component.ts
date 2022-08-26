import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public activeMenu = false;
  counter = 0;

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(product => {
      this.counter = product.length;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

}
