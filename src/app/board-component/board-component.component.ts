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

        this.drawGrid();    
    }

    drawGrid() {
        var background = this.canvas.makeRectangle(0, 0, this.canvas.width * 2, this.canvas.height * 2);
        background.fill = '#073642';
        this.canvas.update();
    }
}
