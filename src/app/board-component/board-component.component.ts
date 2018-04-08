import { Component, OnInit } from '@angular/core';
import { Board, MyNode, Bridge } from '../board';
import { ActivatedRoute } from '@angular/router';

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
    coloredNode: MyNode;
    board: Board;
    canvas: Two;

    constructor(private route: ActivatedRoute) { 
    }

    // Initializes data
    ngOnInit() {
        this.width = Number(this.route.snapshot.paramMap.get('width'));
        this.height = Number(this.route.snapshot.paramMap.get('height'));
        this.board = new Board(this.width, this.height);
        var tempCanvas = document.getElementById('myCanvas');
        this.canvas = new Two({
            type: Two.Types.canvas,
            fullscreen: true
        }).appendTo(tempCanvas);
        tempCanvas.addEventListener('mousedown', (e) => this.mousePressed(e), false);
        tempCanvas.addEventListener('mouseup', (e) => this.mouseReleased(e), false);

        this.edgeLength = Math.max(this.width, this.height);
        this.diameter = Math.min(this.canvas.width - (this.edgeLength * 10), this.canvas.height - (this.edgeLength * 10)) / (this.edgeLength + 1);
        this.xAdd = this.canvas.width/2 - ((this.width + 1) * (this.diameter + (this.diameter/5)))/2;
        this.yAdd = this.canvas.height/2 - ((this.height + 1) * (this.diameter + (this.diameter/5)))/2;

        this.draw();    
    }

    draw() {
        this.drawBackground();
        this.drawGrid();    
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
        }

        for(y = 1 ; y <= this.height ; y++) {
            var circleX = this.xAdd + (1 * (this.diameter + (this.diameter/5)));
            var circleY = this.yAdd + (y * (this.diameter + (this.diameter/5)));
            var circleX2 = this.xAdd + (this.width * (this.diameter + (this.diameter/5)));
            var tempLine = this.canvas.makeLine(circleX, circleY, circleX2, circleY);
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
        var tempCircle = this.canvas.makeCircle(circleX, circleY, this.diameter/2);
        tempCircle.fill = "#FFFFFF";

        var circleText = this.canvas.makeText("" + node.getVal(), circleX, circleY, null);
    }

    drawCircleRed(node: MyNode) {
        var circleX = this.xAdd + (node.getX() * (this.diameter + (this.diameter/5)));
        var circleY = this.yAdd + (node.getY() * (this.diameter + (this.diameter/5)));
        var tempCircle = this.canvas.makeCircle(circleX, circleY, this.diameter/2);
        tempCircle.fill = "#FF0000";

        var circleText = this.canvas.makeText("" + node.getVal(), circleX, circleY, null);
    }

    drawBackground() {
        var background = this.canvas.makeRectangle(0, 0, this.canvas.width * 2, this.canvas.height * 2);
        background.fill = '#EEE8D5';
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
                        } else {
                            var lineToDraw1 = this.canvas.makeLine(n1x, n1y - this.diameter/3, n2x, n2y - this.diameter/3);
                            var lineToDraw2 = this.canvas.makeLine(n1x, n1y + this.diameter/3, n2x, n2y + this.diameter/3);
                            lineToDraw1.linewidth = this.diameter/5;
                            lineToDraw2.linewidth = this.diameter/5;
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
}
