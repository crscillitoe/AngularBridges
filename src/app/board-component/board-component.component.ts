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

    skip: boolean;
    timesPaused: number;
    worseTime: boolean;
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

    previousTotalMillis: number;
    previousTime: string;
    difficulty: string;

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
    numNodes: number;

    gauntlet: number;

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
        var numNodes = Number(this.route.snapshot.paramMap.get('numNodes'));
        if(numNodes === 0) {
            numNodes = Math.floor(Math.sqrt(this.width * this.height)) * 2;
        }
        this.seed = 0;

        this.generateFairBoard(numNodes);
        this.name = "";
        this.millis = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        if(this.solved) {
            this.solved = false;
            this.timer();
        }

        this.solved = false;
        this.draw();
    }

    generateFairBoard(numNodes) {
        var min = 0;
        var max = 0;
        if(this.width == 40 && this.height == 40 && numNodes == 500000 && !this.extreme) {
            //board = "40x40hard";
            min = 190;
            max = 220;
        } else if(this.width == 7 && this.height == 7 && numNodes == 14) {
            //board = "7x7easy";
            min = 7;
            max = 7;
        }  else if(this.width == 7 && this.height == 7 && numNodes == 21) {
            //board = "7x7medium";
            min = 7;
            max = 7;
        } else if(this.width == 15 && this.height == 15 && numNodes == 30) {
            //board = "15x15easy";
            min = 30;
            max = 30;
        } else if(this.width == 15 && this.height == 15 && numNodes == 45) {
            //board = "15x15medium";
            min = 32;
            max = 36;
        } else if(this.width == 25 && this.height == 25 && numNodes == 50) {
            //board = "25x25easy";
            min = 50;
            max = 50;
        } else if(this.width == 40 && this.height == 40 && numNodes == 80) {
            //board = "40x40easy";
            min = 80;
            max = 80;
        } else if(this.width == 40 && this.height == 40 && numNodes == 120) {
            //board = "40x40medium";
            min = 110;
            max = 130;
        } else if(this.width == 100 && this.height == 100 && numNodes == 200) {
            //board = "100x100easy";
        } else if(this.width == 100 && this.height == 100 && numNodes == 300) {
            //board = "100x100medium";
        } else if(this.width == 25 && this.height == 25 && numNodes == 75) {
            //board = "25x25medium";
            min = 68;
            max = 80;
        } else if(this.width == 7 && this.height == 7 && numNodes == 500000 && !this.extreme) {
            //board = "7x7hard";
        } else if(this.width == 7 && this.height == 7 && numNodes == 500000 && this.extreme) {
            //board = "7x7extreme";
            min = 8;
            max = 8;
        } else if(this.width == 10 && this.height == 10 && numNodes == 20 && !this.extreme) {
            //board = "10x10easy";
            min = 13;
            max = 15;
        } else if(this.width == 10 && this.height == 10 && numNodes == 30 && !this.extreme) {
            //board = "10x10medium";
            min = 15;
            max = 17;
        } else if(this.width == 10 && this.height == 10 && numNodes == 500000 && !this.extreme) {
            //board = "10x10hard";
        } else if(this.width == 10 && this.height == 10 && numNodes == 500000 && this.extreme) {
            //board = "10x10extreme";
            min = 19;
            max = 21;
        } else if(this.width == 60 && this.height == 60 && numNodes == 120 && !this.extreme) {
            //board = "60x60easy";
        } else if(this.width == 60 && this.height == 60 && numNodes == 180 && !this.extreme) {
            //board = "60x60medium";
        } else if(this.width == 60 && this.height == 60 && numNodes == 500000 && !this.extreme) {
            //board = "60x60hard";
        } else if(this.width == 60 && this.height == 60 && numNodes == 500000 && this.extreme) {
            //board = "60x60extreme";
        } else if(this.width == 25 && this.height == 25 && this.extreme) {
            //board = "25x25extreme";
        } else if(this.width == 15 && this.height == 15 && numNodes == 500000 && !this.extreme) {
            //board = "15x15hard";
            min = 38;
            max = 42;
        } else if(this.width == 100 && this.height == 100 && numNodes == 500000 && !this.extreme) {
            //board = "100x100hard";
        } else if(this.width == 100 && this.height == 100 && this.extreme) {
            //board = "100x100extreme";
        } else if(this.width==15 && this.height == 15 && this.extreme) {
            //board = "15x15extreme";
        } else if(this.width==40 && this.height == 40 && this.extreme) {
            //board = "40x40extreme";
        } else if(this.width==25 && this.height==25 && !this.extreme && numNodes == 500000) {
            //board = "25x25hard";
            min = 82;
            max = 94;
        }

        if(min != 0 && max != 0) {
            this.board = new Board(this.width, this.height, numNodes, this.extreme, 0, null, null, null, null, null, this.gauntlet);
            this.board.generateBoard();
            while(this.board.nodes.length < min || this.board.nodes.length > max) {
                this.board = new Board(this.width, this.height, numNodes, this.extreme, 0, null, null, null, null, null, this.gauntlet);
                this.board.generateBoard();
            }
        } else {
            this.board = new Board(this.width, this.height, numNodes, this.extreme, 0, null, null, null, null, null, this.gauntlet);
            this.board.generateBoard();
        }
    }

    // Initializes data
    ngOnInit() {
        this.skip = false;
        this.timesPaused = 0;
        this.worseTime = true;
        this.name = "";
        this.drawLetters = true;
        this.drawGridBool = true;
        this.drawTextColorBool = false;
        this.solved = false;
        this.width = Number(this.route.snapshot.paramMap.get('width'));
        this.height = Number(this.route.snapshot.paramMap.get('height'));
        this.extreme = "true" == this.route.snapshot.paramMap.get('extreme');
        this.daily = "true" == this.route.snapshot.paramMap.get('daily');


        if(this.daily) {
            // This is a daily, so we should indicate that we're playing.
            this.http.get('https://woohoojinbridges.firebaseio.com/playingDaily' + this.width + '/' + this.userDetails.uid + '.json')
                .subscribe((data) => {
                    if(data == null) {
                        var date: any = new Date()
                        let model = {
                            start: date.toUTCString()
                        }
                        this._firebaseAuth.auth.currentUser.getIdToken(true)
                            .then((token) => {
                                this.http.put('https://woohoojinbridges.firebaseio.com/playingDaily' + this.width + '/' + this.userDetails.uid + '.json?auth=' + token, model)
                                    .subscribe((data) => {});
                            })
                    } else {
                        this.daily = false;
                    }
                })
        }

        var numNodes = Number(this.route.snapshot.paramMap.get('numNodes'));
        this.drawLetters = this.route.snapshot.paramMap.get('numbers') == "true";
        this.drawGridBool = this.route.snapshot.paramMap.get('grid') == "true";
        this.gauntlet = Number(this.route.snapshot.paramMap.get('gauntlet'));
        
        var theme = this.route.snapshot.paramMap.get('theme');
        this.seed = Number(this.route.snapshot.paramMap.get('seed'));
        if(numNodes === 0) {
            numNodes = Math.floor(Math.sqrt(this.width * this.height)) * 2;
        }

        this.numNodes = numNodes;

        if(this.seed == 0) {
            this.generateFairBoard(numNodes);
        } else {
            this.board = new Board(this.width, this.height, numNodes, this.extreme, this.seed, null, null, null, null, null, this.gauntlet);
            this.board.generateBoard();
        }

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

        var board = "";
        if(this.width == 40 && this.height == 40 && numNodes == 500000 && !this.extreme) {
            board = "40x40hard";
            this.difficulty = "Hard";
        } else if(this.width == 7 && this.height == 7 && numNodes == 14) {
            board = "7x7easy";
            this.difficulty = "Easy";
        }  else if(this.width == 7 && this.height == 7 && numNodes == 21) {
            board = "7x7medium";
            this.difficulty = "Medium";
        } else if(this.width == 15 && this.height == 15 && numNodes == 30) {
            board = "15x15easy";
            this.difficulty = "Easy";
        } else if(this.width == 15 && this.height == 15 && numNodes == 45) {
            board = "15x15medium";
            this.difficulty = "Medium";
        } else if(this.width == 25 && this.height == 25 && numNodes == 50) {
            board = "25x25easy";
            this.difficulty = "Easy";
        } else if(this.width == 40 && this.height == 40 && numNodes == 80) {
            board = "40x40easy";
            this.difficulty = "Easy";
        } else if(this.width == 40 && this.height == 40 && numNodes == 120) {
            board = "40x40medium";
            this.difficulty = "Medium";
        } else if(this.width == 100 && this.height == 100 && numNodes == 200) {
            board = "100x100easy";
            this.difficulty = "Easy";
        } else if(this.width == 100 && this.height == 100 && numNodes == 300) {
            board = "100x100medium";
            this.difficulty = "Medium";
        } else if(this.width == 25 && this.height == 25 && numNodes == 75) {
            board = "25x25medium";
            this.difficulty = "Medium";
        } else if(this.width == 7 && this.height == 7 && numNodes == 500000 && !this.extreme) {
            board = "7x7hard";
            this.difficulty = "Hard";
        } else if(this.width == 7 && this.height == 7 && numNodes == 500000 && this.extreme) {
            board = "7x7extreme";
            this.difficulty = "Extreme";
        } else if(this.width == 10 && this.height == 10 && numNodes == 20 && !this.extreme) {
            board = "10x10easy";
            this.difficulty = "Easy";
        } else if(this.width == 10 && this.height == 10 && numNodes == 30 && !this.extreme) {
            board = "10x10medium";
            this.difficulty = "Medium";
        } else if(this.width == 10 && this.height == 10 && numNodes == 500000 && !this.extreme) {
            board = "10x10hard";
            this.difficulty = "Hard";
        } else if(this.width == 10 && this.height == 10 && numNodes == 500000 && this.extreme) {
            board = "10x10extreme";
            this.difficulty = "Extreme";
        } else if(this.width == 60 && this.height == 60 && numNodes == 120 && !this.extreme) {
            board = "60x60easy";
            this.difficulty = "Easy";
        } else if(this.width == 60 && this.height == 60 && numNodes == 180 && !this.extreme) {
            board = "60x60medium";
            this.difficulty = "Medium";
        } else if(this.width == 60 && this.height == 60 && numNodes == 500000 && !this.extreme) {
            board = "60x60hard";
            this.difficulty = "Hard";
        } else if(this.width == 60 && this.height == 60 && numNodes == 500000 && this.extreme) {
            board = "60x60extreme";
            this.difficulty = "Extreme";
        } else if(this.width == 25 && this.height == 25 && this.extreme) {
            board = "25x25extreme";
            this.difficulty = "Extreme";
        } else if(this.width == 15 && this.height == 15 && numNodes == 500000 && !this.extreme) {
            board = "15x15hard";
            this.difficulty = "Hard";
        } else if(this.width == 100 && this.height == 100 && numNodes == 500000 && !this.extreme) {
            board = "100x100hard";
            this.difficulty = "Hard";
        } else if(this.width == 100 && this.height == 100 && this.extreme) {
            board = "100x100extreme";
            this.difficulty = "Extreme";
        } else if(this.width==15 && this.height == 15 && this.extreme) {
            board = "15x15extreme";
            this.difficulty = "Extreme";
        } else if(this.width==40 && this.height == 40 && this.extreme) {
            board = "40x40extreme";
            this.difficulty = "Extreme";
        } else if(this.width==25 && this.height==25 && !this.extreme && numNodes == 500000) {
            board = "25x25hard";
            this.difficulty = "Hard";
        }

        if(this.gauntlet == 0) {
            try {
                this.http.get('https://woohoojinbridges.firebaseio.com/' + board + '/' + this.userDetails.uid + '.json')
                    .subscribe((data: any) => {
                        if(data != null) {
                            this.previousTotalMillis = data.totalTime;
                            this.previousTime = (data.hours ? (data.hours > 9 ? data.hours : "0" + data.hours) : "00") + ":" + (data.minutes ? (data.minutes > 9 ? data.minutes : "0" + data.minutes) : "00") + ":" + (data.seconds > 9 ? data.seconds : "0" + data.seconds) + "." + (data.millis > 9 ? data.millis : "0" + data.millis);
                        } else {

                        }
                    });
            } catch {
            }
        } else {
            try {
                this.http.get('https://woohoojinbridges.firebaseio.com/gauntlet/' + this.userDetails.uid + '.json')
                    .subscribe((data: any) => {
                        if(data != null) {
                            this.previousTotalMillis = data.totalTime;
                            this.previousTime = (data.hours ? (data.hours > 9 ? data.hours : "0" + data.hours) : "00") + ":" + (data.minutes ? (data.minutes > 9 ? data.minutes : "0" + data.minutes) : "00") + ":" + (data.seconds > 9 ? data.seconds : "0" + data.seconds) + "." + (data.millis > 9 ? data.millis : "0" + data.millis);
                        } else {

                        }
                    });
            } catch {
            }
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
        if(this.getUid() != '4UF1vLpR0eVL3Lor900jvE716mM2' && this.gauntlet == 0) {
            this.pause = !this.pause;
            if(this.pause == true) {
                this.timesPaused++;
                this.drawBackground();
            } else { 
                this.draw();
            }
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

    veryBigBoard() {
        this.context.beginPath();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = 8000;
        this.canvas.height = 8000;
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

    getBridgeArray() {
        var toReturn = [];
        for(let node of this.board.getNodes()) {
            for(let bridge of node.getBridges()) {
                if(bridge.getNum() > 0) toReturn.push(bridge);
            }
        }
        return toReturn;
    }

    isCrossing(startX, startY, direction) {
        if(direction == 'u') {
            while(true) {
                if(this.isBridgeHere(startX, startY, 'h')) return true;
                if(this.isCircleHere(startX, startY)) return false;
                if(startY <= 0) return true;

                startY--;
            }
        } else if(direction == 'd') {
            while(true) {
                if(this.isBridgeHere(startX, startY, 'h')) return true;
                if(this.isCircleHere(startX, startY)) return false;
                if(startY >= this.height) return true;

                startY++;
            }
        } else if(direction == 'r') {
            while(true) {
                if(this.isBridgeHere(startX, startY, 'v')) return true;
                if(this.isCircleHere(startX, startY)) return false;
                if(startX >= this.width) return true;

                startX++;
            }
        } else if(direction == 'l') {
            while(true) {
                if(this.isBridgeHere(startX, startY, 'v')) return true;
                if(this.isCircleHere(startX, startY)) return false;
                if(startX <= 0) return true;

                startX--;
            }
        }
    }

    isBridgeHere(x, y, direction) {
        var bridges = this.getBridgeArray();
        if(direction == 'v') {
            bridges = bridges.filter(b => b.n1.x == b.n2.x && b.n1.x == x && ((b.n1.y > y && b.n2.y < y) || (b.n1.y < y && b.n2.y > y)));
        } else if(direction == 'h') {
            bridges = bridges.filter(b => b.n1.y == b.n2.y && b.n1.y == y && ((b.n1.x > x && b.n2.x < x) || (b.n1.x < x && b.n2.x > x)));
        }

        return bridges.length > 0;
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

        if(this.isCrossing(this.coloredNode.getX() , this.coloredNode.getY() - 1, 'u')) {
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
                            this.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            this.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(bridge.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    this.addConstructedBridges(1);
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
        if(this.isCrossing(this.coloredNode.getX() , this.coloredNode.getY() - 1, 'u')) {
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
                            this.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            this.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    this.addConstructedBridges(2);
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, 2);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    } 

    numBridgeUp(num) {
        var counter;
        if(this.isCircleHere(this.coloredNode.getX() , this.coloredNode.getY() - 1)) {
            return;
        }
        if(this.isCrossing(this.coloredNode.getX() , this.coloredNode.getY() - 1, 'u')) {
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
                        if(bridge.getNum() != num) {
                            this.addConstructedBridges(2 - bridge.getNum());
                        }
                        bridge.setNum(num);
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    this.addConstructedBridges(num);
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, num);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    } 

    numBridgeDown(num) {
        var counter;
        if(this.isCircleHere(this.coloredNode.getX() , this.coloredNode.getY() + 1)) {
            return;
        }
        if(this.isCrossing(this.coloredNode.getX() , this.coloredNode.getY() + 1, 'd')) {
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
                        if(bridge.getNum() != num) {
                            this.addConstructedBridges(2 - bridge.getNum());
                        }
                        bridge.setNum(num);
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    this.addConstructedBridges(num);
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, num);
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
        if(this.isCrossing(this.coloredNode.getX() , this.coloredNode.getY() + 1, 'd')) {
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
                            this.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            this.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    this.addConstructedBridges(2);
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
        if(this.isCrossing(this.coloredNode.getX() , this.coloredNode.getY() + 1, 'd')) {
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
                            this.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            this.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(bridge.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    this.addConstructedBridges(1);
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
        if(this.isCrossing(this.coloredNode.getX() - 1, this.coloredNode.getY(), 'l')) {
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
                            this.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            this.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    this.addConstructedBridges(2);
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, 2);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    addConstructedBridges(num) {
        var previousValue = parseInt(localStorage.getItem("build"));
        if("" + previousValue == "NaN") {
            localStorage.setItem("build", "" + num);
        } else {
            localStorage.setItem("build", "" + (previousValue + num));
        }
    } 

    addDestroyedBridges(num) {
        var previousValue = parseInt(localStorage.getItem("destroy"));
        if("" + previousValue == "NaN") {
            localStorage.setItem("destroy", "" + num);
        } else {
            localStorage.setItem("destroy", "" + (previousValue + num));
        }
    } 

    numBridgeLeft(num) {
        var counter;
        if(this.isCircleHere(this.coloredNode.getX() - 1, this.coloredNode.getY())) {
            return;
        }
        if(this.isCrossing(this.coloredNode.getX() - 1, this.coloredNode.getY(), 'l')) {
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
                        if(bridge.getNum() != num) {
                            this.addConstructedBridges(2 - bridge.getNum());
                        }
                        bridge.setNum(num);
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    this.addConstructedBridges(num);
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, num);
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
        if(this.isCrossing(this.coloredNode.getX() - 1, this.coloredNode.getY(), 'l')) {
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
                            this.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            this.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(bridge.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    this.addConstructedBridges(1);
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, 1);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }

                return;
            }
        }
    }

    numBridgeRight(num) {
        var counter;
        if(this.isCircleHere(this.coloredNode.getX() + 1, this.coloredNode.getY())) {
            return;
        }
        if(this.isCrossing(this.coloredNode.getX() + 1, this.coloredNode.getY(), 'r')) {
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
                        if(bridge.getNum() != num) {
                            this.addConstructedBridges(2 - bridge.getNum());
                        }
                        bridge.setNum(num);
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    this.addConstructedBridges(num);
                    var bridge = new Bridge(this.coloredNode, toBridgeTo, num);
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
        if(this.isCrossing(this.coloredNode.getX() + 1, this.coloredNode.getY(), 'r')) {
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
                            this.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            this.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    this.addConstructedBridges(2);
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
        if(this.isCrossing(this.coloredNode.getX() + 1, this.coloredNode.getY(), 'r')) {
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
                            this.addDestroyedBridges(2);
                            bridge.setNum(0);
                        } else {
                            this.addConstructedBridges(2 - bridge.getNum());
                            bridge.setNum(bridge.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }

                if(!bridgeExists) {
                    this.addConstructedBridges(1);
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
                if(button == 2) {
                    this.numBridgeUp(2);
                    this.numBridgeDown(2);
                    this.numBridgeRight(2);
                    this.numBridgeLeft(2);
                } else {
                    this.numBridgeUp(1);
                    this.numBridgeDown(1);
                    this.numBridgeRight(1);
                    this.numBridgeLeft(1);
                }
                this.coloredNode = undefined;
                this.done();
                this.draw();
            }
        }
    }

    submit() {
        var numNodes = Number(this.route.snapshot.paramMap.get('numNodes'));
        if(!this.daily && this.gauntlet == 0) {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                totalTime: this.millis + (this.seconds * 100) + (this.minutes * 60 * 100) + (this.hours * 60 * 60 * 100),
                seed: this.board.initialSeed,
                pauses: this.timesPaused
            };
            var board = "";
            if(this.width == 40 && this.height == 40 && numNodes == 500000 && !this.extreme && this.name != "") {
                board = "40x40hard";
            } else if(this.width == 7 && this.height == 7 && numNodes == 14 && this.name != "") {
                board = "7x7easy";
            }  else if(this.width == 7 && this.height == 7 && numNodes == 21 && this.name != "") {
                board = "7x7medium";
            } else if(this.width == 15 && this.height == 15 && numNodes == 30 && this.name != "") {
                board = "15x15easy";
            } else if(this.width == 15 && this.height == 15 && numNodes == 45 && this.name != "") {
                board = "15x15medium";
            } else if(this.width == 25 && this.height == 25 && numNodes == 50 && this.name != "") {
                board = "25x25easy";
            } else if(this.width == 40 && this.height == 40 && numNodes == 80 && this.name != "") {
                board = "40x40easy";
            } else if(this.width == 40 && this.height == 40 && numNodes == 120 && this.name != "") {
                board = "40x40medium";
            } else if(this.width == 100 && this.height == 100 && numNodes == 200 && this.name != "") {
                board = "100x100easy";
            } else if(this.width == 100 && this.height == 100 && numNodes == 300 && this.name != "") {
                board = "100x100medium";
            } else if(this.width == 25 && this.height == 25 && numNodes == 75 && this.name != "") {
                board = "25x25medium";
            } else if(this.width == 7 && this.height == 7 && numNodes == 500000 && !this.extreme && this.name != "") {
                board = "7x7hard";
            } else if(this.width == 7 && this.height == 7 && numNodes == 500000 && this.extreme && this.name != "") {
                board = "7x7extreme";
            } else if(this.width == 10 && this.height == 10 && numNodes == 20 && !this.extreme && this.name != "") {
                board = "10x10easy";
            } else if(this.width == 10 && this.height == 10 && numNodes == 30 && !this.extreme && this.name != "") {
                board = "10x10medium";
            } else if(this.width == 10 && this.height == 10 && numNodes == 500000 && !this.extreme && this.name != "") {
                board = "10x10hard";
            } else if(this.width == 10 && this.height == 10 && numNodes == 500000 && this.extreme && this.name != "") {
                board = "10x10extreme";
            } else if(this.width == 60 && this.height == 60 && numNodes == 120 && !this.extreme && this.name != "") {
                board = "60x60easy";
            } else if(this.width == 60 && this.height == 60 && numNodes == 180 && !this.extreme && this.name != "") {
                board = "60x60medium";
            } else if(this.width == 60 && this.height == 60 && numNodes == 500000 && !this.extreme && this.name != "") {
                board = "60x60hard";
            } else if(this.width == 60 && this.height == 60 && numNodes == 500000 && this.extreme && this.name != "") {
                board = "60x60extreme";
            } else if(this.width == 25 && this.height == 25 && this.extreme && this.name != "") {
                board = "25x25extreme";
            } else if(this.width == 15 && this.height == 15 && numNodes == 500000 && !this.extreme && this.name != "") {
                board = "15x15hard";
            } else if(this.width == 100 && this.height == 100 && numNodes == 500000 && !this.extreme && this.name != "") {
                board = "100x100hard";
            } else if(this.width == 100 && this.height == 100 && this.extreme && this.name != "") {
                board = "100x100extreme";
            } else if(this.width==15 && this.height == 15 && this.extreme && this.name != "") {
                board = "15x15extreme";
            } else if(this.width==40 && this.height == 40 && this.extreme && this.name != "") {
                board = "40x40extreme";
            } else if(this.width==25 && this.height==25 && !this.extreme && numNodes == 500000 && this.name != "") {
                board = "25x25hard";
            }

            this._firebaseAuth.auth.currentUser.getIdToken(true)
                .then((token) => {
                    this.http.put('https://woohoojinbridges.firebaseio.com/' + board + '/'+this.userDetails.uid+'.json?auth=' + token, m)
                        .subscribe((data) => {

                        let n = board.split('x')[0];
                        let p = 0;
                        if(n == '7') {
                            p = 1;
                        } else if(n == '10') {
                            p = 2;
                        } else if(n == '15') {
                            p = 3;
                        } else if(n == '25') {
                            p = 4;
                        } else if(n == '40') {
                            p = 5;
                        } else if(n == '60') {
                            p = 6;
                        } else if(n == '100') {
                            p = 8;
                        }
                        let mod = {
                            page: p
                        }
                        this.router.navigate(['leaderboards', mod]);
                    });
                })
        } else if(this.daily && this.gauntlet == 0) {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                totalTime: this.millis + (this.seconds * 100) + (this.minutes * 60 * 100) + (this.hours * 60 * 60 * 100),
                seed: this.board.initialSeed,
                pauses: this.timesPaused
            };
            var board = "";

            if(this.daily && this.name != "" && this.width==25 && this.height==25 && numNodes == 500000) {
                board = "dailyScores";
            } else if(this.daily && this.name != "" && this.width==10 && this.height == 10 && numNodes == 30) {
                board = "dailyScoresEasy";
            } else if(this.daily && this.name != "" && this.width==15 && this.height == 15 && numNodes == 500000) {
                board = "dailyScoresMedium";
            } else if(this.daily && this.name != "" && this.width==40 && this.height==40 && numNodes == 500000 && this.extreme) {
                board = "dailyScoresExtreme";
            }

            this._firebaseAuth.auth.currentUser.getIdToken(true)
                .then((token) => {
                    this.http.put('https://woohoojinbridges.firebaseio.com/' + board + '/'+this.userDetails.uid+'.json?auth=' + token, m)
                        .subscribe((data) => {

                        let mod = {
                            page: 7
                        }
                        this.router.navigate(['leaderboards', mod]);
                    });
                })
        } else if(this.gauntlet > 0) {
            let m = {
                name: this.name,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
                millis: this.millis,
                totalTime: this.millis + (this.seconds * 100) + (this.minutes * 60 * 100) + (this.hours * 60 * 60 * 100),
                seed: this.board.initialSeed,
                pauses: this.timesPaused
            };
            this._firebaseAuth.auth.currentUser.getIdToken(true)
                .then((token) => {
                    this.http.put('https://woohoojinbridges.firebaseio.com/gauntlet/'+this.userDetails.uid+'.json?auth=' + token, m)
                        .subscribe((data) => {
                        let mod = {
                            page: 9
                        }
                        this.router.navigate(['leaderboards', mod]);
                    });
                })
        }
    }

    getUid() {
        if(this.userDetails == null) {
            return '';
        } else {
            return this.userDetails.uid;
        }
    }

    keyPressed(event, __this) {
        if(!this.pause) {
            if(!this.solved) {
                if(event.code == "ShiftLeft") {
                    __this.shift = true;
                }

                // Key tracking
                if(event.key == "w" || event.key == "W" || event.key == "s" || event.key == "S"
                || event.key == "d" || event.key == "D" || event.key == "a" || event.key == "A") {
                    var previousValue = parseInt(localStorage.getItem(event.key));
                    if("" + previousValue == "NaN") {
                        localStorage.setItem(event.key, "1");
                    } else {
                        localStorage.setItem(event.key, "" + (previousValue + 1));
                    }
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
        if(!this.skip) {
            for(let n of this.board.getNodes()) {
                var total = 0;
                for(let b of n.bridges) {
                    total += b.num;
                }
                if(total != n.val) {
                    return;
                }
            }
        }

        if(this.gauntlet == 0) {
            var previousValue = parseInt(localStorage.getItem("win"));
            if("" + previousValue == "NaN") {
                localStorage.setItem("win", "1");
            } else {
                localStorage.setItem("win", "" + (previousValue + 1));
            }

            for(let n of this.board.getNodes()) {
                var previousValue = parseInt(localStorage.getItem("" + n.val));
                if("" + previousValue == "NaN") {
                    localStorage.setItem("" + n.val, "1");
                } else {
                    localStorage.setItem("" + n.val, "" + (previousValue + 1));
                }
            }

            this.solved = true;
            if((this.millis + (this.seconds * 100) + (this.minutes * 60 * 100) + (this.hours * 60 * 60 * 100)) >= this.previousTotalMillis) {
                this.worseTime = true;
            } else { 
                this.worseTime = false;
            }
        } else {
            if(this.gauntlet < 20) {

                var previousValue = parseInt(localStorage.getItem("win"));
                if("" + previousValue == "NaN") {
                    localStorage.setItem("win", "1");
                } else {
                    localStorage.setItem("win", "" + (previousValue + 1));
                }

                for(let n of this.board.getNodes()) {
                    var previousValue = parseInt(localStorage.getItem("" + n.val));
                    if("" + previousValue == "NaN") {
                        localStorage.setItem("" + n.val, "1");
                    } else {
                        localStorage.setItem("" + n.val, "" + (previousValue + 1));
                    }
                }

                this.gauntlet++;
                if(this.gauntlet == 2) {
                    this.width = 13;
                    this.height = 21;
                    this.numNodes = 30;
                    this.extreme = false;
                } else if(this.gauntlet == 3) {
                    this.width = 15;
                    this.height = 24;
                    this.numNodes = 50;
                    this.extreme = false;
                } else if(this.gauntlet == 4) {
                    this.width = 40;
                    this.height = 15;
                    this.numNodes = 500000;
                    this.extreme = true;
                } else if(this.gauntlet == 5) {
                    this.width = 32;
                    this.height = 40;
                    this.numNodes = 5000;
                    this.extreme = false;
                } else if(this.gauntlet == 6) {
                    this.width = 40;
                    this.height = 32;
                    this.numNodes = 5000;
                    this.extreme = false;
                } else if(this.gauntlet == 7) {
                    this.width = 200;
                    this.height = 32;
                    this.numNodes = 500000;
                    this.extreme = true;
                } else if(this.gauntlet == 8) {
                    this.width = 100;
                    this.height = 100;
                    this.numNodes = 200;
                    this.extreme = false;
                } else if(this.gauntlet == 9) {
                    this.width = 80;
                    this.height = 32;
                    this.numNodes = 50000;
                    this.extreme = false;
                } else if(this.gauntlet == 10) {
                    this.width = 7;
                    this.height = 7;
                    this.numNodes = 500000;
                    this.extreme = true;
                } else if(this.gauntlet == 11) {
                    this.width = 7;
                    this.height = 7;
                    this.numNodes = 500000;
                    this.extreme = true;
                } else if(this.gauntlet == 12) {
                    this.width = 7;
                    this.height = 7;
                    this.numNodes = 500000;
                    this.extreme = true;
                } else if(this.gauntlet == 13) {
                    this.width = 25;
                    this.height = 25;
                    this.numNodes = 500000;
                    this.extreme = true;
                } else if(this.gauntlet == 14) {
                    this.width = 50;
                    this.height = 25;
                    this.numNodes = 500000;
                    this.extreme = true;
                } else if(this.gauntlet == 15) {
                    this.width = 25;
                    this.height = 50;
                    this.numNodes = 500000;
                    this.extreme = true;
                } else if(this.gauntlet == 16) {
                    this.width = 50;
                    this.height = 50;
                    this.numNodes = 500000;
                    this.extreme = true;
                } else if(this.gauntlet == 17) {
                    this.width = 10;
                    this.height = 7;
                    this.numNodes = 500000;
                    this.extreme = true;
                } else if(this.gauntlet == 18) {
                    this.width = 13;
                    this.height = 400;
                    this.numNodes = 500000;
                    this.extreme =true;
                } else if(this.gauntlet == 19) {
                    this.width = 26;
                    this.height = 400;
                    this.numNodes = 500000;
                    this.extreme =true;
                } else if(this.gauntlet == 20) {
                    this.width = 102;
                    this.height = 102;
                    this.numNodes = 500000;
                    this.extreme = true;
                }


                this.generateFairBoard(this.numNodes);
                this.fixSizes();
            } else {
                var previousValue = parseInt(localStorage.getItem("win"));
                if("" + previousValue == "NaN") {
                    localStorage.setItem("win", "1");
                } else {
                    localStorage.setItem("win", "" + (previousValue + 1));
                }

                for(let n of this.board.getNodes()) {
                    var previousValue = parseInt(localStorage.getItem("" + n.val));
                    if("" + previousValue == "NaN") {
                        localStorage.setItem("" + n.val, "1");
                    } else {
                        localStorage.setItem("" + n.val, "" + (previousValue + 1));
                    }
                }
                if((this.millis + (this.seconds * 100) + (this.minutes * 60 * 100) + (this.hours * 60 * 60 * 100)) >= this.previousTotalMillis) {
                    this.worseTime = true;
                } else { 
                    this.worseTime = false;
                }
                this.solved = true;
            }
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
