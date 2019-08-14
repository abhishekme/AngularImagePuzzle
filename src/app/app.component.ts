import { Component, Input, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';

//import { Observable, fromEvent } from  'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//@ViewChild('myCanvas') myCanvas: ElementRef;
//declare var img;
export class AppComponent implements AfterViewInit {

  @ViewChild('trodon') trodon: ElementRef;
  @ViewChild('puzzle') puzzle: ElementRef<HTMLCanvasElement>;

  image = './assets/img/rsz_royal-bengal-tiger-3.jpg';//'./assets/img/Royal-Bengal-Tiger-1.jpg';
  boardSize : number = 450;

  //public context: CanvasRenderingContext2D;  
  myImg : any;

  tileCount : number = 3;
  boardParts : any = [];
  emptyLoc : any = {};
  clickLoc : any = {};

  offsetLeft : any;
  offsetTop : any;

  solved : boolean = false;
  tileSize : number = this.boardSize/3;
  public source : any;
  contextCanv : CanvasRenderingContext2D;
  canvas : any;
  upimage : any;
  hintText: string;
  hintStyle:string;
  constructor(){

    //this.myImg = document.createElement('img');
    //this.myImg.src = './assets/img/dimetrodon.jpg';
    //console.log('### Image Data ######');
    //console.log(this.myImg);
    //img.src   = './assets/img/dimetrodon.jpg';

    this.clickLoc   = new Object();
    this.emptyLoc   = new Object();

    this.emptyLoc.x = 0;
    this.emptyLoc.y = 0;

    this.clickLoc.x = 0;
    this.clickLoc.y = 0;

    this.boardParts = new Array(this.tileCount);
    this.source = new Image();
    this.hintText   = 'Upload image width/height should be 450px.';
    this.hintStyle  = 'hint-guide';
    //this.tileSize   = this.boardSize / this.tileCount;
    //console.log("Canvas Width/Height: ",this.puzzle.nativeElement.width);
  }

  resetTiles(){
    this.scaleChange(3);
  }

  slideTile(toLoc : any, fromLoc : any) {
    if (!this.solved) {
      this.boardParts[toLoc.x][toLoc.y].x = this.boardParts[fromLoc.x][fromLoc.y].x;
      this.boardParts[toLoc.x][toLoc.y].y = this.boardParts[fromLoc.x][fromLoc.y].y;
      this.boardParts[fromLoc.x][fromLoc.y].x = this.tileCount - 1;
      this.boardParts[fromLoc.x][fromLoc.y].y = this.tileCount - 1;
      toLoc.x = fromLoc.x;
      toLoc.y = fromLoc.y;
      this.checkSolved();
    }
  }

  checkSolved() : any{
    var flag = true;
    for (var i = 0; i < this.tileCount; ++i) {
      for (var j = 0; j < this.tileCount; ++j) {
        if (this.boardParts[i][j].x != i || this.boardParts[i][j].y != j) {
          flag = false;
        }
      }
    }
    this.solved = flag;
  }

  changeposition(e) : any{
    if(e !== undefined){

      var srcObj      = e.srcElement;
      this.clickLoc.x = Math.floor((e.pageX - srcObj.offsetLeft) / this.tileSize);
      this.clickLoc.y = Math.floor((e.pageY - srcObj.offsetTop) / this.tileSize);

      if (this.distance(this.clickLoc.x, this.clickLoc.y, this.emptyLoc.x, this.emptyLoc.y) == 1) {
        this.slideTile(this.emptyLoc, this.clickLoc);
        this.drawTiles();
      }
      if (this.solved) {
        this.hintStyle = 'hint-succ';
        this.hintText  = 'Congratulations! You solved it!';
        //alert("Congratulations! You solved it!");
      }
    }
  }

  upload_image(evt){

    var reader      = new FileReader();
    var fileObj     = evt.target.files;
    var file        = fileObj[0];
    var img         = document.createElement('img');
    var imageBlob   = URL.createObjectURL(file);

    img.src = imageBlob;
    img.onload = () => { 
      var width   = img.width;
      var height  = img.height;

      if(width != height || (width != 450 || height != 450)){
        this.hintText  = 'Image size Not identical, should be Width:450px and Height:450px';
        this.hintStyle = 'hint-error';
        this.source.src = this.image;
        return false;
      }
    }
    this.hintText   = 'Upload image width/height should be 450px.';
    this.hintStyle  = 'hint-guide';
    this.source.src =  imageBlob;
  }

  clickMe() : void{
    if (this.distance(this.clickLoc.x, this.clickLoc.y, this.emptyLoc.x, this.emptyLoc.y) == 1) {
      this.slideTile(this.emptyLoc, this.clickLoc);
    }
  }

  distance(x1 : number, y1 : number, x2 : number, y2 : number) : number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  ngAfterViewInit(): void {
    this.drawBoardImage();
  }

  private drawBoardImage(){

    this.canvas = document.getElementById('puzzle');;
    this.contextCanv = this.canvas.getContext('2d');
     
    this.source.crossOrigin = 'Anonymous';
    this.source.onload = () => {
        this.canvas.height = this.source.height;
        this.canvas.width = this.source.width;
        this.contextCanv.drawImage(this.source, 0, 0); 
    };
    this.source.src = this.image;
  }

  private drawTiles(){
    //console.log(this.source.src);
    this.contextCanv.clearRect ( 0 , 0 , this.boardSize , this.boardSize );
    for (var i = 0; i < this.tileCount; ++i) {
      for (var j = 0; j < this.tileCount; ++j) {

        var x = this.boardParts[i][j].x;
        var y = this.boardParts[i][j].y;

        if(i != this.emptyLoc.x || j != this.emptyLoc.y || this.solved == true) {

          this.contextCanv.drawImage(this.source, x * this.tileSize, 
              y * this.tileSize, this.tileSize, this.tileSize,
              i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize);
        }
      }
    }
  }

  private scaleChange(getVal : number){
    if(getVal){
      this.hintText   = 'Upload image width/height should be minimum 450px.';
      this.hintStyle  = 'hint-guide';
    }
    this.tileCount = getVal;
    this.tileSize = this.boardSize / this.tileCount;
    this.setBoard();
    this.drawTiles();
  }

  private setBoard(){
    this.boardParts = new Array(this.tileCount);
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
  }
}
