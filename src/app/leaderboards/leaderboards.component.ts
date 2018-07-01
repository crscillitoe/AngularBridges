import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit {
  public _40x40scoresHard: any;
  public _7x7scoresEasy: any;
  public _25x25scoresExtreme: any;
  public _15x15scoresHard: any;
  public _100x100scoresHard: any;
  public _100x100scoresExtreme: any;
  public _15x15scoresExtreme: any;
  public _25x25scoresHard: any;
  public _40x40scoresExtreme: any;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://woohoojinbridges.firebaseio.com/40x40hard.json?orderBy="$key"')
      .subscribe((data) => {
        this._40x40scoresHard = [];
        for(const key of Object.keys(data)) {
          var temp = data[key];
          (data[key])['time'] = (temp.hours ? (temp.hours > 9 ? temp.hours : "0" + temp.hours) : "00") + ":" + (temp.minutes ? (temp.minutes > 9 ? temp.minutes : "0" + temp.minutes) : "00") + ":" + (temp.seconds > 9 ? temp.seconds : "0" + temp.seconds) + "." + (temp.millis > 9 ? temp.millis : "0"+temp.millis);
          (data[key])['key'] = key;
          this._40x40scoresHard.push(data[key]);
        }
        this._40x40scoresHard.sort(function(a, b) {
          var aTime = (360000*a.hours) + (6000*a.minutes) + (100*a.seconds) + (a.millis);
          var bTime = (360000*b.hours) + (6000*b.minutes) + (100*b.seconds) + (b.millis);
          if(aTime < bTime) return -1;
          if(aTime > bTime) return 1;
          return 0;
        });
        var index = 10;
        for(index = 10; index < this._40x40scoresHard.length; index++) {
          this.http.delete('https://woohoojinbridges.firebaseio.com/40x40hard/'+this._40x40scoresHard[index].key+'.json')
            .subscribe((data) => {
            });
        }
        this._40x40scoresHard = this._40x40scoresHard.slice(0, 10);
        
      });

      this.http.get('https://woohoojinbridges.firebaseio.com/7x7easy.json?orderBy="$key"')
      .subscribe((data) => {
        this._7x7scoresEasy = [];
        for(const key of Object.keys(data)) {
          var temp = data[key];
          (data[key])['time'] = (temp.hours ? (temp.hours > 9 ? temp.hours : "0" + temp.hours) : "00") + ":" + (temp.minutes ? (temp.minutes > 9 ? temp.minutes : "0" + temp.minutes) : "00") + ":" + (temp.seconds > 9 ? temp.seconds : "0" + temp.seconds) + "." + (temp.millis > 9 ? temp.millis : "0"+temp.millis);
          (data[key])['key'] = key;
          this._7x7scoresEasy.push(data[key]);
        }
        this._7x7scoresEasy.sort(function(a, b) {
          var aTime = (360000*a.hours) + (6000*a.minutes) + (100*a.seconds) + (a.millis);
          var bTime = (360000*b.hours) + (6000*b.minutes) + (100*b.seconds) + (b.millis);
          if(aTime < bTime) return -1;
          if(aTime > bTime) return 1;
          return 0;
        });
        var index = 10;
        for(index = 10; index < this._7x7scoresEasy.length; index++) {
          this.http.delete('https://woohoojinbridges.firebaseio.com/7x7easy/'+this._7x7scoresEasy[index].key+'.json')
            .subscribe((data) => {
            });
        }
        this._7x7scoresEasy = this._7x7scoresEasy.slice(0, 10);
        
      });

      this.http.get('https://woohoojinbridges.firebaseio.com/25x25extreme.json?orderBy="$key"')
      .subscribe((data) => {
        this._25x25scoresExtreme = [];
        for(const key of Object.keys(data)) {
          var temp = data[key];
          (data[key])['time'] = (temp.hours ? (temp.hours > 9 ? temp.hours : "0" + temp.hours) : "00") + ":" + (temp.minutes ? (temp.minutes > 9 ? temp.minutes : "0" + temp.minutes) : "00") + ":" + (temp.seconds > 9 ? temp.seconds : "0" + temp.seconds) + "." + (temp.millis > 9 ? temp.millis : "0"+temp.millis);
          (data[key])['key'] = key;
          this._25x25scoresExtreme.push(data[key]);
        }
        this._25x25scoresExtreme.sort(function(a, b) {
          var aTime = (360000*a.hours) + (6000*a.minutes) + (100*a.seconds) + (a.millis);
          var bTime = (360000*b.hours) + (6000*b.minutes) + (100*b.seconds) + (b.millis);
          if(aTime < bTime) return -1;
          if(aTime > bTime) return 1;
          return 0;
        });
        var index = 10;
        for(index = 10; index < this._25x25scoresExtreme.length; index++) {
          this.http.delete('https://woohoojinbridges.firebaseio.com/25x25extreme/'+this._25x25scoresExtreme[index].key+'.json')
            .subscribe((data) => {
            });
        }
        this._25x25scoresExtreme = this._25x25scoresExtreme.slice(0, 10);
        
      });

      this.http.get('https://woohoojinbridges.firebaseio.com/15x15hard.json?orderBy="$key"')
      .subscribe((data) => {
        this._15x15scoresHard = [];
        for(const key of Object.keys(data)) {
          var temp = data[key];
          (data[key])['time'] = (temp.hours ? (temp.hours > 9 ? temp.hours : "0" + temp.hours) : "00") + ":" + (temp.minutes ? (temp.minutes > 9 ? temp.minutes : "0" + temp.minutes) : "00") + ":" + (temp.seconds > 9 ? temp.seconds : "0" + temp.seconds) + "." + (temp.millis > 9 ? temp.millis : "0"+temp.millis);
          (data[key])['key'] = key;
          this._15x15scoresHard.push(data[key]);
        }
        this._15x15scoresHard.sort(function(a, b) {
          var aTime = (360000*a.hours) + (6000*a.minutes) + (100*a.seconds) + (a.millis);
          var bTime = (360000*b.hours) + (6000*b.minutes) + (100*b.seconds) + (b.millis);
          if(aTime < bTime) return -1;
          if(aTime > bTime) return 1;
          return 0;
        });
        var index = 10;
        for(index = 10; index < this._15x15scoresHard.length; index++) {
          this.http.delete('https://woohoojinbridges.firebaseio.com/15x15hard/'+this._15x15scoresHard[index].key+'.json')
            .subscribe((data) => {
            });
        }
        this._15x15scoresHard = this._15x15scoresHard.slice(0, 10);
        
      });

      this.http.get('https://woohoojinbridges.firebaseio.com/100x100hard.json?orderBy="$key"')
      .subscribe((data) => {
        this._100x100scoresHard = [];
        for(const key of Object.keys(data)) {
          var temp = data[key];
          (data[key])['time'] = (temp.hours ? (temp.hours > 9 ? temp.hours : "0" + temp.hours) : "00") + ":" + (temp.minutes ? (temp.minutes > 9 ? temp.minutes : "0" + temp.minutes) : "00") + ":" + (temp.seconds > 9 ? temp.seconds : "0" + temp.seconds) + "." + (temp.millis > 9 ? temp.millis : "0"+temp.millis);
          (data[key])['key'] = key;
          this._100x100scoresHard.push(data[key]);
        }
        this._100x100scoresHard.sort(function(a, b) {
          var aTime = (360000*a.hours) + (6000*a.minutes) + (100*a.seconds) + (a.millis);
          var bTime = (360000*b.hours) + (6000*b.minutes) + (100*b.seconds) + (b.millis);
          if(aTime < bTime) return -1;
          if(aTime > bTime) return 1;
          return 0;
        });
        var index = 10;
        for(index = 10; index < this._100x100scoresHard.length; index++) {
          this.http.delete('https://woohoojinbridges.firebaseio.com/100x100hard/'+this._100x100scoresHard[index].key+'.json')
            .subscribe((data) => {
            });
        }
        this._100x100scoresHard = this._100x100scoresHard.slice(0, 10);
        
      });

      this.http.get('https://woohoojinbridges.firebaseio.com/100x100extreme.json?orderBy="$key"')
      .subscribe((data) => {
        this._100x100scoresExtreme = [];
        for(const key of Object.keys(data)) {
          var temp = data[key];
          (data[key])['time'] = (temp.hours ? (temp.hours > 9 ? temp.hours : "0" + temp.hours) : "00") + ":" + (temp.minutes ? (temp.minutes > 9 ? temp.minutes : "0" + temp.minutes) : "00") + ":" + (temp.seconds > 9 ? temp.seconds : "0" + temp.seconds) + "." + (temp.millis > 9 ? temp.millis : "0"+temp.millis);
          (data[key])['key'] = key;
          this._100x100scoresExtreme.push(data[key]);
        }
        this._100x100scoresExtreme.sort(function(a, b) {
          var aTime = (360000*a.hours) + (6000*a.minutes) + (100*a.seconds) + (a.millis);
          var bTime = (360000*b.hours) + (6000*b.minutes) + (100*b.seconds) + (b.millis);
          if(aTime < bTime) return -1;
          if(aTime > bTime) return 1;
          return 0;
        });
        var index = 10;
        for(index = 10; index < this._100x100scoresExtreme.length; index++) {
          this.http.delete('https://woohoojinbridges.firebaseio.com/100x100extreme/'+this._100x100scoresExtreme[index].key+'.json')
            .subscribe((data) => {
            });
        }
        this._100x100scoresExtreme = this._100x100scoresExtreme.slice(0, 10);
        
      });

      this.http.get('https://woohoojinbridges.firebaseio.com/15x15extreme.json?orderBy="$key"')
      .subscribe((data) => {
        this._15x15scoresExtreme = [];
        for(const key of Object.keys(data)) {
          var temp = data[key];
          (data[key])['time'] = (temp.hours ? (temp.hours > 9 ? temp.hours : "0" + temp.hours) : "00") + ":" + (temp.minutes ? (temp.minutes > 9 ? temp.minutes : "0" + temp.minutes) : "00") + ":" + (temp.seconds > 9 ? temp.seconds : "0" + temp.seconds) + "." + (temp.millis > 9 ? temp.millis : "0"+temp.millis);
          (data[key])['key'] = key;
          this._15x15scoresExtreme.push(data[key]);
        }
        this._15x15scoresExtreme.sort(function(a, b) {
          var aTime = (360000*a.hours) + (6000*a.minutes) + (100*a.seconds) + (a.millis);
          var bTime = (360000*b.hours) + (6000*b.minutes) + (100*b.seconds) + (b.millis);
          if(aTime < bTime) return -1;
          if(aTime > bTime) return 1;
          return 0;
        });
        var index = 10;
        for(index = 10; index < this._15x15scoresExtreme.length; index++) {
          this.http.delete('https://woohoojinbridges.firebaseio.com/15x15extreme/'+this._15x15scoresExtreme[index].key+'.json')
            .subscribe((data) => {
            });
        }
        this._15x15scoresExtreme = this._15x15scoresExtreme.slice(0, 10);
        
      });

      this.http.get('https://woohoojinbridges.firebaseio.com/25x25hard.json?orderBy="$key"')
      .subscribe((data) => {
        this._25x25scoresHard = [];
        for(const key of Object.keys(data)) {
          var temp = data[key];
          (data[key])['time'] = (temp.hours ? (temp.hours > 9 ? temp.hours : "0" + temp.hours) : "00") + ":" + (temp.minutes ? (temp.minutes > 9 ? temp.minutes : "0" + temp.minutes) : "00") + ":" + (temp.seconds > 9 ? temp.seconds : "0" + temp.seconds) + "." + (temp.millis > 9 ? temp.millis : "0"+temp.millis);
          (data[key])['key'] = key;
          this._25x25scoresHard.push(data[key]);
        }
        this._25x25scoresHard.sort(function(a, b) {
          var aTime = (360000*a.hours) + (6000*a.minutes) + (100*a.seconds) + (a.millis);
          var bTime = (360000*b.hours) + (6000*b.minutes) + (100*b.seconds) + (b.millis);
          if(aTime < bTime) return -1;
          if(aTime > bTime) return 1;
          return 0;
        });
        var index = 10;
        for(index = 10; index < this._25x25scoresHard.length; index++) {
          this.http.delete('https://woohoojinbridges.firebaseio.com/25x25hard/'+this._25x25scoresHard[index].key+'.json')
            .subscribe((data) => {
            });
        }
        this._25x25scoresHard = this._25x25scoresHard.slice(0, 10);
        
      });

      this.http.get('https://woohoojinbridges.firebaseio.com/40x40extreme.json?orderBy="$key"')
      .subscribe((data) => {
        this._40x40scoresExtreme = [];
        for(const key of Object.keys(data)) {
          var temp = data[key];
          (data[key])['time'] = (temp.hours ? (temp.hours > 9 ? temp.hours : "0" + temp.hours) : "00") + ":" + (temp.minutes ? (temp.minutes > 9 ? temp.minutes : "0" + temp.minutes) : "00") + ":" + (temp.seconds > 9 ? temp.seconds : "0" + temp.seconds) + "." + (temp.millis > 9 ? temp.millis : "0"+temp.millis);
          (data[key])['key'] = key;
          this._40x40scoresExtreme.push(data[key]);
        }
        this._40x40scoresExtreme.sort(function(a, b) {
          var aTime = (360000*a.hours) + (6000*a.minutes) + (100*a.seconds) + (a.millis);
          var bTime = (360000*b.hours) + (6000*b.minutes) + (100*b.seconds) + (b.millis);
          if(aTime < bTime) return -1;
          if(aTime > bTime) return 1;
          return 0;
        });
        var index = 10;
        for(index = 10; index < this._40x40scoresExtreme.length; index++) {
          this.http.delete('https://woohoojinbridges.firebaseio.com/40x40extreme/'+this._40x40scoresExtreme[index].key+'.json')
            .subscribe((data) => {
            });
        }
        this._40x40scoresExtreme = this._40x40scoresExtreme.slice(0, 10);
        
      });
  }

  mainMenu()
  {
     /*   let m = {
          name: "Leah",
          hours: 3,
          minutes: 40,
          seconds: 26,
          millis: 83
      };
      this.http.post('https://woohoojinbridges.firebaseio.com/100x100extreme.json', m)
          .subscribe((data) => {
          this.router.navigate(['leaderboards']);
      });*/
      this.router.navigate(['mainMenu']);
  }

}
