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
  }

}
