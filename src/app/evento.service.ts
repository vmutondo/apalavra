import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {Evento} from './evento';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class EventoService {
 

  constructor(private afs: AngularFirestore) { }



 // update image if a file is detected and realtimedb
    // This method updates both file/image and realtime db data
    /**
     *
     * @param quadro
     * @param updateFile
     * @param updatedQuadro
     *
     * Workflow:
     *      1: Delete current profile photo.
     *      2. Push the new image to firestorage.
     *      3. update the Object url with the new image.
     *      4. update realtime db.
     */
    updateWithImage(evento, updateFile, updatedEvento) {
      // first delete the current image/file being used
      this.deleteFileStorage(evento.name);
      // push the new image/file
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${'eventos'}/${updateFile.file.name}`).put(updateFile.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: firebase.storage.UploadTaskSnapshot) => {
              // upload in progress
              const snap = snapshot;
          },
          (error) => {
              // upload failed
              console.log(error);
          },
          () => {
              // upload success
              if (uploadTask.snapshot.downloadURL) {
                updatedEvento.titulo = evento.titulo,
                updatedEvento.data_evento = new Date(evento.data_evento),
                updatedEvento.descricao = evento.descricao,
                updatedEvento.imagem = uploadTask.snapshot.downloadURL;
                this.updateFireData(evento.id, updatedEvento);
                  return;
              } else {
                  console.error('No download URL!');
              }
          },
      );
  }

  // update realtime db only: if there's no new file found
  updateData(id, updatedEvento) {
      this.updateFireData(id, updatedEvento);
  }

  private updateFireData(id, evento) {
    var eventosRef = this.afs.collection("eventos").doc(id);

    // Set the "capital" field of the city 'DC'
   // console.log(evento);
    return eventosRef.update(evento)
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }



  // Writes the file details to the firestore
  private saveFileData(evento) {
    this.afs.collection("eventos").add({
      titulo: evento.titulo,
      descricao:  evento.descricao,
     data_evento: evento.data_evento,
     imagem: evento.imagem
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }



  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
      const storageRef = firebase.storage().ref();
      storageRef.child(`${'eventos'}/${name}`).delete();
  }

}
