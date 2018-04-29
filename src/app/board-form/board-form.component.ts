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
        || this.model.getWidth() >80 || this.model.getHeight() > 80) {
            
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
        this.difficulty = clicked;
    }

    model = new Board(null , null, null);

    constructor(private router: Router) { 
        this.difficulty = 'easy'; 
    }

    ngOnInit() {

    }
}
