import { ModeratorsService } from './../../../infrastructure/services/moderators.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import * as Notiflix from 'notiflix'

//* Services
import { BoardCRUDService } from './../../../infrastructure/services/board-crud.service';

//* Models
import { Board } from './../../../domain/models/board.model';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-formulary',
  templateUrl: './formulary.component.html',
  styleUrls: ['./formulary.component.scss']
})
export class FormularyComponent implements OnInit, AfterViewInit {

  title = 'creating';
  action = 'create new';
  id: string | undefined = undefined;
  printMods: any[] = [];
  modList: any[] = []

  loading: boolean = false;
  file: any = {};
  
  @Input() type = '';
  @Input() board = '';
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();

  @Output() visible = new EventEmitter<boolean>;

  newForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private _boardService: BoardCRUDService,
      private _modService: ModeratorsService) {
    this.newForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      visibility: ['', Validators.required],
      image: [null, Validators.required],
    })
   }

  ngOnInit(): void {
    this.getMods();

    this._boardService.getBoardEdit().subscribe(data => {
      this.newForm.patchValue({
        name: data.boardName,
        description: data.boardDescription,
        visibility: data.boardVisibility
      })
      this.id = data.id;
      this.title = 'editing';
      this.action = 'edit';
    })

    this.resetFormSubject.subscribe( response => {
      if (response){
        this.resForm();
        this.title = 'creating';
        this.action = 'create new';
        this.id = undefined;
      } 
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
              this.printMods.push(y);
              datalist.value = '';
            } else{
              alert('That mod already exist in the list');
              datalist.value = '';
            }
          }
        });
      }
    });
  }

  getMods(){
    this._modService.readMods().subscribe(doc => {
      if (this.modList){
        this.modList = [];
      }
      doc.forEach(element => {
        this.modList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  removeMod(i: number){
    this.printMods.splice(i, 1);
  }

  goToMod(){
    alert('Feaure not available')
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
      this.addBoard();
    } else{
      this.editBoard(this.id);
    }
  }

  addBoard(){
    const TYPE: Board = {
      boardName: this.newForm.value.name,
      boardDescription: this.newForm.value.description,
      boardImage: this.newForm.value.image,
      boardVisibility: this.newForm.value.visibility,
      boardCreation: Date.now()
    }

    this._boardService.createBoard(TYPE).then(() => {
      this.newForm.reset();
      this.closeForm();
      
    }, error => {
      console.log(error);
    })
  }

  editBoard(id: string){
    const TYPE: Board = {
      boardName: this.newForm.value.name,
      boardDescription: this.newForm.value.description,
      boardImage: this.newForm.value.image,
      boardVisibility: this.newForm.value.visibility
    }

    this._boardService.updateBoard(id, TYPE).then(() => {
      this.resForm();
      this.closeForm();
      this.id = undefined;
    }, error => {
      console.log(error);
    })
  }

  deleteBoard(){
    let tempID = this.id;
    Notiflix.Confirm.show(
      'Delete Board',
      'Are you sure you want to delete this board?',
      'Yes',
      'No',
      () => {
        this._boardService.deleteBoard(tempID).then(() => {
          Notiflix.Notify.success(
            'Board Eliminated Correctly',
            {
              timeout: 1000,
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
          timeout: 1000,
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
