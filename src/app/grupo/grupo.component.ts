import { Component, OnInit } from '@angular/core';
import {Grupo} from '../grupo';
import {Universidade} from '../universidade';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { FirebaseStorage } from '@firebase/storage-types';
import { AngularFireStorage } from 'angularfire2/storage';



@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  currentUploadU: Universidade;
  currentUpload: Grupo;
  basePath: 'universidades';
  basePathGrupo: 'grupos';
  currentFileUpload: Universidade;
  selectedFiles: FileList;
  imagemUpload: any;

  gruposCollection:AngularFirestoreCollection<Grupo>;
  gruposDoc:AngularFirestoreDocument<Grupo>;
  grupos:Observable<Grupo[]>;

  universidadeCollection: AngularFirestoreCollection<Universidade>;
  universidades:Observable<Universidade[]>;

  grupo:any = {};
  itemToUpdate: Grupo;
  gruponovo: any = {
    nome_lider: '',
    contacto: '',
    encontro: '',
    nome_universidade:'',
    imagem: '',
  };

  universidade:any = {};
  itemToUpdate01: Grupo;
  universidadenovo: any = {
    nome: '',
    imagem: '',
  };

  constructor(private afs:AngularFirestore, private up: AngularFireStorage ) { }

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
    this.gruposDoc.update({ nome_lider: itemToUpdate.nome_lider, contacto: itemToUpdate.contacto, encontro: itemToUpdate.encontro, imagem: itemToUpdate.imagem, nome_universidade:itemToUpdate.nome_universidade
    }).then(() => {
      console.log('updated');
    })
   }
   
   uploadImage($event: Event){
    this.selectedFiles = ($event.target as HTMLInputElement).files;

   }
   

  adicionar(grupo): void {
    this.gruponovo = grupo;
 
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Grupo(file.item(0));

      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${this.basePathGrupo}/${this.currentUpload.file.name}`).put(this.currentUpload.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot
        },
        (error) => {
          // fail
          console.log(error)
        },
        () => {

          // success
          if (uploadTask.snapshot.downloadURL) {
              this.currentUpload.nome_lider = grupo.nome_lider,
              this.currentUpload.contacto = grupo.contacto, //evento.data_evento
              this.currentUpload.encontro = grupo.encontro,
              this.currentUpload.imagem = uploadTask.snapshot.downloadURL;
              this.currentUpload.nome_universidade = grupo.nome_universidade;
              this.saveFileDataGrupo(this.currentUpload);
          }

        });
    }

  }
 //============== 

  


  private saveFileDataGrupo(grupo){
    this.afs.collection("grupos").add({
      nome_lider : grupo.nome_lider,
      contacto: grupo.contacto,
      encontro: grupo.encontro,
      nome_universidade:grupo.nome_universidade,
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
      nome_lider: '',
      contacto: '',
      encontro: '',
      nome_universidade:'',
      imagem: '',
    };
  }

  //UNIVERSIDADE METHODS
 
  
adicionarUniversidade(universidade): void {
    this.universidadenovo = universidade;
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUploadU = new Universidade(file.item(0));

      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${this.basePath}/${this.currentUploadU.file.name}`).put(this.currentUploadU.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot
        },
        (error) => {
          // fail
          console.log(error)
        },
        () => {

          // success
          if (uploadTask.snapshot.downloadURL) {
              this.currentUploadU.nome = universidade.nome,
              this.currentUploadU.imagem = uploadTask.snapshot.downloadURL;
              this.saveFileDataUniversidade(this.currentUploadU);
          }

        });
    }

  }

  private saveFileDataUniversidade(universidade) {
     
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

  
    

    //=======

 
  cleanUniversidade() {
    this.universidade = {
      nome:'',
      imagem: ''
    };
  }

}
