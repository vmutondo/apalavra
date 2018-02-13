export class Universidade {
    nome:string;
    imagem:string;
     id?:string;
     file:File;

    constructor(file:File){
        this.file = file;
     }
}

/*
AUTH_SERVICE
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}


@Injectable()
export class AuthService {

  user: Observable<User | null>;
 
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

                this.user = this.afAuth.authState
                .switchMap((user) => {
                  if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                  } else {
                    return Observable.of(null);
                  }
                });
          }

 

  emailLogin(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Nice, it worked!');
      this.router.navigateByUrl('/inicio');
    })
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }


  emailSignUp(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(value => {
     console.log('Sucess', value);
     this.router.navigateByUrl('/inicio');
    }).then((user) => {
      this.updateUserData(user); // if using firestore
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }


 

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email
    }
    return userRef.set(data, { merge: true })
  }
}
*/