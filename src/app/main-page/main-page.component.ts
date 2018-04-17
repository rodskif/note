import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NoteService } from '../note.service';
import { SetupPageComponent } from '../setup-page/setup-page.component';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { LocalStorageService } from 'ngx-webstorage';

export class Note {
    constructor(public title, public text) { }
}

export class Comment {
    constructor(public name, public comment) { }
}

@Component({
  moduleId: module.id,
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  public notesItem: Observable<any>;
  public notes: AngularFireList<any>;

  public commentItem: Observable<any>;
  public comments: AngularFireList<any>;

  public storage: string = 'firebase';

  constructor(private db: AngularFireDatabase, private localSt: LocalStorageService) {

         this.notesItem = db.list('notes').valueChanges();
         this.notes = db.list('notes');
         //this.comments = db.list('notes-comments/');
         this.comments = db.list('notes-comments', ref => ref.orderByChild('name').equalTo('Yura'));
         this.commentItem = this.comments.valueChanges();
  }

  ngOnInit() {
  	console.log(this.storage);
  }

  title: string = '';
  text: string = '';

  name: string = '';
  comment: string = '';

  public addNote(): void {
      let newNote = new Note(this.title, this.text);
      let receiptRef = this.notes.push(newNote);
      receiptRef.update({ id: receiptRef.key });
      //this.setLocalStorage();
      this.title = '';
      this.text = '';
      console.log('key - ' + receiptRef.key + 'id - ' + receiptRef);
  }

  public updateNote(value, note): void {
    console.log('title - ' + note.title + '; text - ' + note.text + '; new text - ' + value );
    this.notes.update(note.id, {text: value});
  }

  public deleteNote(note) {
    console.log('object - ' + JSON.stringify(note) + ' key - ' + note.id);
    this.notes.remove(note.id);
  }

  public addComment(note): void {
    let newComment = new Comment(this.name, this.comment);
    let commentRef = this.comments.push(newComment);
    commentRef.update({ id: commentRef.key, note_id: note.id });

    this.name = '';
    this.comment = '';

    console.log(' ;) ');
  }



// Local storage
//also can use another method escribe in https://filipmolcik.com/angular-2-local-storage/


setLocalStorage() {
	// this.localSt.store('title', this.title);
	this.localSt.store('title', 'some title');
}
getLocalStorage() {
	alert(this.localSt.retrieve('title'));
	console.log(this.localSt.retrieve('title'));
}
delLocalStorage() {
	this.localSt.clear('title');
}


}
