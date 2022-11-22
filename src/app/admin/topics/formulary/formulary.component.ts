import { ModeratorsService } from './../../../infrastructure/services/moderators.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { async, fromEvent, Subject } from 'rxjs';
import * as Notiflix from 'notiflix'

//* Services
import { BoardCRUDService } from './../../../infrastructure/services/board-crud.service';

//* Models
import { Board } from 'src/app/domain/models/board.model';
import { Channel } from 'src/app/domain/models/channel.model';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-formulary',
  templateUrl: './formulary.component.html',
  styleUrls: ['./formulary.component.scss']
})
export class FormularyComponent implements OnInit, AfterViewInit{

  title = 'creating';
  action = 'create new';
  id: string | undefined = undefined;
  printMods: any[] = [];
  modList: any[] = [];
  modsID: any[] = [];

  loading: boolean = false;
  file: any = {};
  
  @Input() type = '';
  @Input() board = '';
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();

  @Output() visible = new EventEmitter<boolean>;

  newForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private _roomService: BoardCRUDService,
      private _modService: ModeratorsService) {
    // this.newForm = this.fb.group({
    //   name: [null, Validators.required],
    //   description: [null, Validators.required],
    //   visibility: ['', Validators.required],
    //   parent: ['', Validators.required],
    //   image: [null, Validators.required],
    // });
   }

  ngOnInit(): void {
    this.buildForm();

    this.modList = this._modService.modList;
    
    this.resetFormSubject.subscribe( response => {
      if (response){
        this.resForm();
        this.title = 'creating';
        this.action = 'create new';
        this.id = undefined;
      }
    });

    this.createEdition();
  }

  buildForm(){
    switch(this.type){
      case 'board':
        this.newForm = this.fb.group({
          name: [null, Validators.required],
          description: [null, Validators.required],
          visibility: ['', Validators.required],
          image: [null, Validators.required],
        })
        break;
      case 'channel':
        this.newForm = this.fb.group({
          name: [null, Validators.required],
          description: [null, Validators.required],
          parent: ['', Validators.required],
          image: [null, Validators.required],
        })
        break;
    }
  }

  createEdition(){
    switch(this.type){
      case 'board':
        this._roomService.getBoardEdit().subscribe(data => {
          this.printMods = [];
          this.newForm.patchValue({
            name: data.boardName,
            description: data.boardDescription,
            visibility: data.boardVisibility
          });
          this.modsID = [];
    
          if (data.boardMods){
            data.boardMods.forEach(mod => {
              this.modsID.push(mod);
            });
          }
               
          this.displayMods(this.modsID, this.modList);
          this.id = data.id;
          this.title = 'editing';
          this.action = 'edit';
        });
        break;
      case 'channel':
        this._roomService.getChannelEdit().subscribe(data => {
          this.printMods = [];
          this.newForm.patchValue({
            name: data.channelName,
            description: data.channelDescription,
            parent: data.parentBoard,
          });
          this.modsID = [];

          if (data.channelMods){
            data.channelMods.forEach(mod => {
              this.modsID.push(mod);
            });
          }

          this.displayMods(this.modsID, this.modList);
          this.id = data.id;
          this.title = 'editing';
          this.action = 'edit';
        })
        break;
    }
  }

  displayMods(mods?: string[], list?: any[]){
    mods.forEach(mod => {
      list.forEach(x => {
        if(x.id === mod){
          this.printMods.push(x);
        }
      });
    });
  }

  ngAfterViewInit(): void {        
    const datalist = document.querySelector('#mod-search')! as HTMLInputElement;
    const addMod = fromEvent(datalist, 'keyup');
    addMod.subscribe((x: KeyboardEvent) => {
      if(x.key === "Enter"){
        this.modList.forEach(y => {
          let curr = y.name + " | " + y.id;
          if(datalist.value === curr || datalist.value === y.id) {
            if (!this.printMods.includes(y)){
              this.modsID.push(y.id)
              this.printMods.push(y);
              datalist.value = '';
            } else{
              Notiflix.Report.failure('That mod already exist in the list', '', 'Ok');
              datalist.value = '';
            }
          }
        });
      }
    });
  }

  removeMod(i: number){
    this.printMods.splice(i, 1);
    this.modsID.splice(i, 1);
  }

  goToMod(){
    Notiflix.Report.warning('Feature not available', '', 'Ok');
  }

  onChange(event){
    this.file = event.target.files[0];
    const reader = new FileReader();
    fromEvent(reader, 'load').subscribe(() => {
      const img = reader.result;
      let image = document.querySelector('.field-image')! as HTMLElement;
      image.style.backgroundImage = `url(${img})`;
    });
    reader.readAsDataURL(this.file);
  }

  generate(){
    if(this.id == undefined){
      console.log('undefined');
      this.addRoom();
    } else{
      console.log(this.id);
      this.editRoom(this.id);
    }
  }

  addRoom(){
    let TYPE: Board | Channel;
    let room = this.type + 's';
    switch(this.type){
      case 'board':
        TYPE = {
          boardName: this.newForm.value.name,
          boardDescription: this.newForm.value.description,
          boardImage: this.newForm.value.image,
          boardVisibility: this.newForm.value.visibility,
          boardCreation: Date.now(),
          boardMods: this.modsID
        }
        break;
      case 'channel':
        TYPE = {
          channelName: this.newForm.value.name,
          channelDescription: this.newForm.value.description,
          channelImage: this.newForm.value.image,
          parentBoard: '',
          channelCreation: Date.now(),
          channelMods: this.modsID
        }
    }

    this._roomService.createRoom(TYPE, room).then(() => {
      this.newForm.reset();
      this.closeForm();
      
    }, error => {
      console.log(error);
    })
  }

  editRoom(id: string){
    let TYPE: Board | Channel;
    let room = this.type+'s';
    switch(this.type){
      case 'board':
        TYPE = {
          boardName: this.newForm.value.name,
          boardDescription: this.newForm.value.description,
          boardImage: this.newForm.value.image,
          boardVisibility: this.newForm.value.visibility,
          boardMods: this.modsID
        }
        break;
      case 'channel':
        TYPE = {
          channelName: this.newForm.value.name,
          channelDescription: this.newForm.value.description,
          channelImage: this.newForm.value.image,
          parentBoard: this.newForm.value.parent,
          channelMods: this.modsID
        }
    }

    this._roomService.updateRoom(id, TYPE, room).then(() => {
      this.resForm();
      this.closeForm();
      this.id = undefined;
    }, error => {
      console.log(error);
    })
  }

  deleteRoom(){
    let tempID = this.id;
    let type = this.type+'s';
    Notiflix.Confirm.show(
      'Delete Board',
      'Are you sure you want to delete this '+this.type+'?',
      'Yes',
      'No',
      () => {
        this._roomService.deleteRoom(tempID, type).then(() => {
          Notiflix.Notify.success(
            this.type.toUpperCase() + ' Eliminated Correctly',
            {
              timeout: 2000,
            },
          );
          this.closeForm();
        }, error => {
          console.log(error);
        });
      },
      function cancelCb() {
        Notiflix.Notify.warning('Action Cancelled',
        {
          timeout: 2000,
        });
      },
      {
        width: '320px',
        borderRadius: '8px',
        titleColor: '#0195ff',
        okButtonBackground: '#0195ff',
      },
    );
  }

  closeForm(){
    this.visible.emit(false);
  }

  resForm(){
    this.newForm.reset();
    this.newForm.patchValue({
      visibility: ""
    })
  }

}
