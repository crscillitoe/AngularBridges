import { Component, OnInit } from '@angular/core';
import { Board } from '../board';

@Component({
    selector: 'app-board-form',
    templateUrl: './board-form.component.html',
    styleUrls: ['./board-form.component.css']
})

export class BoardFormComponent implements OnInit {

    submitted = false;
    onSubmit() { 
        if(this.model.getWidth() < 5) {
            console.log("NO"); 
        } else {
            this.submitted = true; 
            console.log(this.model);
        }
    }
    model = new Board(null , null);

    constructor() { }

    ngOnInit() {

    }

}
