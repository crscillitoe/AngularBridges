import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BoardFormComponent } from './board-form/board-form.component';
import { BoardComponentComponent } from './board-component/board-component.component';
import { RouterModule, Routes } from '@angular/router';
import {    MatFormFieldModule, 
            MatRadioModule,
            MatButtonToggleModule } from '@angular/material';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RulesComponent } from './rules/rules.component';
import { StatsComponent } from './stats/stats.component';
import { NormalModeComponent } from './normal-mode/normal-mode.component';
import { GauntletModeComponent } from './gauntlet-mode/gauntlet-mode.component';
import { MedleyModeComponent } from './medley-mode/medley-mode.component';


const appRoutes: Routes = [
    { path: '', component: BoardFormComponent},
    { path: 'mainMenu', component: BoardFormComponent},
    { path: 'normal-mode', component: NormalModeComponent },
    { path: 'gauntlet-mode', component: GauntletModeComponent },
    { path: 'medley-mode', component: MedleyModeComponent },
    { path: 'leaderboards', component: LeaderboardsComponent},
    { path: 'rules', component: RulesComponent},
    { path: 'stats', component: StatsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BoardFormComponent,
    BoardComponentComponent,
    LeaderboardsComponent,
    RulesComponent,
    StatsComponent,
    NormalModeComponent,
    GauntletModeComponent,
    MedleyModeComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      MatRadioModule,
      MatFormFieldModule,
      MatButtonToggleModule,
      AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
      RouterModule.forRoot(
          appRoutes,
          { enableTracing: false }
      )
  ],
  exports: [
      MatRadioModule,
      MatFormFieldModule,
      MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
