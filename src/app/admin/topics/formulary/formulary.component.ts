import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { Storage, ref, getDownloadURL, uploadBytes,  } from '@angular/fire/storage';

//* Services
import { BoardCRUDService } from './../../../infrastructure/services/board-crud.service';

//* Models
import { Board } from './../../../domain/models/board.model';
import { async } from '@firebase/util';


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
  modList = [
    {
      name: 'Jonathan',
      id: 12345
    },
    {
      name: 'Luis Angel',
      id: 34567
    },
    {
      name: 'Luis Perez',
      id: 78901
    },
    {
      name: 'Alan',
      id: 62473
    },
    {
      name: 'Cristian',
      id: 158487
    }
  ]

  loading: boolean = false;
  file?: File;
  imageUrl = "";
  
  @Input() type = '';
  @Input() board = '';
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();

  @Output() visible = new EventEmitter<boolean>;

  newForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private _boardService: BoardCRUDService,
      private storage: Storage) {
    this.newForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      visibility: ["", Validators.required],
      image: [null, Validators.required],
    })
   }

  ngOnInit(): void {
    this._boardService.getBoardEdit().subscribe(data => {
      console.log(data.boardImage)
      this.newForm.patchValue({
        name: data.boardName,
        description: data.boardDescription,
        visibility: data.boardVisibility,
        image: data.boardImage
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
          this.printMods.push(datalist.value);
          datalist.value = '';
        }
      })
      
  }

  onChange(event){
    this.file = event.target.files[0];
    const reader = new FileReader();
    const change = fromEvent(reader, 'load').subscribe(() => {
      const img = reader.result;
      let image = document.querySelector('.field-image')! as HTMLElement;
      image.style.backgroundImage = `url(${img})`;
    });
    reader.readAsDataURL(this.file);
  }

  addMod(){
    console.log('working on it');
    
  }


  async uploadImage(file : File){
    const imgRef = ref(this.storage, `board-images/${file.lastModified}`)

    try {
      const res = await uploadBytes(imgRef, file);
      const downloadUrl = await getDownloadURL(imgRef)
      this.imageUrl = downloadUrl;
    } catch (error) {
      console.error(error);
    }

  }

  generate(){
    if(this.id == undefined){
      this.addBoard();
    } else{
      this.editBoard(this.id);
    }
  }

  async addBoard(){
    await this.uploadImage(this.file);
    const board: Board = {
      boardName: this.newForm.value.name,
      boardDescription: this.newForm.value.description,
      boardImage: this.imageUrl,
      boardVisibility: this.newForm.value.visibility,
      boardCreation: Date.now()

    }

    this._boardService.createBoard(board).then(() => {
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
      this.id = undefined;
      this.closeForm();
    })
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
