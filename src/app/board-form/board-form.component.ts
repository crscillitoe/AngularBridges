import { Component, OnInit } from '@angular/core';
import { Board } from '../board';
import { Router } from '@angular/router';

@Component({
    selector: 'app-board-form',
    templateUrl: './board-form.component.html',
    styleUrls: ['./board-form.component.css']
})

export class BoardFormComponent implements OnInit {


    onSubmit() { 
        console.log(this.model);
        this.router.navigate(['routedPage']);
    }

    model = new Board(null , null);

    constructor(private router: Router) { }

    ngOnInit() {

    }

}
