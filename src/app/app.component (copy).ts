import { Component, Input, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';

//import { Observable, fromEvent } from  'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//@ViewChild('myCanvas') myCanvas: ElementRef;

export class AppComponent implements AfterViewInit {

  @ViewChild('samp') imageObj: ElementRef;
  @ViewChild('canvasEl') canvasEl: ElementRef;

  public context: CanvasRenderingContext2D;  
  myImg : any;

  constructor(){

    this.myImg = new Image();
    this.myImg.src = './assets/img/tiger.jpg';

    console.log('### Image Data ######');
    console.log(this.myImg);

  }

  ngAfterViewInit(): void {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    this.draw();
    //this.context.drawImage(this.imageObj.nativeElement, 50, 50);
    
    

  }
  
  private draw() {
    this.context.beginPath();
    this.context.moveTo(0,0);
    this.context.drawImage(this.myImg, 100, 20);
    this.context.lineTo(0,150);
    this.context.lineTo(150,150);
    this.context.lineTo(150,0);
    this.context.lineTo(0,0);

    this.context.font = "30px impact";
    this.context.textAlign = 'center';
    this.context.fillStyle = 'black';
    this.context.fillText('Hello...', 50, 30);

    this.context.stroke();
    
  }
}
