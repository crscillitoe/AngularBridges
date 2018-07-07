import { Component, OnInit } from '@angular/core';
import { Board } from '../board';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-board-form',
    templateUrl: './board-form.component.html',
    styleUrls: ['./board-form.component.css']
})

@Injectable()
export class BoardFormComponent implements OnInit {

    difficulty: string;
    seed: any;
    hotkeys:boolean;

    changeTheme(theme) {
        this.model.theme = theme;
    }

    changeDifficulty(diff) {
        this.difficulty = diff;
    }

    onSubmit() { 
        if(this.model.getWidth() < 7 || this.model.getHeight() < 7
        || this.model.getWidth() > 100 || this.model.getHeight() > 100) {
            
        } else {
            if(this.difficulty == 'easy') {
                this.model.numNodes = Math.floor(Math.sqrt(this.model.getWidth() * this.model.getHeight())) * 2;
                this.model.extreme = false;
            } else if(this.difficulty == 'medium') {
                this.model.numNodes = Math.floor(Math.sqrt(this.model.getWidth() * this.model.getHeight())) * 3;     
                this.model.extreme = false;
            } else if(this.difficulty == 'hard') {
                this.model.numNodes = 500000;  
                this.model.extreme = false;
            } else if(this.difficulty == 'extreme') {
                this.model.numNodes = 500000;
                this.model.extreme = true;
            }
            this.model.seed = this.seed;
            this.router.navigate(['routedPage', this.model]);
        }
    }

    changeNumbering(clicked) {
        this.model.numbers = clicked;
    }

    changeGrid(clicked) {
        this.model.grid = clicked;
    }

    onClick1(clicked) {
        if(clicked=='10x10') {
            this.model.width = 10;
            this.model.height = 10;
        } else if(clicked=='25x25') {
            this.model.width = 25;
            this.model.height = 25;
        } else if(clicked=='15x15') {
            this.model.width = 15;
            this.model.height = 15;
        } else if(clicked=='7x7') {
            this.model.width = 7;
            this.model.height = 7;
        } else if(clicked=='60x60') {
            this.model.width = 60;
            this.model.height = 60;
        } else if(clicked=='80x80') {
            this.model.width = 80;
            this.model.height = 80;
        } else if(clicked=='40x40') {
            this.model.width = 40;
            this.model.height = 40;
        } else if(clicked=='100x100') {
            this.model.width = 100;
            this.model.height = 100;
        }
    }

    quickLaunch(m) {
        if(m=='7x7easy') {
            this.model.width = 7;
            this.model.height = 7;
            this.difficulty = 'easy'
            this.onSubmit();
        } else if(m == '15x15easy') {
            this.model.width = 15;
            this.model.height = 15;
            this.difficulty = 'easy';
            this.onSubmit();
        } else if(m == '15x15medium') {
            this.model.width = 15;
            this.model.height = 15;
            this.difficulty = 'medium';
            this.onSubmit();
        } else if(m =='15x15hard') {
            this.model.width = 15;
            this.model.height = 15;
            this.difficulty = 'hard';
            this.onSubmit();
        } else if(m == '15x15extreme') {
            this.model.width = 15;
            this.model.height = 15;
            this.difficulty = 'extreme';
            this.onSubmit();
        }  else if(m == '25x25easy') {
            this.model.width = 25;
            this.model.height = 25;
            this.difficulty = 'easy';
            this.onSubmit();
        } else if(m == '25x25medium') {
            this.model.width = 25;
            this.model.height = 25;
            this.difficulty = 'medium';
            this.onSubmit();
        } else if(m =='25x25hard') {
            this.model.width = 25;
            this.model.height = 25;
            this.difficulty = 'hard';
            this.onSubmit();
        } else if(m == '25x25extreme') {
            this.model.width = 25;
            this.model.height = 25;
            this.difficulty = 'extreme';
            this.onSubmit();
        }  else if(m == '40x40easy') {
            this.model.width = 40;
            this.model.height = 40;
            this.difficulty = 'easy';
            this.onSubmit();
        } else if(m == '40x40medium') {
            this.model.width = 40;
            this.model.height = 40;
            this.difficulty = 'medium';
            this.onSubmit();
        } else if(m =='40x40hard') {
            this.model.width = 40;
            this.model.height = 40;
            this.difficulty = 'hard';
            this.onSubmit();
        } else if(m == '40x40extreme') {
            this.model.width = 40;
            this.model.height = 40;
            this.difficulty = 'extreme';
            this.onSubmit();
        }  else if(m == '10x10easy') {
            this.model.width = 10;
            this.model.height = 10;
            this.difficulty = 'easy';
            this.onSubmit();
        } else if(m == '10x10medium') {
            this.model.width = 10;
            this.model.height = 10;
            this.difficulty = 'medium';
            this.onSubmit();
        } else if(m =='10x10hard') {
            this.model.width = 10;
            this.model.height = 10;
            this.difficulty = 'hard';
            this.onSubmit();
        } else if(m == '10x10extreme') {
            this.model.width = 10;
            this.model.height = 10;
            this.difficulty = 'extreme';
            this.onSubmit();
        }  else if(m == '7x7easy') {
            this.model.width = 7;
            this.model.height = 7;
            this.difficulty = 'easy';
            this.onSubmit();
        } else if(m == '7x7medium') {
            this.model.width = 7;
            this.model.height = 7;
            this.difficulty = 'medium';
            this.onSubmit();
        } else if(m =='7x7hard') {
            this.model.width = 7;
            this.model.height = 7;
            this.difficulty = 'hard';
            this.onSubmit();
        } else if(m == '7x7extreme') {
            this.model.width = 7;
            this.model.height = 7;
            this.difficulty = 'extreme';
            this.onSubmit();
        }  else if(m == '100x100easy') {
            this.model.width = 100;
            this.model.height = 100;
            this.difficulty = 'easy';
            this.onSubmit();
        } else if(m == '100x100medium') {
            this.model.width = 100;
            this.model.height = 100;
            this.difficulty = 'medium';
            this.onSubmit();
        } else if(m =='100x100hard') {
            this.model.width = 100;
            this.model.height = 100;
            this.difficulty = 'hard';
            this.onSubmit();
        } else if(m == '100x100extreme') {
            this.model.width = 100;
            this.model.height = 100;
            this.difficulty = 'extreme';
            this.onSubmit();
        } else if(m == '60x60easy') {
            this.model.width = 60;
            this.model.height = 60;
            this.difficulty = 'easy';
            this.onSubmit();
        } else if(m == '60x60medium') {
            this.model.width = 60;
            this.model.height = 60;
            this.difficulty = 'medium';
            this.onSubmit();
        } else if(m =='60x60hard') {
            this.model.width = 60;
            this.model.height = 60;
            this.difficulty = 'hard';
            this.onSubmit();
        } else if(m == '60x60extreme') {
            this.model.width = 60;
            this.model.height = 60;
            this.difficulty = 'extreme';
            this.onSubmit();
        } else if(m == '80x80easy') {
            this.model.width = 80;
            this.model.height = 80;
            this.difficulty = 'easy';
            this.onSubmit();
        } else if(m == '80x80medium') {
            this.model.width = 80;
            this.model.height = 80;
            this.difficulty = 'medium';
            this.onSubmit();
        } else if(m =='80x80hard') {
            this.model.width = 80;
            this.model.height = 80;
            this.difficulty = 'hard';
            this.onSubmit();
        } else if(m == '80x80extreme') {
            this.model.width = 80;
            this.model.height = 80;
            this.difficulty = 'extreme';
            this.onSubmit();
        }
    }

    model = new Board(null , null, null, null, null, null, null, null, null);

    leaderboards()
    {
        this.router.navigate(['leaderboards']);
    }

    ngOnInit() {
        this.hotkeys = true;
        this.seed = 0;
    }

    login() {

    }

    

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
    constructor(private _firebaseAuth: AngularFireAuth, private router: Router) { 
    this.difficulty = 'medium'; 
    this.model.width = 25;
    this.model.height = 25;
    this.model.extreme = false;
    this.model.theme = 'night';
    this.model.hotkeys = true;
    this.model.grid = true;
    this.model.numbers = true;
      this.user = _firebaseAuth.authState;
        this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
          }
          else {
            this.userDetails = null;
          }
        }
      );
  }
signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }
isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }
  getUser() {
    return this.userDetails;
  }
}
