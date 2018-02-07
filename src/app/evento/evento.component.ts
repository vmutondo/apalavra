import { Component, OnInit,Input } from '@angular/core';
import { Evento} from '../evento';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { EventoService } from '../evento.service';
import { FirebaseStorage } from '@firebase/storage-types';



@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})


export class EventoComponent implements OnInit {
  //@Input() evento_edit:Evento;
 

  eventosCollection:AngularFirestoreCollection<Evento>;
  eventosDoc:AngularFirestoreDocument<Evento>;
  eventos:Observable<Evento[]>;
 
  itemToUpdate: Evento;

 // eventos: Evento[];
  evento: any = {};
  eventonovo: any = {
    titulo: '',
    descricao: '',
    data: '',
    imagem: '',
  };
 
  
  constructor(private afs: AngularFirestore) {

  }

  ngOnInit() {
   // this.getEventos();
   this.eventosCollection = this.afs.collection('eventos');
  
   //this.eventos = this.eventosCollection.valueChanges()
   this.eventos = this.eventosCollection.snapshotChanges().map(arr =>{
    return arr.map(a =>
      {
        const data = a.payload.doc.data() as Evento;
        data.id = a.payload.doc.id;
        return data;
      });
   });
  }






  
  addImage(evento){
    this.eventonovo = evento;
    var storageRef = firebase.storage().ref();

   
    var file = evento.imagem;
    
var metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('imagens_eventos/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    switch (snapshot) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  }, function() {
  // Upload completed successfully, now we can get the download URL
  var downloadURL = uploadTask.snapshot.downloadURL;
});
    
  }

  
  deletar(evento: Evento) {
    
    this.eventosDoc = this.afs.doc(`eventos/${evento.id}`);
    this.eventosDoc.delete();
   }
   
   editar(evento: Evento) {
    //this.eventosDoc = this.afs.doc(`eventos/${evento.id}`);
    //this.evento = this.eventosDoc;
     this.evento = evento;
  }
   
   update(itemToUpdate:Evento) {
    this.eventosDoc = this.afs.doc(`eventos/${this.itemToUpdate.id}`);
    this.eventosDoc.update({ titulo: itemToUpdate.titulo, data_evento: itemToUpdate.data_evento, descricao: itemToUpdate.descricao, imagem: itemToUpdate.imagem
    }).then(() => {
      console.log('updated');
    })
   }
   
   

  adicionar(evento): void {
    this.eventonovo = evento;
 
  
  this.afs.collection("eventos").add({
      titulo : evento.titulo,
      data_evento: evento.data,
      descricao: evento.descricao,
      imagem: evento.imagem
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

  }
 
  clean() {
    this.eventonovo = {
      titulo: '',
      descricao: '',
      data: '',
      imagem: '',
    };
  }
}
