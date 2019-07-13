import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve } from 'url';
import { reject } from 'q';

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
  getTask() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) { //jika ada user dalama firebase auth
          this.snapshotChangeSubscription =
            this.afs.collection('people') //seperti table dg nama people
              .doc(currentUser.uid) //id dari people
              .collection('tasks')
              .snapshotChanges();
          resolve(this.snapshotChangeSubscription);
        }
      })
    })
  }

  //method untuk melihat task tertentu

  getTask1(taskId) { //nama task = taskId
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangeSubscription =
            this.afs.doc<any>('people/' + currentUser.uid + '/tasks/' + taskId)
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

  unsubscribeOnLogOut() {
    this.snapshotChangeSubscription.unsubscribe();
  }

  //membuat task baru
  createTask(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people')
        .doc(currentUser.uid)
        .collection('tasks').add({
          tittle: value.tittle,
          description: value.description,
          image: value.image
        })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  //untuk menghandle image
  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
  }

  //untuk mengupload image ke firebase
  uploadImage(imageURI, randomId) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image')
        .child(randomId);
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(res => resolve(res))
          }, err => {
            reject(err);
          })
      })
    })
  }

  //untuk mengubah task
  updateTask(taskKey, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people')
        .doc(currentUser.uid)
        .collection('tasks')
        .doc(taskKey).set(value)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  //untuk menghapus task
  deleteTask(taskKey) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people')
        .doc(currentUser.uid)
        .collection('tasks')
        .doc(taskKey).delete()
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

}
