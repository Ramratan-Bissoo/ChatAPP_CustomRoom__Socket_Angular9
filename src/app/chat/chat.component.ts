import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 
  user:String;
  room:String;
  messageText:String;
  avatar="../../assets/1.png"
  messageArray:Array<{user:String,message:String,img:Boolean,avatar:String}> = [];

  home = true;
  chat = false;
  imgor= false;
  
  public imagePath;
  imgURL: any;
  public message: string;

  
  
  ioConnection : any

  constructor(private socketService : SocketService) { }

  ngOnInit() {
    this.initIOConnection()
  }

  private initIOConnection(){
    this.socketService.initSocket();
    this.socketService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));


        this.socketService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this.socketService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));
        
        console.log(this.messageArray);

       
 
  }
  join(){
    this.home = false;
    this.chat = true;
    this.socketService.joinRoom({user:this.user, room:this.room, img:this.imgor, avatar:this.avatar});
   }

    leave(){
    
    this.dataclean();
        this.socketService.leaveRoom({user:this.user, room:this.room, img:this.imgor,avatar:this.avatar});
    }
    dataclean(){
        this.home = true;
    this.chat = false;
      this.user ="";
    this.room ="";
    this.messageArray= [];
    }

    sendMessage()
    {
        this.imgor = false;
        this.socketService.sendMessage({user:this.user, room:this.room, message:this.messageText, img:this.imgor,avatar:this.avatar});
        this.messageText = "";
    }
    
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.imgor = true;
      this.socketService.sendMessage({user:this.user, room:this.room, message:this.imgURL,img:this.imgor,avatar:this.avatar});
          this.messageText = "";
          this.initIOConnection();
     }
    
  }
  

}
