import { Component, OnInit } from '@angular/core';
import { Board } from '../board';
import { Router } from '@angular/router';
import { BoardComponentComponent } from '../board-component/board-component.component';

@Component({
    selector: 'app-board-form',
    templateUrl: './board-form.component.html',
    styleUrls: ['./board-form.component.css']
})

export class BoardFormComponent implements OnInit {

    difficulty: string;


    onSubmit() { 
        if(this.model.getWidth() < 7 || this.model.getHeight() < 7
        || this.model.getWidth() > 100 || this.model.getHeight() > 100) {
            
        } else {
            if(this.difficulty == 'easy') {
                this.model.numNodes = Math.floor(Math.sqrt(this.model.getWidth() * this.model.getHeight())) * 2;
            } else if(this.difficulty == 'medium') {
                this.model.numNodes = Math.floor(Math.sqrt(this.model.getWidth() * this.model.getHeight())) * 3;
            } else if(this.difficulty == 'hard') {
                this.model.numNodes = 500000;
            }
            this.router.navigate(['routedPage', this.model]);
        }
    }

    onClick1(clicked: string) {
        if(clicked=='10x10') {
            this.model.width = 10;
            this.model.height = 10;
        } else if(clicked=='25x25') {
            this.model.width = 25;
            this.model.height = 25;
        } else if(clicked=='40x40') {
            this.model.width = 40;
            this.model.height = 40;
        } else if(clicked=='100x100') {
            this.model.width = 100;
            this.model.height = 100;
        } else {
            this.difficulty = clicked;
        }
    }

    model = new Board(null , null, null);

    constructor(private router: Router) { 
        this.difficulty = 'easy'; 
        this.model.width = 25;
        this.model.height = 25;
    }

    ngOnInit() {

    }
}
