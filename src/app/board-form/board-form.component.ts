import { Component, OnInit } from '@angular/core';
import { Board } from '../board';
import { HttpClient } from '@angular/common/http';
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
    hotkeys: boolean;
    daily: any;
    canPlayDailyEasy: boolean;
    canPlayDailyMedium: boolean;
    canPlayDailyHard: boolean;
    canPlayDailyExtreme: boolean;

    dailyEasy: any;
    dailyMedium: any;
    dailyHard: any;
    dailyExtreme: any;

    changeTheme(theme) {
        this.model.theme = theme;
        if(theme == 'light') {
            document.documentElement.style.setProperty('--done-color', '#FFFEF9');      
            document.documentElement.style.setProperty('--grid-color', '#FFFEF9');      
            document.documentElement.style.setProperty('--background-color', '#E8D9BE');       
            document.documentElement.style.setProperty('--back-color', '#FFFEF9');
            document.documentElement.style.setProperty('--timer-color', '#FFFEF9');
            document.documentElement.style.setProperty('--newboard-color', '#FFFEF9');
            document.documentElement.style.setProperty('--btn-color', '#2C2C2C');
        } else if(theme == 'night' || 'colorblind') {
            document.documentElement.style.setProperty('--done-color', '#AAD46D');      
            document.documentElement.style.setProperty('--grid-color', '#A89984');      
            document.documentElement.style.setProperty('--background-color', '#2C2C2C');       
            document.documentElement.style.setProperty('--back-color', '#F24B3E');
            document.documentElement.style.setProperty('--timer-color', '#FFBA53');
            document.documentElement.style.setProperty('--newboard-color', '#4BB5AC');
            document.documentElement.style.setProperty('--btn-color', '#E8D9Be');
        }

        localStorage.setItem("theme", theme);
    }

    changeDifficulty(diff) {
        this.difficulty = diff;
    }

    startGauntlet() {
        this.model.width = 12;
        this.model.height = 15;
        this.model.numNodes = Math.floor(Math.sqrt(this.model.getWidth() * this.model.getHeight())) * 2;
        this.model.extreme = false;
        this.model.seed = 0;
        this.model.gauntlet = 1;
        this.router.navigate(['routedPage', this.model]);
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
            this.model.gauntlet = 0;
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

    canPlayDailyFunc() {
        this.canPlayDailyFuncEasy();
        this.canPlayDailyFuncMedium();
        this.canPlayDailyFuncHard();
        this.canPlayDailyFuncExtreme();
    }

    canPlayDailyFuncEasy() {
        if(this.daily && this.userDetails) {
            this.http.get('https://woohoojinbridges.firebaseio.com/dailyScoresEasy/'+this.userDetails.uid+'.json')
                .subscribe((data) => {
                    if(data == null) {
                        this.canPlayDailyEasy = true;
                        return true;
                    } else {
                        this.canPlayDailyEasy = false;
                        this.dailyEasy = this.convertToTimeString(data);
                        return false;
                    }
                });
        } else {

            this.canPlayDailyEasy = false;
            return false;
        }

        this.canPlayDailyEasy = true;
        return true;
    }

    convertToTimeString(data) {
        return (data.hours ? (data.hours > 9 ? data.hours : "0" + data.hours) : "00") + ":" + (data.minutes ? (data.minutes > 9 ? data.minutes : "0" + data.minutes) : "00") + ":" + (data.seconds > 9 ? data.seconds : "0" + data.seconds) + "." + (data.millis > 9 ? data.millis : "0" + data.millis);
    }

    canPlayDailyFuncMedium() {
        if(this.daily && this.userDetails) {
            this.http.get('https://woohoojinbridges.firebaseio.com/dailyScoresMedium/'+this.userDetails.uid+'.json')
                .subscribe((data) => {
                    if(data == null) {

                        this.canPlayDailyMedium = true;
                        return true;
                    } else {

                        this.canPlayDailyMedium = false;
                        this.dailyMedium = this.convertToTimeString(data);
                        return false;
                    }
                });
        } else {

            this.canPlayDailyMedium = false;
            return false;
        }

        this.canPlayDailyMedium = true;
        return true;
    }

    canPlayDailyFuncHard() {
        if(this.daily && this.userDetails) {
            this.http.get('https://woohoojinbridges.firebaseio.com/dailyScores/'+this.userDetails.uid+'.json')
                .subscribe((data) => {
                    if(data == null) {

                        this.canPlayDailyHard = true;
                        return true;
                    } else {

                        this.canPlayDailyHard = false;
                        this.dailyHard = this.convertToTimeString(data);
                        return false;
                    }
                });
        } else {

            this.canPlayDailyHard = false;
            return false;
        }

        this.canPlayDailyHard = true;
        return true;
    }

    canPlayDailyFuncExtreme() {
        if(this.daily && this.userDetails) {
            this.http.get('https://woohoojinbridges.firebaseio.com/dailyScoresExtreme/'+this.userDetails.uid+'.json')
                .subscribe((data) => {
                    if(data == null) {

                        this.canPlayDailyExtreme = true;
                        return true;
                    } else {

                        this.canPlayDailyExtreme = false;
                        this.dailyExtreme = this.convertToTimeString(data);
                        return false;
                    }
                });
        } else {

            this.canPlayDailyExtreme = false;
            return false;
        }

        this.canPlayDailyExtreme = true;
        return true;
    }

    playDaily(diff) {
        if(diff == 'hard') {
            this.model.width = this.daily.hardWidth;
            this.model.height = this.daily.hardHeight;
            this.difficulty = 'hard';
            this.model.dailyDiff = 'hard';
            this.model.daily = true;
            this.seed = this.daily.seed;
            this.onSubmit();
        }

        if(diff == 'easy') {
            this.model.width = this.daily.easyWidth;
            this.model.height = this.daily.easyHeight;
            this.difficulty = 'easy';
            this.model.daily = true;
            this.model.dailyDiff = 'easy';
            this.seed = this.daily.seed;
            this.onSubmit();
        }

        if(diff == 'medium') {
            this.model.width = this.daily.mediumWidth;
            this.model.height = this.daily.mediumHeight;
            this.difficulty = 'medium';
            this.model.dailyDiff = 'medium';
            this.model.daily = true;
            this.seed = this.daily.seed;
            this.onSubmit();
        }

        if(diff == 'extreme') {
            this.model.width = this.daily.extremeWidth;
            this.model.height = this.daily.extremeHeight;
            this.difficulty = 'extreme';
            this.model.dailyDiff = 'extreme';
            this.model.daily = true;
            this.seed = this.daily.seed;
            this.onSubmit();
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

    model = new Board(null , null, null, null, null, null, null, null, null, null, null, null);

    leaderboards()
    {
        this.router.navigate(['leaderboards']);
    }

    rules()
    {
        this.router.navigate(['rules']);
    }

    stats()
    {
        this.router.navigate(['stats']);
    }

    ngOnInit() {
        this.canPlayDailyEasy = true;
        this.canPlayDailyMedium = true;
        this.canPlayDailyHard = true;
        this.canPlayDailyExtreme = true;
        this.hotkeys = true;
        this.seed = 0;

        var theme = localStorage.getItem("theme");
        if(theme == 'night' || theme == 'light' || theme == 'colorblind') {
            this.changeTheme(theme);
        } else {
            localStorage.setItem("theme", 'night');
        }

        this.updateDailyAsNeeded();
    }

    updateDailyAsNeeded() {
        this.http.get('https://woohoojinbridges.firebaseio.com/daily.json')
            .subscribe((data: any) => {
                this.daily = data;
                this.canPlayDailyFunc();
            });
    }

    private randomIntReal(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    login() {

    }

    medley(size) {
        if(size == 7) {
            this.model.width = 7;
            this.model.height = 7;
            this.difficulty = 'easy';
            this.model.dailyDiff = "medley7";
            this.onSubmit();
        } else if(size == 10) {
            this.model.width = 10;
            this.model.height = 10;
            this.difficulty = 'medium';
            this.model.dailyDiff = "medley10";
            this.onSubmit();
        } else if(size == 15) {
            this.model.width = 15;
            this.model.height = 15;
            this.difficulty = 'hard';
            this.model.dailyDiff = "medley15";
            this.onSubmit();
        }
    }

    resetDailies() {
        this._firebaseAuth.auth.currentUser.getIdToken(true)
                .then((token) => {
                    this.http.delete('https://woohoojinbridges.firebaseio.com/dailyScoresExtreme.json?auth=' + token)
                        .subscribe((data) => {});
                    this.http.delete('https://woohoojinbridges.firebaseio.com/dailyScoresMedium.json?auth=' + token)
                        .subscribe((data) => {});
                    this.http.delete('https://woohoojinbridges.firebaseio.com/dailyScoresEasy.json?auth=' + token)
                        .subscribe((data) => {});
                    this.http.delete('https://woohoojinbridges.firebaseio.com/dailyScores.json?auth=' + token)
                        .subscribe((data) => {});

                    this.http.delete('https://woohoojinbridges.firebaseio.com/playingDailyeasy.json?auth=' + token)
                        .subscribe((data) => {});
                    this.http.delete('https://woohoojinbridges.firebaseio.com/playingDailymedium.json?auth=' + token)
                        .subscribe((data) => {});
                    this.http.delete('https://woohoojinbridges.firebaseio.com/playingDailyhard.json?auth=' + token)
                        .subscribe((data) => {});
                    this.http.delete('https://woohoojinbridges.firebaseio.com/playingDailyextreme.json?auth=' + token)
                        .subscribe((data) => {});
                    
                    let m = {
                        easyWidth: this.randomIntReal(7, 15),
                        easyHeight: this.randomIntReal(7, 15),
                        mediumWidth: this.randomIntReal(15, 25),
                        mediumHeight: this.randomIntReal(15, 25),
                        hardWidth: this.randomIntReal(25, 40),
                        hardHeight: this.randomIntReal(25, 40),
                        extremeWidth: this.randomIntReal(40, 80),
                        extremeHeight: this.randomIntReal(40, 80),
                        seed: this.randomIntReal(0, 2000000000)
                    }

                    this.http.put('https://woohoojinbridges.firebaseio.com/daily.json?auth=' + token, m)
                        .subscribe((data) => {});
                })
    }

    

  private user: Observable<firebase.User>;
  public userDetails: firebase.User = null;
    constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private http: HttpClient) { 
        this.canPlayDailyEasy = false;
        this.canPlayDailyMedium = false;
        this.canPlayDailyHard = false;
        this.canPlayDailyExtreme = false;
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
            this.canPlayDailyFunc();
          }
          else {
            this.userDetails = null;
            console.log("NOT LOGGED IN");
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

    getUid() {
        if(this.userDetails == null) {
            return '';
        } else {
            return this.userDetails.uid;
        }
    }

    getUser() {
        return this.userDetails;
    }
}
