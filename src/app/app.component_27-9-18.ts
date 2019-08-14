import { Component, Input, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';

//import { Observable, fromEvent } from  'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//@ViewChild('myCanvas') myCanvas: ElementRef;
//declare var img;
export class AppComponent implements AfterViewInit {

  @ViewChild('trodon') trodon: ElementRef;
  @ViewChild('puzzle') puzzle: ElementRef;

  image = './assets/img/dimetrodon.jpg';
  boardSize : number = 480;

  public context: CanvasRenderingContext2D;  
  myImg : any;

  tileCount : number = 3;
  boardParts : any = [];
  emptyLoc : any = {};
  clickLoc : any = {};

  solved : boolean = false;
  tileSize : number = 480/3;
  source : any;
  contextCanv : CanvasRenderingContext2D;
  canvas : any;

  constructor(){

    //this.myImg = document.createElement('img');
    //this.myImg.src = './assets/img/dimetrodon.jpg';

    //console.log('### Image Data ######');
    //console.log(this.myImg);
    //img.src   = './assets/img/dimetrodon.jpg';

    this.emptyLoc.x = 0;
    this.emptyLoc.y = 0;

    this.clickLoc.x = 0;
    this.clickLoc.y = 0;

    this.boardParts = new Array(this.tileCount);
    //this.tileSize   = this.boardSize / this.tileCount;
  }

  ngAfterViewInit(): void {
    //this.context = (this.puzzle.nativeElement).getContext('2d');
    //this.draw();
    //this.context.drawImage(this.imageObj.nativeElement, 50, 50);
    
    //canvas event handling
    this.canvas = this.puzzle.nativeElement;
    this.contextCanv = this.canvas.getContext('2d');
    this.source = new Image(); 
    //this.boardSize  = 480;
    this.source.crossOrigin = 'Anonymous';

    //set the board
    this.setBoard();
    this.drawTiles();

    this.source.onload = () => {
        this.canvas.height = this.source.height;
        this.canvas.width = this.source.width;
        this.contextCanv.drawImage(this.source, 0, 0);

        this.image = this.canvas.toDataURL();  
    };
    
    this.source.src = this.image;
   // this.source.addEventListener('click', this.drawTiles(), false);

    //this.puzzle.addEventListner();
    console.log(this.source);
  }

  private drawTiles(){
    this.contextCanv.clearRect ( 0 , 0 , 480 , 480 );
    for (var i = 0; i < 3; ++i) {
      for (var j = 0; j < 3; ++j) {

        var x = this.boardParts[i][j].x;
        var y = this.boardParts[i][j].y;

        console.log('Value -> '+' X: '+x+' Y:- '+y);

        if(i != this.emptyLoc.x || j != this.emptyLoc.y || this.solved == true) {
          

          console.log('@@ image > ' + i + ' :: ' + j);
          console.log(x * this.tileSize + ' => ');

          this.contextCanv.drawImage(this.source, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize,
              2 * this.tileSize, 5 * this.tileSize, this.tileSize, this.tileSize);
        }
      }
    }
  }

  private setBoard(){
    console.log('###### set board #######');

    //this.boardParts = new Array(this.tileCount);
    for (var i = 0; i < this.tileCount; ++i) {
      this.boardParts[i] = new Array(this.tileCount);
      for (var j = 0; j < this.tileCount; ++j) {
        this.boardParts[i][j] = new Object;
        this.boardParts[i][j].x = (this.tileCount - 1) - i;
        this.boardParts[i][j].y = (this.tileCount - 1) - j;
      }
    }
    
    this.emptyLoc.x = this.boardParts[this.tileCount - 1][this.tileCount - 1].x;
    this.emptyLoc.y = this.boardParts[this.tileCount - 1][this.tileCount - 1].y;
    this.solved     = false;

    console.log(this.boardParts);
    
  }
  
  private draw() {
    //this.context.drawImage(img, 0,0);
    
  }
}
