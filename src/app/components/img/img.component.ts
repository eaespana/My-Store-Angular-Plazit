import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set ChangeImg(newImg: string){
    this.img = newImg;
    console.log('Change just img', this.img );
  }

  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = 'https://www.w3schools.com/howto/img_avatar2.png';
  //counter = 0;
  //counterFn: number | undefined;


  constructor() {
    // before render
    // No async -- once time
    console.log('constructor','imgValue =>', this.img);
    this.img = 'Default';
  }

  ngOnChanges(changes: SimpleChanges){
    // before - during render
    // Change inputs -- times
    console.log('OnChanges','imgValue =>', this.img);
    console.log('change => ', changes);
  }

  ngOnInit(): void {
    // before render
    // async  - fetch -- once time
    console.log('ngOnInit','imgValue =>', this.img);
    /*this.counterFn = window.setInterval(() => {
      this.counter += 1;
      console.log(this.counter);
    }, 1000 )*/
  }

  ngAfterViewInit () {
    // after render
    // handler children
    console.log('ngAfterViewInit');
  }

  ngOnDestroy () {
    // delete
    console.log('NgOnDestroy');
    //window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('Loaded hijo');
    this.loaded.emit(this.img);
  }

}
