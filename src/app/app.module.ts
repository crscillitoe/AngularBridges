import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BoardFormComponent } from './board-form/board-form.component';
import { BoardComponentComponent } from './board-component/board-component.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: 'entryPage', component: 'BoardFormComponent'},
    { path: 'routedPage', component: 'BoardComponent'}
];

@NgModule({
  declarations: [
    AppComponent,
    BoardFormComponent,
    BoardComponentComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      RouterModule.forRoot(
          appRoutes,
          { enableTracing: true }
      )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
