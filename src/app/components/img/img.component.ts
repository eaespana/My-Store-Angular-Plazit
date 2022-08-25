import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = 'https://www.w3schools.com/howto/img_avatar2.png';

  constructor() {
    // before render
    // No async -- once time
    console.log('constructor','imgValue =>', this.img);
    this.img = 'Default';
  }

  ngOnChanges(){
    // before - during render
    // Change inputs -- times
    console.log('OnChanges','imgValue =>', this.img);
  }

  ngOnInit(): void {
    // before render
    // async  - fetch -- once time
    console.log('ngOnInit','imgValue =>', this.img);
  }

  ngAfterViewInit () {
    // after render
    // handler children
    console.log('ngAfterViewInit');
  }

  ngOnDestroy () {
    // delete
    console.log('NgOnDestroy');
  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('Loaded hijo');
    this.loaded.emit(this.img);
  }

}
