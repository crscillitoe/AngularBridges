import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit {
  public _40x40scoresHard: any;
  public _7x7scoresEasy: any;
  public _7x7scoresMedium: any;
  public _7x7scoresHard: any;
  public _7x7scoresExtreme: any;
  public _10x10scoresEasy: any;
  public _10x10scoresMedium: any;
  public _10x10scoresHard: any;
  public _10x10scoresExtreme: any;
  public _25x25scoresExtreme: any;
  public _15x15scoresHard: any;
  public _100x100scoresHard: any;
  public _100x100scoresExtreme: any;
  public _15x15scoresExtreme: any;
  public _25x25scoresHard: any;
  public _40x40scoresExtreme: any;
  public _15x15scoresEasy: any;
  public _15x15scoresMedium: any;
  public _25x25scoresEasy: any;
  public _25x25scoresMedium: any;
  public _40x40scoresEasy: any;
  public _40x40scoresMedium: any;
  public _100x100scoresEasy: any;
  public _100x100scoresMedium: any;
  public _80x80scoresEasy: any;
  public _80x80scoresMedium: any;
  public _80x80scoresHard: any;
  public _80x80scoresExtreme: any;
  public _60x60scoresEasy: any;
  public _60x60scoresMedium: any;
  public _60x60scoresHard: any;
  public _60x60scoresExtreme: any;
  public _dailyScores: any;
  public _dailyScoresMedium: any;
  public _dailyScoresEasy: any;
  public _dailyScoresExtreme: any;
  public _gauntletScores: any;
  public _medleyEasyScores: any;
  public _medleyMediumScores: any;
  public _medleyHardScores: any;

  public s: any;
  public scores: any;

  public difficulties: any = ['easy', 'medium', 'hard', 'extreme'];
  public sizes: any = ['7x7', '10x10', '15x15', '25x25', '40x40', '60x60', '100x100'];

  toUpper(s) {
    return s.charAt(0).toUpperCase() + s.substr(1);
  }

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { 
    }

  ngOnInit() {
      this.s = Number(this.route.snapshot.paramMap.get('page'));
      if(this.s == 0) {
          this.s = 1;
      }

      this.scores = [];

      if(this.s == 1) {
        this.loadBoards('7x7');
      } else if(this.s == 2) {
        this.loadBoards('10x10');
      } else if(this.s == 3) {
        this.loadBoards('15x15');
      } else if(this.s == 4) {
        this.loadBoards('25x25');
      } else if(this.s == 5) {
        this.loadBoards('40x40');
      } else if(this.s == 6) {
        this.loadBoards('60x60');
      } else if(this.s == 7) {
        this.loadBoards('100x100');
      } else if(this.s == 8) {
        this.loadBoards('daily');
      } else if(this.s == 9) {
        this.loadBoards('specials');
      }
  }

  load(b) {
    if(b < 8) {
        if(this.scores['' + this.sizes[b - 1] + 'easy'] == undefined) {
            this.loadBoards(this.sizes[b - 1]);
        }
    } else if(b == 8) {
        if(this.scores['dailyeasy'] == undefined) {
            this.loadBoards('daily');
        }
    } else if(b == 9) {
        if(this.scores['specialseasy'] == undefined) {
            this.loadBoards('specials');
        }
    }

    this.s = b;
  }

  loadBoards(size) {
    this.difficulties.forEach(d => {
        var requestString = '';

        if(size == 'daily') {
            var upper = this.toUpper(d);
            if(upper != 'Hard') {
                requestString = 'https://woohoojinbridges.firebaseio.com/dailyScores' + upper + '.json?orderBy="totalTime"&limitToFirst=10';
            } else {
                requestString = 'https://woohoojinbridges.firebaseio.com/dailyScores.json?orderBy="totalTime"&limitToFirst=10';
            }
        } else if(size == 'specials') {
            var specialName = '';
            if(d == 'easy') specialName = 'medley7';
            if(d == 'medium') specialName = 'medley10';
            if(d == 'hard') specialName = 'medley15';
            if(d == 'extreme') specialName = 'gauntlet';
            requestString = 'https://woohoojinbridges.firebaseio.com/' + specialName + '.json?orderBy="totalTime"&limitToFirst=10';
        } else {
            requestString = 'https://woohoojinbridges.firebaseio.com/' + size + d + '.json?orderBy="totalTime"&limitToFirst=10';
        }


      this.http.get(requestString)
      .subscribe((data) => {
        this.scores['' + size + d + ''] = [];

        for(const key of Object.keys(data)) {
          var temp = data[key];
            
          var hours =   Math.trunc(temp.totalTime / (60 * 60 * 100));
          var minutes = Math.trunc(temp.totalTime / (60 * 100)) % 60;
          var seconds = Math.trunc(temp.totalTime / 100) % 60;
          var millis = temp.totalTime % 100;

          (data[key])['time'] = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + "." + (millis > 9 ? millis : "0"+millis);
          (data[key])['key'] = key;
          this.scores['' + size + d + ''].push(data[key]);
        }

        this.scores['' + size + d + ''].sort(function(a, b) {
          var aTime = (360000*a.hours) + (6000*a.minutes) + (100*a.seconds) + (a.millis);
          var bTime = (360000*b.hours) + (6000*b.minutes) + (100*b.seconds) + (b.millis);
          if(aTime < bTime) return -1;
          if(aTime > bTime) return 1;
          return 0;
        });
      });
    });
  }

  mainMenu()
  {
      this.router.navigate(['mainMenu']);
  }

}
