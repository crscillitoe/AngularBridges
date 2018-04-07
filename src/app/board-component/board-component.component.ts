import { Component, OnInit } from '@angular/core';
import { Board } from '../board';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-component',
  templateUrl: './board-component.component.html',
  styleUrls: ['./board-component.component.css']
})
export class BoardComponentComponent implements OnInit {

    width: number;
    height: number;
    board: Board;
    canvas: Two;

    constructor(private route: ActivatedRoute) { 
    }

    ngOnInit() {
        this.width = Number(this.route.snapshot.paramMap.get('width'));
        this.height = Number(this.route.snapshot.paramMap.get('height'));
        this.board = new Board(this.width, this.height);
        var tempCanvas = document.getElementById('myCanvas');
        this.canvas = new Two({
            type: Two.Types.canvas,
            fullscreen: true
        }).appendTo(tempCanvas);

        this.draw();    
    }

    draw() {
        this.drawBackground();
        this.drawGrid();    
        this.drawCircles();
        this.canvas.update();
    }

    drawGrid() {
        var edgeLength = Math.min(this.width, this.height);
        var diameter = Math.min(this.canvas.width - (edgeLength * 10), this.canvas.height - (edgeLength * 10)) / (edgeLength + 1);
        var xAdd = this.canvas.width/2 - ((this.width + 1) * (diameter + (diameter/5)))/2;
        var yAdd = this.canvas.height/2 - ((this.height + 1) * (diameter + (diameter/5)))/2;

    }

    drawCircles() {
        var edgeLength = Math.min(this.width, this.height);
        var diameter = Math.min(this.canvas.width - (edgeLength * 10), this.canvas.height - (edgeLength * 10)) / (edgeLength + 1);
        var xAdd = this.canvas.width/2 - ((this.width + 1) * (diameter + (diameter/5)))/2;
        var yAdd = this.canvas.height/2 - ((this.height + 1) * (diameter + (diameter/5)))/2;



        for(let node of this.board.getNodes()) {
            var circleX = xAdd + (node.getX() * (diameter + (diameter/5)));
            var circleY = yAdd + (node.getY() * (diameter + (diameter/5)));

            var tempCircle = this.canvas.makeCircle(circleX, circleY, diameter/2);
            tempCircle.fill = "#FFFFFF";
        }
    }

    drawBackground() {
        var background = this.canvas.makeRectangle(0, 0, this.canvas.width * 2, this.canvas.height * 2);
        background.fill = '#EEE8D5';
    }
}
