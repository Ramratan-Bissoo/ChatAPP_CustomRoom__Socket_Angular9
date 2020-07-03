import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import * as io from 'socket.io-client'
const SERVER_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  private socket

  constructor() { }

  public initSocket() : void {
    this.socket = io(SERVER_URL)
  }

  joinRoom(data)
    {
        this.socket.emit('join',data);
    }

    newUserJoined()
    {
        let observable = new Observable<{user:String, message:String, img:Boolean,avatar:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leaveRoom(data){
        this.socket.emit('leave',data);
    }

    userLeftRoom(){
        let observable = new Observable<{user:String, message:String, img:Boolean,avatar:String}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data)
    {
        this.socket.emit('message',data);
    }

    


    newMessageReceived(){
        let observable = new Observable<{user:String, message:String, img:Boolean,avatar:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
    
    sendImage(data)
    {
        this.socket.emit('imagefile',data);
    }

    


    newImageReceived(){
        let observable = new Observable<{user:String, message:String,avatar:String}>(observer=>{
            this.socket.on('new image', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

   

}
