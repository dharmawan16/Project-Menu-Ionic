import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangeSubscription: any; //tipe data apapun, string, int, dll

  constructor(
    //paramater type nya public
    //variable type nya private

    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

    //methhod untuk melihat semua data people
    getTask(){
      return new Promise<any>((resolve, reject) =>{
        this.afAuth.user.subscribe(currentUser => {
          if(currentUser){ //jika ada user dalama firebase auth
            this.snapshotChangeSubscription = 
            this.afs.collection('people') //seperti table dg nama people
            .doc (currentUser.uid) //id dari people
            .collection ('tasks')
            .snapshotChanges();
            resolve(this.snapshotChangeSubscription);
          }
        })
      })
    }

    //method untuk melihat task tertentu

    getTask1(taskId){ //nama task = taskId
      return new Promise<any>((resolve, reject) =>{
        this.afAuth.user.subscribe(currentUser => {
          if(currentUser) {
            this.snapshotChangeSubscription =
            this.afs.doc<any>('people/' + currentUser.uid + '/tasks/' +taskId)
            .valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err);
            })
          }
        })
      });
    }

    unsubscribeOnLogOut () {
      this.snapshotChangeSubscription.unsubscribe();
    }

}
