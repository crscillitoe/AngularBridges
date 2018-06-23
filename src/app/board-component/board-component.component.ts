import { Component, OnInit } from '@angular/core';
import { Board, MyNode, Bridge } from '../board';
import { ActivatedRoute } from '@angular/router';
//import { Two } from './two';

@Component({
  selector: 'app-board-component',
  templateUrl: './board-component.component.html',
  styleUrls: ['./board-component.component.css']
})
export class BoardComponentComponent implements OnInit {

    width: number;
    height: number;
    edgeLength: number;
    diameter: number;
    xAdd: number;
    yAdd: number;
    pressedX: number;
    pressedY: number;
    drawLetters: boolean;
    drawGridBool: boolean;
    drawTextColorBool: boolean;
    coloredNode: MyNode;
    board: Board;
    canvas: Two;

    circleColor: string[];
    circleTextColor: string;
    circleTextColors: string[];
    circleSelectedColor: string[];
    circleSelectedTextColor: string;
    backgroundColor: string;
    gridColor: string;
    bridgeColor: string;
    wrongCircleColor: string;

    constructor(private route: ActivatedRoute) { 
    }

    // Initializes data
    ngOnInit() {
        this.drawLetters = true;
        this.drawGridBool = true;
        this.drawTextColorBool = false;
        this.width = Number(this.route.snapshot.paramMap.get('width'));
        this.height = Number(this.route.snapshot.paramMap.get('height'));
        var numNodes = Number(this.route.snapshot.paramMap.get('numNodes'));
        if(numNodes === 0) {
            numNodes = Math.floor(Math.sqrt(this.width * this.height)) * 2;
        }
        this.board = new Board(this.width, this.height, numNodes);
        this.board.generateBoard();


        var tempCanvas = document.getElementById('myCanvas');
        if(this.width > 100 || this.height > 100) {
            this.canvas = new Two({
                type: Two.Types.canvas,
                width: 5000,
                height: 5000
            }).appendTo(tempCanvas);
        } else {
            this.canvas = new Two({
                type: Two.Types.canvas,
                fullscreen: true
            }).appendTo(tempCanvas);
        }
        tempCanvas.addEventListener('mousedown', (e) => this.mousePressed(e), false);
        tempCanvas.addEventListener('mouseup', (e) => this.mouseReleased(e), false);
        this.onResize(document.getElementsByTagName("canvas")[0], (e) => this.fixSizes());

        this.nightScheme();
        this.fixSizes();
    }

    nightScheme() {
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
            "#ff77ad",
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
    }

    fixSizes() {

        this.edgeLength = Math.max(this.width, this.height);


        if(this.edgeLength < 35) {
            this.diameter = Math.min(this.canvas.width - (this.edgeLength * 10), this.canvas.height - (this.edgeLength * 10)) / (this.edgeLength + 1);
        } else if(this.edgeLength <= 50) {
            this.diameter = Math.min(this.canvas.width - (this.edgeLength * 5), this.canvas.height - (this.edgeLength * 5)) / (this.edgeLength + 1);
        } else if(this.edgeLength <= 60) {
            this.diameter = Math.min(this.canvas.width - (this.edgeLength * 4), this.canvas.height - (this.edgeLength * 4)) / (this.edgeLength + 1);
        } else if(this.edgeLength <= 70) {
            this.diameter = Math.min(this.canvas.width - (this.edgeLength * 3), this.canvas.height - (this.edgeLength * 3)) / (this.edgeLength + 1);
        } else if(this.edgeLength <= 75) {
            this.diameter = Math.min(this.canvas.width - (this.edgeLength * 2.7), this.canvas.height - (this.edgeLength * 2.7)) / (this.edgeLength + 1);
        } else if(this.edgeLength <= 80) {
            this.diameter = Math.min(this.canvas.width - (this.edgeLength * 2.3), this.canvas.height - (this.edgeLength * 2.3)) / (this.edgeLength + 1);
        } else if(this.edgeLength <= 100) {
            this.diameter = Math.min(this.canvas.width - (this.edgeLength * 2), this.canvas.height - (this.edgeLength * 2)) / (this.edgeLength + 1);
        } else {
            this.diameter = 25;
        }


        this.xAdd = this.canvas.width/2 - ((this.width + 1) * (this.diameter + (this.diameter/5)))/2;
        this.yAdd = this.canvas.height/2 - ((this.height + 1) * (this.diameter + (this.diameter/5)))/2;


        this.draw();    
    }

    draw() {
        this.drawBackground();
        if(this.drawGridBool) {
            this.drawGrid();    
        }
        this.drawBridges();
        this.drawCircles();
        this.canvas.update();
    }

    drawGrid() {
        var x = 0;
        var y = 0;
        for(x = 1 ; x <= this.width ; x++) {
            var circleX = this.xAdd + (x * (this.diameter + (this.diameter/5)));
            var circleY = this.yAdd + (1 * (this.diameter + (this.diameter/5)));
            var circleY2 = this.yAdd + (this.height * (this.diameter + (this.diameter/5)));
            var tempLine = this.canvas.makeLine(circleX, circleY, circleX, circleY2);
            tempLine.stroke = this.gridColor;
        }

        for(y = 1 ; y <= this.height ; y++) {
            var circleX = this.xAdd + (1 * (this.diameter + (this.diameter/5)));
            var circleY = this.yAdd + (y * (this.diameter + (this.diameter/5)));
            var circleX2 = this.xAdd + (this.width * (this.diameter + (this.diameter/5)));
            var tempLine = this.canvas.makeLine(circleX, circleY, circleX2, circleY);
            tempLine.stroke = this.gridColor;
        }
    }

    drawCircles() {
        for(let node of this.board.getNodes()) {
            this.drawCircle(node);
        }
    }

    drawCircle(node: MyNode) {
        var circleX = this.xAdd + (node.getX() * (this.diameter + (this.diameter/5)));
        var circleY = this.yAdd + (node.getY() * (this.diameter + (this.diameter/5)));
        var tempCircle = this.canvas.makeCircle(circleX, circleY, this.diameter/1.5);

        var circleString = "" + node.getVal();

        if(node.getVal() - this.getNumBridges(node) >= 0) {
            tempCircle.fill = this.circleColor[node.getVal() - this.getNumBridges(node)];
            tempCircle.stroke = this.circleColor[node.getVal() - this.getNumBridges(node)];
        } else {
            tempCircle.fill = this.wrongCircleColor;
        }

        if(this.drawLetters) {
            var circleText = this.canvas.makeText(circleString, circleX, circleY + this.diameter/10, null);
            circleText.size = this.diameter * 1.5;
            if(this.drawTextColorBool) {
                circleText.fill = this.circleTextColors[node.getVal() - this.getNumBridges(node)];
                circleText.stroke = this.circleTextColors[node.getVal() - this.getNumBridges(node)];
            } else {
                circleText.fill = this.circleTextColor;
                circleText.stroke = this.circleTextColor;
            }
        }
    }

    toggleLetters() {
        this.drawLetters = !this.drawLetters;
        this.canvas.clear();
        this.draw();
    }

    toggleTextColor() {
        this.drawTextColorBool = !this.drawTextColorBool;
        this.canvas.clear();
        this.draw();
    }

    toggleGrid() {
        this.drawGridBool = !this.drawGridBool;
        this.canvas.clear();
        this.draw();
    }

    getNumBridges(node) {
        var toReturn = 0;
        for(let b of node.getBridges()) {
            toReturn += b.getNum();
        }
        return toReturn;
    }

    drawCircleRed(node: MyNode) {
        var circleX = this.xAdd + (node.getX() * (this.diameter + (this.diameter/5)));
        var circleY = this.yAdd + (node.getY() * (this.diameter + (this.diameter/5)));
        var tempCircle = this.canvas.makeCircle(circleX, circleY, this.diameter/1.5);

        var circleString = "" + node.getVal();

        if(node.getVal() - this.getNumBridges(node) >= 0) {
            tempCircle.fill = this.circleSelectedColor[node.getVal() - this.getNumBridges(node)];
        } else {
            tempCircle.fill = this.circleSelectedColor[0];
        }
        tempCircle.stroke = "#FFFFFF";

        if(this.drawLetters) {
            var circleText = this.canvas.makeText(circleString, circleX, circleY, null);
            circleText.size = this.diameter * 1.5;
            circleText.fill = this.circleTextColor;
        }
    }


    drawBackground() {
        var background = this.canvas.makeRectangle(0, 0, this.canvas.width * 2, this.canvas.height * 2);
        background.fill = this.backgroundColor;
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
        var x = mouseEventData.clientX;
        var y = mouseEventData.clientY;
        this.pressedX = x;
        this.pressedY = y;

        var pointX = Math.round((x - this.xAdd)/(this.diameter + (this.diameter/5)));
        var pointY = Math.round((y - this.yAdd)/(this.diameter + (this.diameter/5)));


        if(this.isCircleHere(pointX, pointY)) {
            this.coloredNode = this.getCircleHere(pointX, pointY);
            this.drawCircleRed(this.coloredNode);
            this.canvas.update();
        } else {
            this.coloredNode = undefined;
        }
    }

    drawBridges() {
        for(let node of this.board.getNodes()) {
            for(let bridge of node.getBridges()) {
                if(bridge.getNum() > 0) {
                    if(bridge.getNum() === 1) {
                        var n1x = this.xAdd + (bridge.getN1().getX() * (this.diameter + (this.diameter/5)));
                        var n1y = this.yAdd + (bridge.getN1().getY() * (this.diameter + (this.diameter/5)));
                        var n2x = this.xAdd + (bridge.getN2().getX() * (this.diameter + (this.diameter/5)));
                        var n2y = this.yAdd + (bridge.getN2().getY() * (this.diameter + (this.diameter/5)));
                        var lineToDraw = this.canvas.makeLine(n1x, n1y, n2x, n2y);
                        lineToDraw.linewidth = this.diameter/5;
                        lineToDraw.stroke = this.bridgeColor;
                    } else {
                        var n1x = this.xAdd + (bridge.getN1().getX() * (this.diameter + (this.diameter/5)));
                        var n1y = this.yAdd + (bridge.getN1().getY() * (this.diameter + (this.diameter/5)));
                        var n2x = this.xAdd + (bridge.getN2().getX() * (this.diameter + (this.diameter/5)));
                        var n2y = this.yAdd + (bridge.getN2().getY() * (this.diameter + (this.diameter/5)));
                        if(n1x === n2x) {
                            var lineToDraw1 = this.canvas.makeLine(n1x - this.diameter/3, n1y, n2x - this.diameter/3, n2y);
                            var lineToDraw2 = this.canvas.makeLine(n1x + this.diameter/3, n1y, n2x + this.diameter/3, n2y);
                            lineToDraw1.linewidth = this.diameter/5;
                            lineToDraw2.linewidth = this.diameter/5;
                            lineToDraw1.stroke = this.bridgeColor;
                            lineToDraw2.stroke = this.bridgeColor;
                        } else {
                            var lineToDraw1 = this.canvas.makeLine(n1x, n1y - this.diameter/3, n2x, n2y - this.diameter/3);
                            var lineToDraw2 = this.canvas.makeLine(n1x, n1y + this.diameter/3, n2x, n2y + this.diameter/3);
                            lineToDraw1.linewidth = this.diameter/5;
                            lineToDraw2.linewidth = this.diameter/5;
                            lineToDraw1.stroke = this.bridgeColor;
                            lineToDraw2.stroke = this.bridgeColor;
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
        var x = mouseEventData.clientX;
        var y = mouseEventData.clientY;



        if(this.coloredNode !== undefined) {
            if(Math.abs(this.pressedX - x) > Math.abs(this.pressedY - y)) {
                if(this.pressedX > x) {
                    this.bridgeLeft();
                    this.canvas.clear();
                    this.draw();
                } else {
                    this.bridgeRight();
                    this.canvas.clear();
                    this.draw();
                }
            } else {
                if(this.pressedY > y) {
                    this.bridgeUp();
                    this.canvas.clear();
                    this.draw();
                } else {
                    this.bridgeDown();
                    this.canvas.clear();
                    this.draw();
                }
            }
        }
    }

    onResize(element, callback) {
        var elementHeight = element.height;
        var elementWidth = element.width;
        setInterval(function() {
            if(element.height !== elementHeight || element.width !== elementWidth ) {
                elementHeight = element.height;
                elementWidth = element.width;
                callback();
            }
        }, 300);
    }

    clearBoard() {
        for(let n of this.board.getNodes()) {
            for(let b of n.getBridges()) {
                b.setNum(0);
            }
        }
        this.draw();
    }
}
