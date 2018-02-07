import { Component, OnInit } from '@angular/core';
import {Grupo} from '../grupo';
import {Universidade} from '../universidade';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { FirebaseStorage } from '@firebase/storage-types';



@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  gruposCollection:AngularFirestoreCollection<Grupo>;
  gruposDoc:AngularFirestoreDocument<Grupo>;
  grupos:Observable<Grupo[]>;

  universidadeCollection: AngularFirestoreCollection<Universidade>;
  universidades:Observable<Universidade[]>;

  grupo:any = {};
  itemToUpdate: Grupo;
  gruponovo: any = {
    nomeLider: '',
    contacto: '',
    data: '',
    nomeUniverdade:'',
    imagem: '',
  };

  universidade:any = {};
  itemToUpdate01: Grupo;
  universidadenovo: any = {
    nome: '',
    imagem: '',
  };

  constructor(private afs:AngularFirestore ) { }

  ngOnInit() {
    this.gruposCollection = this.afs.collection('grupos');
  
    this.grupos = this.gruposCollection.snapshotChanges().map(arr =>{
     return arr.map(a =>
       {
         const data = a.payload.doc.data() as Grupo;
         data.id = a.payload.doc.id;
         return data;
       });
    });

    this.universidadeCollection = this.afs.collection('universidades');
    this.universidades = this.universidadeCollection.snapshotChanges().map(arr =>{
     return arr.map(a =>
       {
         const data = a.payload.doc.data() as Universidade;
         data.id= a.payload.doc.id;
         return data;
       });
    });

  }

 
  deletar(grupo: Grupo) {
    
    this.gruposDoc = this.afs.doc(`grupos/${grupo.id}`);
    this.gruposDoc.delete();
   }
   
   editar(grupo: Grupo) {
    //this.gruposDoc = this.afs.doc(`grupos/${grupo.id}`);
    //this.grupo = this.gruposDoc;
     this.grupo = grupo;
  }
   
   update(itemToUpdate:Grupo) {
    this.gruposDoc = this.afs.doc(`grupos/${this.itemToUpdate.id}`);
    this.gruposDoc.update({ nomeLider: itemToUpdate.nomeLider, contacto: itemToUpdate.contacto, data: itemToUpdate.data, imagem: itemToUpdate.imagem, nomeUniverdade:itemToUpdate.nomeUniverdade
    }).then(() => {
      console.log('updated');
    })
   }
   
   

  adicionar(grupo): void {
    this.gruponovo = grupo;
 
  
  this.afs.collection("grupos").add({
      nomeLider : grupo.nomeLider,
      contacto: grupo.contacto,
      data: grupo.data,
      nomeUniverdade:grupo.nomeUniverdade,
      imagem: grupo.imagem
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

  }
 
  clean() {
    this.gruponovo = {
      nomeLider: '',
      contacto: '',
      data: '',
      nomeUniverdade:'',
      imagem: '',
    };
  }

  //UNIVERSIDADE METHODS

  adicionarUniversidade(universidade): void {
    this.universidadenovo = universidade;
 
  
  this.afs.collection("universidades").add({
      nome : universidade.nome,
      imagem: universidade.imagem
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

  }
 
  cleanUniversidade() {
    this.universidade = {
      nome:'',
      imagem: ''
    };
  }

}
