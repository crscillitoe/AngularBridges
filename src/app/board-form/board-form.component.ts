import { Component, OnInit } from '@angular/core';
import { Board } from '../board';

@Component({
    selector: 'app-board-form',
    templateUrl: './board-form.component.html',
    styleUrls: ['./board-form.component.css']
})

export class BoardFormComponent implements OnInit {

    onSubmit() { 
        console.log(this.model);
    }

    model = new Board(null , null);

    constructor() { }

    ngOnInit() {

    }

}
