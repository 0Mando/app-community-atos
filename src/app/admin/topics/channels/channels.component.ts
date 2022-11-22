import { Channel } from 'src/app/domain/models/channel.model';
import { BoardCRUDService } from './../../../infrastructure/services/board-crud.service';
import { ModeratorsService } from './../../../infrastructure/services/moderators.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  currentType = "channel";
  currentName: string = "New Channel"

  onEdition = false;

  printChannels: Channel[] = [];

  resetFormSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private _roomService: BoardCRUDService ,private _modService: ModeratorsService) { }

  ngOnInit(): void {
    this.obtainMODS();
    this.obtainParents();
    this.getChannels();
  }
  
  obtainMODS(){
    if(this._modService.modList.length === 0){
      this._modService.readMods().subscribe(doc => {
        doc.forEach(element => {
          this._modService.modList.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        });
      });
    }
  }

  obtainParents(){
    if(this._roomService.parentBoards.length === 0){
      this._roomService.readRoom('boards').subscribe(doc => {
        doc.forEach(element => {
          this._roomService.parentBoards.push({
            id: element.payload.doc.id,
            name: element.payload.doc.data().boardName
          })
        });
      })
    }
  }

  getChannels(){
    this._roomService.readRoom('channels').subscribe(doc => {
      if(this.printChannels){
        this.printChannels = [];
      }
      doc.forEach(element => {
        this.printChannels.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      }); 
    })
  }

  updateChannel(channel: Channel){
    this.currentName = channel.channelName;
    this.onEdition = true;
    setTimeout(() => {
      this._roomService.addRoomEdit(channel);
    }, 10);
  }

  changeState(value: boolean){
    this.onEdition = value;
  }

  newChannel(){
    this.currentName = 'New Channel';
    this.resetFormSubject.next(true);
    this.onEdition = true;
  }
}
