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


    onSubmit() { 
        if(this.model.getWidth() < 7 || this.model.getHeight() < 7
        || this.model.getWidth() >100 || this.model.getHeight() > 100) {
            
        } else {
            this.router.navigate(['routedPage', this.model]);
        }
    }

    model = new Board(null , null, null);

    constructor(private router: Router) { }

    ngOnInit() {

    }

}
