import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  totalWins: any;
  totalBuilt: any;
  level: any;
  totalDestroyed: any;
  w: any;
  W: any;
  s: any;
  S: any;
  a: any;
  A: any;
  d: any;
  D: any;

  _1: any;
  _2: any;
  _3: any;
  _4: any;
  _5: any;
  _6: any;
  _7: any;
  _8: any;

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private router: Router, private _firebaseAuth: AngularFireAuth, private http: HttpClient) { 
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
          if (user) {
              this.userDetails = user;
          }
          else {
              this.userDetails = null;
          }
      });
  }

  mainMenu() {
      this.router.navigate(['mainMenu']);
  }

  getProgress() {
    return Math.round(((this.totalBuilt % 1239) / 1239) * 100);
  }

  ngOnInit() {
    this.totalWins = localStorage.getItem("win");
    this.totalBuilt = localStorage.getItem("build");

    this.level = Math.trunc((Number(this.totalBuilt)) / 1239) + 1;

    var elem = document.getElementById("bar");
    elem.style.width = this.getProgress() + '%';

    this.totalDestroyed = localStorage.getItem("destroy");
    this.w = localStorage.getItem("w");
    this.W = localStorage.getItem("W");
    this.s = localStorage.getItem("s");
    this.S = localStorage.getItem("S");
    this.a = localStorage.getItem("a");
    this.A = localStorage.getItem("A");
    this.d = localStorage.getItem("d");
    this.D = localStorage.getItem("D");

    this._1 = localStorage.getItem("1");
    this._2 = localStorage.getItem("2");
    this._3 = localStorage.getItem("3");
    this._4 = localStorage.getItem("4");
    this._5 = localStorage.getItem("5");
    this._6 = localStorage.getItem("6");
    this._7 = localStorage.getItem("7");
    this._8 = localStorage.getItem("8");

    let m = {
      totalWins: this.totalWins,
      totalBuilt: this.totalBuilt,
      totalDestroyed: this.totalDestroyed,
      w: this.w,
      W: this.W,
      a: this.a,
      A: this.A,
      s: this.s,
      S: this.S,
      d: this.d,
      D: this.D,
      _1: this._1,
      _2: this._2,
      _3: this._3,
      _4: this._4,
      _5: this._5,
      _6: this._6,
      _7: this._7,
      _8: this._8
    }
  }

}
