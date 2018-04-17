import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { Ng2Webstorage } from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SetupPageComponent } from './setup-page/setup-page.component';
import { NoteService } from './note.service';


export const firebaseConfig = {
  apiKey: 'AIzaSyDEyQ_3n6FA7o-PRrK82I9qtT0SQ3wFQvQ',
  authDomain: 'notesapp-79688.firebaseapp.com',
  databaseURL: 'https://notesapp-79688.firebaseio.com',
  storageBucket: '',
  messagingSenderId: '774615989293'
};

const routes = [
    {path: '', component: MainPageComponent},
    {path: 'setup', component: SetupPageComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SetupPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    Ng2Webstorage,
    RouterModule.forRoot(routes)
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
