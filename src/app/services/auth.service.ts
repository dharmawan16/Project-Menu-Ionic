import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { resolve, reject } from 'q';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private FirebaseService: FirebaseService,
    public afAuth: AngularFireAuth
  ) { }

  //untuk register user baru
  doRegister(value){
    return new Promise<any>((resolve, reject) =>{
      firebase.auth()
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  //untuk login user
  doLogin(value) {
    return new Promise<any>((resolve, reject) =>{
      firebase.auth()
      .signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  //untuk logout user
  doLogout(){
    return new Promise<any>((resolve, reject) =>{
      this.afAuth.auth.signOut()
      .then(() =>{ //function tidak bernama
        this.FirebaseService.unsubscribeOnLogOut();
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject();
      })
    })
  }



}
