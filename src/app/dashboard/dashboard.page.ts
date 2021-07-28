import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/authentication.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-chat',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  // File upload task 
  fileUploadTask: AngularFireUploadTask;

  // Upload progress
  percentageVal: Observable<number>;

  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;

  // Uploaded File URL
  UploadedImageURL: Observable<string>;

  // Uploaded image collection
  files: Observable<imgFile[]>;

  // Image specifications
  imgName: string;
  imgSize: number;

  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  private filesCollection: AngularFirestoreCollection<imgFile>;


  @ViewChild(IonContent) content: IonContent;

  messages: Observable<any[]>;
  newMsg: string;

  constructor(private chatService: FirebaseService, private router: Router,private afs: AngularFirestore,
    private afStorage: AngularFireStorage) {this.isFileUploading = false;
    this.isFileUploaded = false;
    
    // Define uploaded files collection
    this.filesCollection = afs.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();} 

  uploadImage(event: FileList) {
      
      const file = event.item(0)

      // Image validation
      if (file.type.split('/')[0] !== 'image') { 
        console.log('No se admite ese formato de imagen')
        return;
      }

      this.isFileUploading = true;
      this.isFileUploaded = false;

      this.imgName = file.name;

      // Storage path
      const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;

      // Image reference
      const imageRef = this.afStorage.ref(fileStoragePath);

      // File upload task
      this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);

      // Show uploading progress
      this.percentageVal = this.fileUploadTask.percentageChanges();
      this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
        
        finalize(() => {
          // Retreive uploaded image storage path
          this.UploadedImageURL = imageRef.getDownloadURL();
          
          this.UploadedImageURL.subscribe(resp=>{
            this.storeFilesFirebase({
              name: file.name,
              filepath: resp,
              size: this.imgSize
            });
            this.isFileUploading = false;
            this.isFileUploaded = true;
          },error=>{
            console.log(error);
          })
        }),
        tap(snap => {
            this.imgSize = snap.totalBytes;
        })
      )
  }


  storeFilesFirebase(image: imgFile) {
      const fileId = this.afs.createId();
      
      this.filesCollection.doc(fileId).set(image).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  }
  
  
  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
  }

  sendMessage() {
    this.newMsg = CryptoJS.AES.encrypt(
      this.newMsg.trim(),
      '1721949285'
    ).toString();
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('', { replaceUrl: true });
    });
  }  
}
