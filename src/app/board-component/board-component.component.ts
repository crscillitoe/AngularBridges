import { Component, OnInit } from '@angular/core';
import { Board, MyNode, Bridge } from '../board';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-component',
  templateUrl: './board-component.component.html',
  styleUrls: ['./board-component.component.css']
})

@Injectable()
export class BoardComponentComponent implements OnInit {

    pause: boolean;
    factor: number;
    squareSize: number;
    width: number;
    height: number;
    solved: boolean;
    xAdd: number;
    seed: number;
    yAdd: number;
    pressedX: number;
    pressedY: number;
    drawLetters: boolean;
    drawGridBool: boolean;
    drawTextColorBool: boolean;
    name: any;
    coloredNode: MyNode;
    board: Board;
    context: any;
    canvas: any;
    extreme: boolean;
    shift: boolean;
    mouseX: number;
    mouseY: number;
    drawMouseX: number;
    drawMouseY: number;

    circleColor: string[];
    circleTextColor: string;
    circleTextColors: string[];
    circleSelectedColor: string[];
    circleSelectedTextColor: string;
    backgroundColor: string;
    gridColor: string;
    bridgeColor: string;
    wrongCircleColor: string;
    seconds: any;
    minutes: any;
    hours: any;
    millis: any;
    t: any;
    daily: boolean;

    private user: Observable<firebase.User>;
    private userDetails: firebase.User = null;

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private _firebaseAuth: AngularFireAuth) { 
        this.pause = false;
        this.user = _firebaseAuth.authState;
        this.mouseX = -1;
        this.mouseY = -1;
        this.user.subscribe(
            (user) => {
            if (user) {
                this.userDetails = user;
            }
            else {
                this.userDetails = null;
            }
            });
    }

    fullscreen() {
        document.documentElement.webkitRequestFullScreen()

    }

    back() {
        this.nightTheme();
        this.router.navigate(['mainMenu']);
    }

    newBoard() {
        this.name = "";
        this.millis = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        if(this.solved) {
            this.solved = false;
            this.timer();
        }
        var numNodes = Number(this.route.snapshot.paramMap.get('numNodes'));
        if(numNodes === 0) {
            numNodes = Math.floor(Math.sqrt(this.width * this.height)) * 2;
        }
        this.solved = false;
        this.board = new Board(this.width, this.height, numNodes, this.extreme, 0, null, null, null, null, null);
        this.seed = 0;
        this.board.generateBoard();
        this.draw();
    }

    // Initializes data
    ngOnInit() {
        this.name = "";
        this.drawLetters = true;
        this.drawGridBool = true;
        this.drawTextColorBool = false;
        this.solved = false;
        this.width = Number(this.route.snapshot.paramMap.get('width'));
        this.height = Number(this.route.snapshot.paramMap.get('height'));
        this.extreme = "true" == this.route.snapshot.paramMap.get('extreme');
        this.daily = "true" == this.route.snapshot.paramMap.get('daily');
        var numNodes = Number(this.route.snapshot.paramMap.get('numNodes'));
        this.drawLetters = this.route.snapshot.paramMap.get('numbers') == "true";
        this.drawGridBool = this.route.snapshot.paramMap.get('grid') == "true";
        
        var theme = this.route.snapshot.paramMap.get('theme');
        this.seed = Number(this.route.snapshot.paramMap.get('seed'));
        if(numNodes === 0) {
            numNodes = Math.floor(Math.sqrt(this.width * this.height)) * 2;
        }
        this.board = new Board(this.width, this.height, numNodes, this.extreme, this.seed, null, null, null, null, null);
        this.board.generateBoard();


        this.canvas = document.getElementById('myCanvas');
        this.context = this.canvas.getContext('2d');
       
        this.millis = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.timer();

        var __this = this;

        this.canvas.addEventListener('mousedown', (e) => this.mousePressed(e), false);
        this.canvas.addEventListener('mouseup', (e) => this.mouseReleased(e), false);
        
        var hotkeys = this.route.snapshot.paramMap.get('hotkeys') == 'true';
        if(hotkeys) {
            this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e), false);
        }
        window.addEventListener('keydown', function(e) {__this.keyPressed(e, __this) }, false);
        window.addEventListener('keyup', function(e) {__this.keyReleased(e, __this) }, false);

        if(theme == 'night') {
            this.nightTheme();
        } else if(theme == 'light') {
            this.lightTheme();
        } else if(theme == 'colorblind') {
            this.colorblindMode();
        }
        this.fixSizes();
    }

    mouseMove(mouseEventData) {
        if(!this.pause) {
            this.drawMouseX = mouseEventData.clientX - 225;
            this.drawMouseY = mouseEventData.clientY;
            this.mouseX = mouseEventData.clientX + window.scrollX;
            this.mouseY = this.drawMouseY + window.scrollY;
            
            this.draw();
        }
    }

    drawMouse() {
        var pointX = Math.round(((this.mouseX - 225))/this.factor);
        var pointY = Math.round(((this.mouseY - 0))/this.factor);
        var img;
        if(this.isCircleHere(pointX, pointY)) {
            this.drawCircleOutline(this.getCircleHere(pointX, pointY));
        }
    }

    pauseGame() {
        this.pause = !this.pause;
        if(this.pause == true) {
            this.drawBackground();
        } else { 
            this.draw();
        }
    }

    add(___this) {
        var h1 = document.getElementsByTagName("h1")[0];
        if(!this.pause) {
            ___this.millis++;
            if(___this.millis >= 100) {
                ___this.millis = 0
                ___this.seconds++;
                if (___this.seconds >= 60) {
                    ___this.seconds = 0;
                    ___this.minutes++;
                    if (___this.minutes >= 60) {
                        ___this.minutes = 0;
                        ___this.hours++;
                    }
                }
            }
            h1.textContent = (___this.hours ? (___this.hours > 9 ? ___this.hours : "0" + ___this.hours) : "00") + ":" + (___this.minutes ? (___this.minutes > 9 ? ___this.minutes : "0" + ___this.minutes) : "00") + ":" + (___this.seconds > 9 ? ___this.seconds : "0" + ___this.seconds) + "." + (___this.millis > 9 ? ___this.millis : "0"+___this.millis);
        }
        ___this.timer();
    }

    timer() {
        if(!this.solved) {
            var ___this = this;
            this.t = setTimeout(function() {___this.add(___this)}, 10);
        }
    }

    colorblindMode() {
        this.circleColor = [
            "#144df7", //0
            "#117733", //1
            "#88ccee", //2
            "#44aa99", //3
            "#ddcc77", //4
            "#ff9933", //5
            "#ff4a38", //6
            "#ff5ef1", //7
            "#851f53" //8
        ];

        this.circleTextColor = "#303030";
        this.circleSelectedColor = [
            "#144df7", //0
            "#5da274", //1
            "#aedcf3", //2
            "#7fc5b9", //3
            "#e8dca2",//4
            "#ffcc99", //5
            "#ff9085", //6
            "#ff9df6",//7
            "#b47696",//8
        ];
        this.circleSelectedTextColor = "#ebdbb2";
        this.backgroundColor = "#2c2c2c";
        this.gridColor = "#fff6cc";
        this.bridgeColor = "#fff1b1";
        this.wrongCircleColor = "#f7f7f7";


        document.documentElement.style.setProperty('--done-color', this.circleColor[1]);      
        document.documentElement.style.setProperty('--grid-color', this.gridColor);      
        document.documentElement.style.setProperty('--background-color', this.backgroundColor);       
        document.documentElement.style.setProperty('--back-color', this.circleColor[6]);
        document.documentElement.style.setProperty('--timer-color', this.circleColor[4]);
        document.documentElement.style.setProperty('--newboard-color', this.circleColor[3]);
        this.draw();
    }

    lightTheme() {
        this.circleColor = [
            "#4db93b", //0
            "#aad46d", //1
            "#80daaf", //2
            "#4bb5ac", //3
            "#ffba53", //4
            "#e092a3", //5
            "#d86155", //6
            "#dc1d2b", //7
            "#ec2474" //8
        ];

        this.circleTextColor = "#303030";
        this.circleSelectedColor = [
            "#4db93b", //0
            "#c2e193", //1
            "#a2e6c5", //2
            "#7accc4", //3
            "#ffca82",//4
            "#eaaab8", //5
            "#e6857b", //6
            "#e93d5b",//7
            "#f44894",//8
        ];
        this.circleSelectedTextColor = "#ebdbb2";
        this.backgroundColor = "#fffef9";
        this.gridColor = "#ff8460";
        this.bridgeColor = "#ff7e59";
        this.wrongCircleColor = "#68686b";

        document.documentElement.style.setProperty('--done-color', this.backgroundColor);      
        document.documentElement.style.setProperty('--grid-color', this.backgroundColor);      
        document.documentElement.style.setProperty('--background-color', this.gridColor);       
        document.documentElement.style.setProperty('--back-color', this.backgroundColor);
        document.documentElement.style.setProperty('--timer-color', this.backgroundColor);
        document.documentElement.style.setProperty('--newboard-color', this.backgroundColor);
        

        this.draw();
    }

    nightTheme() {
        this.circleColor = [
            "#4db93b",
            "#aad46d",
            "#80daaf",
            "#4bb5ac",
            "#ffba53",
            "#d88799",
            "#f24b3e",
            "#dc1d2b",
            "#ec2474"
        ];

        this.circleTextColors = [
            "#b246c4",
            "#552B92",
            "#7F2550",
            "#b44a53",
            "#0045AC",
            "#277866",
            "#0db4c1",
            "#23e2d4",
            "#13db8b"
        ];

        this.circleTextColor = "#303030";
        this.circleSelectedColor = [
            "#4db93b",
            "#d1f898",
            "#a5fad1",
            "#84e8de",
            "#ffd79d",
            "#f8abbd",
            "#ff9289",
            "#f86872",
            "#ff77ad",
        ];
        this.circleSelectedTextColor = "#ebdbb2";
        this.backgroundColor = "#2c2c2c";
        this.gridColor = "#a89984";
        this.bridgeColor = "#fff2ad";
        this.wrongCircleColor = "#FFFFFF";

        document.documentElement.style.setProperty('--done-color', this.circleColor[1]);      
        document.documentElement.style.setProperty('--grid-color', this.gridColor);      
        document.documentElement.style.setProperty('--background-color', this.backgroundColor);       
        document.documentElement.style.setProperty('--back-color', this.circleColor[6]);
        document.documentElement.style.setProperty('--timer-color', this.circleColor[4]);
        document.documentElement.style.setProperty('--newboard-color', this.circleColor[3]);

        this.draw();
    }

    bigBoard() {
        this.context.beginPath();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = 3000;
        this.canvas.height = 3000;
        this.context.translate(0.5, 0.5)

       
        
        var larger = Math.max(this.width, this.height) + 1;
        var size = Math.min(this.canvas.offsetWidth, this.canvas.offsetHeight);

        this.factor = Math.floor(size/larger);
        this.squareSize = this.factor;
        this.context.font = 'bold '+Math.round(this.factor)+'px Arial';
        this.xAdd = 0;
        this.yAdd = 0;

        this.draw();  
    }

    fixSizes() {
        this.context.beginPath();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        
        this.canvas.width = window.innerWidth - 260;
        this.canvas.height = window.innerHeight;
        this.context.translate(0.5, 0.5)

       
        
        var larger = Math.max(this.width, this.height) + 1;
        var size = Math.min(this.canvas.offsetWidth, this.canvas.offsetHeight);

        this.factor = Math.floor(size/larger);
        this.squareSize = this.factor;
        this.context.font = 'bold '+Math.round(this.factor)+'px Arial';
        this.xAdd = 0;
        this.yAdd = 0;

        this.draw();    
    }

    draw() {
        this.context.beginPath();
        this.drawBackground();
        this.drawGrid();    
        this.drawBridges();
        this.drawCircles();
        if(this.coloredNode != undefined) {
            this.drawCircleRed(this.coloredNode);
        }
        this.drawMouse();
    }

    drawGrid() {
        
        if(this.drawGridBool) {
            var x = 0;
            var y = 0;
            for(x = 1 ; x <= this.width ; x++) {
                var circleX = this.xAdd + (x * (this.factor));
                var circleY = this.yAdd + (1 * (this.factor));
                var circleY2 = this.yAdd + (this.height * (this.factor));

                
                this.context.lineWidth = 1;
                this.context.strokeStyle = this.gridColor;
                this.context.moveTo(circleX, circleY);
                this.context.lineTo(circleX, circleY2);
                this.context.stroke();

            }

            for(y = 1 ; y <= this.height ; y++) {
                var circleX = this.xAdd + (1 * (this.factor));
                var circleY = this.yAdd + (y * (this.factor));
                var circleX2 = this.xAdd + (this.width * (this.factor));

                
                this.context.lineWidth = 1;
                this.context.strokeStyle = this.gridColor;
                this.context.moveTo(circleX, circleY);
                this.context.lineTo(circleX2, circleY);
                this.context.stroke();
            }
        }
    }

    drawCircles() {
        for(let node of this.board.getNodes()) {
            this.drawCircle(node);
        }
    }

    drawCircle(node: MyNode) {
       
        var circleX = (node.getX() * (this.factor)) - this.factor/2;
        var circleY = (node.getY() * (this.factor)) - this.factor/2;

        var circleString = "" + node.getVal();

        if(node.getVal() - this.getNumBridges(node) >= 0) {
            this.context.fillStyle = this.circleColor[node.getVal() - this.getNumBridges(node)];
        } else {
            this.context.fillStyle = this.wrongCircleColor;
        }

        
        //this.context.fillRect(circleX, circleY, this.squareSize, this.squareSize);
        this.ellipse(this.context, circleX, circleY, this.squareSize, this.squareSize);

        if(this.drawLetters) {
            if(this.drawTextColorBool) {
                this.context.fillStyle = this.circleTextColors[node.getVal() - this.getNumBridges(node)];
            } else {
                this.context.fillStyle = this.circleTextColor;
            }
            
            this.context.fillText(circleString, circleX + this.factor/4.3, circleY + this.factor/1.2);
        }
    }

    ellipse(context, cx, cy, rx, ry){
        context.save(); // save state
        context.beginPath();
        context.translate(cx, cy);
        context.scale(rx/2, ry/2);
        context.arc(1, 1, 1, 0, 2 * Math.PI, false);
        context.fill();

        context.restore(); // restore to original state
    }

    ellipseFill(context, cx, cy, rx, ry){
        context.save(); // save state
        context.beginPath();
        context.translate(cx, cy);
        context.scale(rx/2, ry/2);
        context.arc(1, 1, 1, 0, 2 * Math.PI, false);
        context.fill();
        context.restore(); // restore to original state
        this.context.strokeStyle = this.bridgeColor;
        this.context.lineWidth = this.factor/10;
        context.stroke();
    }

    makeCircle(x, y, diameter) {
        this.context.arc(x, y, diameter/2, 0, 2*Math.PI, false);
    }

    toggleLetters() {
        this.drawLetters = !this.drawLetters;
        this.draw();
    }

    toggleTextColor() {
        this.drawTextColorBool = !this.drawTextColorBool;
        this.draw();
    }

    toggleGrid() {
        this.drawGridBool = !this.drawGridBool;
        this.draw();
    }

    getNumBridges(node) {
        var toReturn = 0;
        for(let b of node.getBridges()) {
            toReturn += b.getNum();
        }
        return toReturn;
    }

    drawCircleOutline(node: MyNode) {
        var circleX = (node.getX() * (this.factor)) - this.factor/2;
        var circleY = (node.getY() * (this.factor)) - this.factor/2;

        var circleString = "" + node.getVal();

        if(node.getVal() - this.getNumBridges(node) >= 0) {
            this.context.fillStyle = this.circleSelectedColor[node.getVal() - this.getNumBridges(node)];
        } else {
            this.context.fillStyle = this.wrongCircleColor;
        }

        
        //this.context.fillRect(circleX, circleY, this.squareSize, this.squareSize);
        this.ellipseFill(this.context, circleX, circleY, this.squareSize, this.squareSize);

        if(this.drawLetters) {
            if(this.drawTextColorBool) {
                this.context.fillStyle = this.circleTextColors[node.getVal() - this.getNumBridges(node)];
            } else {
                this.context.fillStyle = this.circleTextColor;
            }
            
            this.context.fillText(circleString, circleX + this.factor/4.3, circleY + this.factor/1.2);
        }
    }

    drawCircleRed(node: MyNode) {
        var circleX = (node.getX() * (this.factor)) - this.factor/2;
        var circleY = (node.getY() * (this.factor)) - this.factor/2;

        var circleString = "" + node.getVal();

        if(node.getVal() - this.getNumBridges(node) >= 0) {
            this.context.fillStyle = this.circleSelectedColor[node.getVal() - this.getNumBridges(node)];
        } else {
            this.context.fillStyle = this.circleSelectedColor[0];
        }
        this.context.strokeStlye = "#FFFFFF";
        //this.context.fillRect(circleX, circleY, this.squareSize, this.squareSize);
        this.ellipse(this.context, circleX, circleY, this.squareSize, this.squareSize);
        if(this.drawLetters) {
            if(this.drawTextColorBool) {
                this.context.fillStyle = this.circleTextColors[node.getVal() - this.getNumBridges(node)];
            } else {
                this.context.fillStyle = this.circleTextColor;
            }
            this.context.fillText(circleString, circleX + this.factor/4.3, circleY + this.factor/1.2);
        }

    }


    drawBackground() {
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
    }

    isCircleHere(x: number, y: number) {
        for(let node of this.board.getNodes()) {
            if(node.getX() == x && node.getY() == y) {
                return true;
            }
        }
        return false;
    }

    getCircleHere(x: number, y: number) {
        for(let node of this.board.getNodes()) {
            if(node.getX() == x && node.getY() == y) {
                return node;
            }
        }
        return null;
    }

    mousePressed(mouseEventData) {
        if(!this.pause) {
            if(!this.solved) {
                var x = mouseEventData.clientX + window.scrollX;
                var y = mouseEventData.clientY + window.scrollY;
                this.pressedX = x;
                this.pressedY = y;


                var pointX = Math.round(((x - 225))/this.factor);
                var pointY = Math.round(((y - 0))/this.factor);

                if(this.isCircleHere(pointX, pointY)) {
                    this.coloredNode = this.getCircleHere(pointX, pointY);
                    this.drawCircleRed(this.coloredNode);
                } else {
                    this.coloredNode = undefined;
                }
            }
        }
    }

    drawBridges() {
        for(let node of this.board.getNodes()) {
            for(let bridge of node.getBridges()) {
                if(bridge.getNum() > 0) {
                    if(bridge.getNum() === 1) {
                        var n1x = this.xAdd + (bridge.getN1().getX() * (this.factor));
                        var n1y = this.yAdd + (bridge.getN1().getY() * (this.factor));
                        var n2x = this.xAdd + (bridge.getN2().getX() * (this.factor));
                        var n2y = this.yAdd + (bridge.getN2().getY() * (this.factor));

                        this.context.strokeStyle = this.bridgeColor;
                        this.context.lineWidth = this.factor/10;
                        this.context.strokeRect(n1x, n1y, n2x-n1x, n2y-n1y);
                    } else {
                        var n1x = this.xAdd + (bridge.getN1().getX() * (this.factor));
                        var n1y = this.yAdd + (bridge.getN1().getY() * (this.factor));
                        var n2x = this.xAdd + (bridge.getN2().getX() * (this.factor));
                        var n2y = this.yAdd + (bridge.getN2().getY() * (this.factor));
                        if(n1x === n2x) {
                            var b1x = n1x - this.factor/5;
                            var b2x = n2x - this.factor/5;
                            var b3x = n1x + this.factor/5;
                            var b4x = n2x + this.factor/5;
                            this.context.strokeStyle = this.bridgeColor;
                            this.context.lineWidth = this.factor/10;
                            this.context.strokeRect(b1x, n1y, b2x-b1x, (n2y-n1y));
                            this.context.strokeRect(b3x, n1y, b4x-b3x, (n2y-n1y));
                        } else {
                            var b1y = n1y - this.factor/5;
                            var b2y = n2y - this.factor/5;
                            var b3y = n1y + this.factor/5;
                            var b4y = n2y + this.factor/5;
                            this.context.strokeStyle = this.bridgeColor;
                            this.context.lineWidth = this.factor/10;
                            this.context.strokeRect(n1x, b1y, (n2x-n1x), (b2y-b1y));
                            this.context.strokeRect(n1x, b3y, (n2x-n1x), (b4y-b3y));
                        }
                    }
                }
            }
        }
    }

    bridgeUp() {
        var counter;
        if(this.isCircleHere(this.coloredNode.getX() , this.coloredNode.getY() - 1)) {
            return;
        }
        for(counter = this.coloredNode.getY() - 1; counter > 0; counter--) {
            if(this.isCircleHere(this.coloredNode.getX(), counter)) {
                var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === this.coloredNode.getX() &&
                        bridge.getN1().getY() === this.coloredNode.getY())||
                       (bridge.getN2().getX() === this.coloredNode.getX() &&
                        bridge.getN2().getY() === this.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            bridge.setNum(0);
                        } else {
                            bridge.setNum(bridge.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, 1);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    specialBridgeUp() {
        var counter;
        if(this.isCircleHere(this.coloredNode.getX() , this.coloredNode.getY() - 1)) {
            return;
        }
        for(counter = this.coloredNode.getY() - 1; counter > 0; counter--) {
            if(this.isCircleHere(this.coloredNode.getX(), counter)) {
                var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === this.coloredNode.getX() &&
                        bridge.getN1().getY() === this.coloredNode.getY())||
                        (bridge.getN2().getX() === this.coloredNode.getX() &&
                        bridge.getN2().getY() === this.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            bridge.setNum(0);
                        } else {
                            bridge.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, 2);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    } 
    specialBridgeDown() {
        var counter;
        if(this.isCircleHere(this.coloredNode.getX() , this.coloredNode.getY() + 1)) {
            return;
        }
        for(counter = this.coloredNode.getY() + 1; counter < this.height + 1; counter++) {
            if(this.isCircleHere(this.coloredNode.getX(), counter)) {
                var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === this.coloredNode.getX() &&
                        bridge.getN1().getY() === this.coloredNode.getY())||
                       (bridge.getN2().getX() === this.coloredNode.getX() &&
                        bridge.getN2().getY() === this.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            bridge.setNum(0);
                        } else {
                            bridge.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, 2);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    bridgeDown() {
        var counter;
        if(this.isCircleHere(this.coloredNode.getX() , this.coloredNode.getY() + 1)) {
            return;
        }
        for(counter = this.coloredNode.getY() + 1; counter < this.height + 1; counter++) {
            if(this.isCircleHere(this.coloredNode.getX(), counter)) {
                var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === this.coloredNode.getX() &&
                        bridge.getN1().getY() === this.coloredNode.getY())||
                       (bridge.getN2().getX() === this.coloredNode.getX() &&
                        bridge.getN2().getY() === this.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            bridge.setNum(0);
                        } else {
                            bridge.setNum(bridge.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, 1);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    specialBridgeLeft() {
        var counter;
        if(this.isCircleHere(this.coloredNode.getX() - 1, this.coloredNode.getY())) {
            return;
        }
        for(counter = this.coloredNode.getX() - 1; counter > 0; counter--) {
            if(this.isCircleHere(counter, this.coloredNode.getY())) {
                var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === this.coloredNode.getX() &&
                        bridge.getN1().getY() === this.coloredNode.getY())||
                       (bridge.getN2().getX() === this.coloredNode.getX() &&
                        bridge.getN2().getY() === this.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            bridge.setNum(0);
                        } else {
                            bridge.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, 2);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    bridgeLeft() {
        var counter;
        if(this.isCircleHere(this.coloredNode.getX() - 1, this.coloredNode.getY())) {
            return;
        }
        for(counter = this.coloredNode.getX() - 1; counter > 0; counter--) {
            if(this.isCircleHere(counter, this.coloredNode.getY())) {
                var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === this.coloredNode.getX() &&
                        bridge.getN1().getY() === this.coloredNode.getY())||
                       (bridge.getN2().getX() === this.coloredNode.getX() &&
                        bridge.getN2().getY() === this.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            bridge.setNum(0);
                        } else {
                            bridge.setNum(bridge.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, 1);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    specialBridgeRight() {
        var counter;
        if(this.isCircleHere(this.coloredNode.getX() + 1, this.coloredNode.getY())) {
            return;
        }
        for(counter = this.coloredNode.getX() + 1; counter < this.width + 1; counter++) {
            if(this.isCircleHere(counter, this.coloredNode.getY())) {
                var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === this.coloredNode.getX() &&
                        bridge.getN1().getY() === this.coloredNode.getY())||
                       (bridge.getN2().getX() === this.coloredNode.getX() &&
                        bridge.getN2().getY() === this.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            bridge.setNum(0);
                        } else {
                            bridge.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, 2);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    bridgeRight() {
        var counter;
        if(this.isCircleHere(this.coloredNode.getX() + 1, this.coloredNode.getY())) {
            return;
        }
        for(counter = this.coloredNode.getX() + 1; counter < this.width + 1; counter++) {
            if(this.isCircleHere(counter, this.coloredNode.getY())) {
                var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
                var bridgeExists = false;
                for(let bridge of toBridgeTo.getBridges()) {
                    if((bridge.getN1().getX() === this.coloredNode.getX() &&
                        bridge.getN1().getY() === this.coloredNode.getY())||
                       (bridge.getN2().getX() === this.coloredNode.getX() &&
                        bridge.getN2().getY() === this.coloredNode.getY())) {
                        if(bridge.getNum() === 2) {
                            bridge.setNum(0);
                        } else {
                            bridge.setNum(bridge.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, 1);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    mouseReleased(mouseEventData) {
        if(!this.pause) {
            var x = mouseEventData.clientX + window.scrollX;
            var y = mouseEventData.clientY + window.scrollY;
            var button = mouseEventData.button;
            if(!this.shift) {
                if(this.coloredNode !== undefined) {
                    if(Math.abs(this.pressedX - x) > Math.abs(this.pressedY - y)) {
                        if(this.pressedX > x) {
                            this.bridgeLeft();
                            if(button == 2) {
                                this.bridgeLeft();
                            }
                            this.done();
                            this.draw();
                        } else {
                            this.bridgeRight();
                            if(button == 2) {
                                this.bridgeRight();
                            }
                            this.done();
                            this.draw();
                        }
                    } else {
                        if(this.pressedY > y) {
                            this.bridgeUp();
                            if(button == 2) {
                                this.bridgeUp();
                            }
                            this.done();
                            this.draw();
                        } else {
                            this.bridgeDown();
                            if(button == 2) {
                                this.bridgeDown();
                            }
                            this.done();
                            this.draw();
                        }
                    }
                    this.coloredNode = undefined;
                    this.draw();
                }
            } else {
                this.bridgeDown();
                this.bridgeLeft();
                this.bridgeRight();
                this.bridgeUp();
                if(button == 2) {
                    this.bridgeDown();
                    this.bridgeLeft();
                    this.bridgeRight();
                    this.bridgeUp();
                }
                this.coloredNode = undefined;
                this.done();
                this.draw();
            }
        }
    }
    

    submit() {
        var numNodes = Number(this.route.snapshot.paramMap.get('numNodes'));
        if(!this.daily) {
        if(this.width == 40 && this.height == 40 && numNodes == 500000 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/40x40hard/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } else if(this.width == 7 && this.height == 7 && numNodes == 14 && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/7x7easy/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }  else if(this.width == 7 && this.height == 7 && numNodes == 21 && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/7x7medium/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } 
        else if(this.width == 15 && this.height == 15 && numNodes == 30 && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/15x15easy/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }  else if(this.width == 15 && this.height == 15 && numNodes == 45 && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/15x15medium/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }

        else if(this.width == 25 && this.height == 25 && numNodes == 50 && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/25x25easy/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }  
        
        else if(this.width == 40 && this.height == 40 && numNodes == 80 && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/40x40easy/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }  else if(this.width == 40 && this.height == 40 && numNodes == 120 && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/40x40medium/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }

        else if(this.width == 100 && this.height == 100 && numNodes == 200 && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/100x100easy/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }  else if(this.width == 100 && this.height == 100 && numNodes == 300 && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/100x100medium/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }
        else if(this.width == 25 && this.height == 25 && numNodes == 75 && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/25x25medium/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }
        else if(this.width == 7 && this.height == 7 && numNodes == 500000 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/7x7hard/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } else if(this.width == 7 && this.height == 7 && numNodes == 500000 && this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/7x7extreme/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } 


        else if(this.width == 10 && this.height == 10 && numNodes == 20 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/10x10easy/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } 

        else if(this.width == 10 && this.height == 10 && numNodes == 30 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/10x10medium/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } 

        else if(this.width == 10 && this.height == 10 && numNodes == 500000 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/10x10hard/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }
        
        else if(this.width == 10 && this.height == 10 && numNodes == 500000 && this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/10x10extreme/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }

        
        else if(this.width == 60 && this.height == 60 && numNodes == 120 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/60x60easy/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } 

        else if(this.width == 60 && this.height == 60 && numNodes == 180 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/60x60medium/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } 

        else if(this.width == 60 && this.height == 60 && numNodes == 500000 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/60x60hard/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }
        
        else if(this.width == 60 && this.height == 60 && numNodes == 500000 && this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/60x60extreme/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }

        
        else if(this.width == 80 && this.height == 80 && numNodes == 160 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/80x80easy/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } 

        else if(this.width == 80 && this.height == 80 && numNodes == 240 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/80x80medium/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } 

        else if(this.width == 80 && this.height == 80 && numNodes == 500000 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/80x80hard/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }
        
        else if(this.width == 80 && this.height == 80 && numNodes == 500000 && this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/80x80extreme/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }
        
        
        else if(this.width == 25 && this.height == 25 && this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/25x25extreme/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } else if(this.width == 15 && this.height == 15 && numNodes == 500000 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/15x15hard/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } else if(this.width == 100 && this.height == 100 && numNodes == 500000 && !this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/100x100hard/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } else if(this.width == 100 && this.height == 100 && this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/100x100extreme/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } else if(this.width==15 && this.height == 15 && this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/15x15extreme/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } else if(this.width==40 && this.height == 40 && this.extreme && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/40x40extreme/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        } else if(this.width==25 && this.height==25 && !this.extreme && numNodes == 500000 && this.name != "") {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                seed: this.board.initialSeed
            };
            this.http.put('https://woohoojinbridges.firebaseio.com/25x25hard/'+this.userDetails.uid+'.json', m)
                .subscribe((data) => {
                this.router.navigate(['leaderboards']);
            });
        }} else {
            if(this.daily && this.name != "" && this.width==25 && this.height==25 && numNodes == 500000) {
                let m = {
                    name: this.name,
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds,
                    millis: this.millis,
                    seed: this.board.initialSeed
                };
                this.http.put('https://woohoojinbridges.firebaseio.com/dailyScores/'+this.userDetails.uid+'.json', m)
                    .subscribe((data) => {
                    this.router.navigate(['leaderboards']);
                });
            } else if(this.daily && this.name != "" && this.width==10 && this.height == 10 && numNodes == 30) {
                //easy

                let m = {
                    name: this.name,
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds,
                    millis: this.millis,
                    seed: this.board.initialSeed
                };
                this.http.put('https://woohoojinbridges.firebaseio.com/dailyScoresEasy/'+this.userDetails.uid+'.json', m)
                    .subscribe((data) => {
                    this.router.navigate(['leaderboards']);
                });
            } else if(this.daily && this.name != "" && this.width==15 && this.height == 15 && numNodes == 500000) {
                //medium

                let m = {
                    name: this.name,
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds,
                    millis: this.millis,
                    seed: this.board.initialSeed
                };
                this.http.put('https://woohoojinbridges.firebaseio.com/dailyScoresMedium/'+this.userDetails.uid+'.json', m)
                    .subscribe((data) => {
                    this.router.navigate(['leaderboards']);
                });
            } else if(this.daily && this.name != "" && this.width==40 && this.height==40 && numNodes == 500000 && this.extreme) {

                let m = {
                    name: this.name,
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds,
                    millis: this.millis,
                    seed: this.board.initialSeed
                };
                this.http.put('https://woohoojinbridges.firebaseio.com/dailyScoresExtreme/'+this.userDetails.uid+'.json', m)
                    .subscribe((data) => {
                    this.router.navigate(['leaderboards']);
                });
            }
        }
    }

    keyPressed(event, __this) {
        if(!this.pause) {
            if(!this.solved) {
                if(event.code == "ShiftLeft") {
                    __this.shift = true;
                }

                if(event.key == "w") {
                    var pointX = Math.round(((this.mouseX - 225))/this.factor);
                    var pointY = Math.round(((this.mouseY - 0))/this.factor);
                    
                    if(this.isCircleHere(pointX, pointY)) {
                        this.coloredNode = this.getCircleHere(pointX, pointY);
                        this.bridgeUp();
                        this.done();
                        this.draw();
                        this.coloredNode = undefined;
                    }
                } else if(event.key == "W") {
                    var pointX = Math.round(((this.mouseX - 225))/this.factor);
                    var pointY = Math.round(((this.mouseY - 0))/this.factor);
                    
                    if(this.isCircleHere(pointX, pointY)) {
                        this.coloredNode = this.getCircleHere(pointX, pointY);
                        this.specialBridgeUp();
                        this.done();
                        this.draw();
                        this.coloredNode = undefined;
                    }
                } else if(event.key == "s") {
                    var pointX = Math.round(((this.mouseX - 225))/this.factor);
                    var pointY = Math.round(((this.mouseY - 0))/this.factor);
                    
                    if(this.isCircleHere(pointX, pointY)) {
                        this.coloredNode = this.getCircleHere(pointX, pointY);
                        this.bridgeDown();
                        this.done();
                        this.draw();
                        this.coloredNode = undefined;
                    }
                } else if(event.key == "S") {
                    var pointX = Math.round(((this.mouseX - 225))/this.factor);
                    var pointY = Math.round(((this.mouseY - 0))/this.factor);
                    
                    if(this.isCircleHere(pointX, pointY)) {
                        this.coloredNode = this.getCircleHere(pointX, pointY);
                        this.specialBridgeDown();
                        this.done();
                        this.draw();
                        this.coloredNode = undefined;
                    }
                } else if(event.key == "a") {
                    var pointX = Math.round(((this.mouseX - 225))/this.factor);
                    var pointY = Math.round(((this.mouseY - 0))/this.factor);
                    
                    if(this.isCircleHere(pointX, pointY)) {
                        this.coloredNode = this.getCircleHere(pointX, pointY);
                        this.bridgeLeft();
                        this.done();
                        this.draw();
                        this.coloredNode = undefined;
                    }
                } else if(event.key == "A") {
                    var pointX = Math.round(((this.mouseX - 225))/this.factor);
                    var pointY = Math.round(((this.mouseY - 0))/this.factor);
                    
                    if(this.isCircleHere(pointX, pointY)) {
                        this.coloredNode = this.getCircleHere(pointX, pointY);
                        this.specialBridgeLeft();
                        this.done();
                        this.draw();
                        this.coloredNode = undefined;
                    }
                } else if(event.key == "d") {
                    var pointX = Math.round(((this.mouseX - 225))/this.factor);
                    var pointY = Math.round(((this.mouseY - 0))/this.factor);
                    
                    if(this.isCircleHere(pointX, pointY)) {
                        this.coloredNode = this.getCircleHere(pointX, pointY);
                        this.bridgeRight();
                        this.done();
                        this.draw();
                        this.coloredNode = undefined;
                    }
                } else if(event.key == "D") {
                    var pointX = Math.round(((this.mouseX - 225))/this.factor);
                    var pointY = Math.round(((this.mouseY - 0))/this.factor);
                    
                    if(this.isCircleHere(pointX, pointY)) {
                        this.coloredNode = this.getCircleHere(pointX, pointY);
                        this.specialBridgeRight();
                        this.done();
                        this.draw();
                        this.coloredNode = undefined;
                    }
                } else if(event.key == "p" || event.key == "P" || event.key == "Escape") {
                    this.pauseGame();
                }
            }
        } else {
            if(event.key == "p" || event.key == "P" || event.key == "Escape") {
                this.pauseGame();
            }
        }
    }

    keyReleased(event, __this) {
        if(event.code == "ShiftLeft") {
            __this.shift = false;
        }
    }

    done() {
        for(let n of this.board.getNodes()) {
            var total = 0;
            for(let b of n.bridges) {
                total += b.num;
            }
            if(total != n.val) {
                return;
            }
        }

        this.solved = true;
        if(this.width == 40 && this.height == 40) {
        }
    }

    isLoggedIn() {
        if (this.userDetails == null ) {
            return false;
          } else {
            return true;
          }
        }

    clearBoard() {
        for(let n of this.board.getNodes()) {
            for(let b of n.getBridges()) {
                b.setNum(0);
            }
        }
        this.draw();
    }
    contextMenu() {return false;}
}