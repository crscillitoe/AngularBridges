import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  totalWins: any;
  totalBuilt: any;
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

  constructor(private router: Router) { }

  mainMenu() {
      this.router.navigate(['mainMenu']);
  }

  ngOnInit() {
    this.totalWins = localStorage.getItem("win");
    this.totalBuilt = localStorage.getItem("build");
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
  }

}
