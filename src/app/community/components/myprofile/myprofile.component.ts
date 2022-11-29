import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { fromEvent, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { MyprofileService } from '../../../infrastructure/services/myprofile.service';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
    myProfile: any = {};
  profileForm: FormGroup = new FormGroup({
    'name': new FormControl(),
    'email': new FormControl(),
    'work': new FormControl(),
    'website': new FormControl()
  });
  isDisabled: boolean = true;
  isLoading: boolean;
  id: string;
  pfp: string;
  banner: string;
  imageUrl = ''
  file?: File;
  newForm: FormGroup;
  totalLength: number = 0;
  page: number = 1
  type = ''
  isProfilePictureUploading = false;

  myPosts: any[] = [];
  archivedPosts: any[] = [];

  posts = [];

  // postsNum: number;
  postsBool = false;
  

  constructor(
      private _profileService: MyprofileService,
      private _authService: AuthService,
      private _articleService: ArticleService,
      private storage: Storage) {}

  ngOnInit(): void {
    this.isLoading = true;
    
    this._authService.getCurrentUser().pipe(
      map(data => {
        if(data){
          return data.uid
        }
      }),
      switchMap(data => this._profileService.getInfo(data).pipe(
        map(data => {
          if(data){
            this.id = data.payload.id;
            this.pfp = data.payload.data().profilePicture;
            this.banner = data.payload.data().bannerImage;
            this.myProfile = {...data.payload.data()}
            this.profileForm = new FormGroup({
              'name': new FormControl({value: data.payload.data().name, disabled: this.isDisabled}),
              'email': new FormControl({value: data.payload.data().email, disabled: this.isDisabled}),
              'work': new FormControl({value: data.payload.data().work, disabled: this.isDisabled}),
              'website': new FormControl({value: data.payload.data().website, disabled: this.isDisabled})
            })
          }
          this.isLoading = false;
        })
      ))
    ).subscribe()
    
    this.getArchived();
    this.getUnarchived();
  }

  getUnarchived(){
    this._authService.getCurrentUser().pipe(
      map(data => {
        if(data){
          return data.uid
        }
      }),
      switchMap(data => this._articleService.getUserArticles(data, false).pipe(
        map(data => {
          if(data){
            data.docs.forEach(x => {
              this.myPosts.push(x.data());
            })
            this.posts = this.myPosts;
            this.totalLength = this.myPosts.length;
          }
        })
      ))
    ).subscribe();
  }

  getArchived(){
    this._authService.getCurrentUser().pipe(
      map(data => {
        if(data){
          return data.uid
        }
      }),
      switchMap(data => this._articleService.getUserArticles(data, true).pipe(
        map(data => {
          if(data){
            data.docs.forEach(x => {
              this.archivedPosts.push(x.data());
            })
          }
        })
      ))
    ).subscribe();
  }

  switchPosts(type: number){
    let buttons = document.querySelectorAll('.posts__header-button')!as NodeListOf<HTMLButtonElement>;
    
    buttons.forEach( element => {
      element.classList.remove('selected');
    });

    buttons[type].classList.add('selected');

    if(type === 0){
      this.posts = this.myPosts;
    } else{
      this.posts = this.archivedPosts;
    }

    this.totalLength = this.posts.length;

    this.page = 1;
  }

  setInfo(){
    const PROFILE = {
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      website: this.profileForm.value.website,
      work: this.profileForm.value.work
    }

    this._profileService.saveInfo(this.id, PROFILE)
  }

  onChangeBanner(event){
    const reader = new FileReader();
    fromEvent(reader, 'load').subscribe(() => {
      const img = reader.result;
      let image = document.querySelector('.banner')! as HTMLElement;
      image.style.backgroundImage = `url(${img})`;
    });
    reader.readAsDataURL(this.file);
  }

  async uploadImage(file : File){
    try {
      console.log(file)
      const imgRef = ref(this.storage, `${this.type}/${file.lastModified}`)
      const res = await uploadBytes(imgRef, file);
      const downloadUrl = await getDownloadURL(imgRef)
      return downloadUrl;
    } catch (error) {
      console.error(error);
      return '';
    }
  }

   async setProfilePhoto(event){
    const file = event.target.files[0];
    this.type = 'profile-pictures'
    this.isProfilePictureUploading = true;
    const downloadUrl = await this.uploadImage(file);
    const PHOTO = {
      profilePicture: downloadUrl
    }
    this.isProfilePictureUploading = false;
    this._profileService.saveInfo(this.id, PHOTO)
  }

  async setProfileBanner(){
    this.type = 'banner-pictures'
    const downloadUrl = await this.uploadImage(this.file);
    const PHOTO = {
      bannerImage: downloadUrl
    }

    this._profileService.saveInfo(this.id, PHOTO)
  }

  addSkill(){
    let ul = document.querySelector('.resume__list-ul');
    let last = document.querySelector('.resume__list-add-li');
    let li = document.createElement("li");
    let input = this.createInput();
    let inputEvnt = fromEvent(input, 'keyup');
    inputEvnt.subscribe((e: KeyboardEvent) => {
      if(e.key === 'Enter'){
        this.setSkills();
      }
    })

    li.appendChild(input)
    // li.setAttribute('class', 'resume__list-added')

    ul?.insertBefore(li, last);
    // ul?.appendChild(li);
    
  }

  createInput(){
    let input = document.createElement('input')! as HTMLInputElement;
    input.setAttribute("type","text");
    input.setAttribute("class", "resume__list-added");
    input.setAttribute("placeholder", "Add Skill");
    input.setAttribute("style", `width: 80px; height: 23px; border-radius: 5px; border: 1px solid; margin-bottom: 5px;`);

    return input;
  }

  setSkills(){
    let SKILLS = {
      skills: []
    }
    if(this.myProfile.skills){
      SKILLS = {
        skills: this.myProfile.skills
      }
    } else {
      ;
    }
     

    let remove = document.querySelectorAll('.resume__list-added')!as NodeListOf<HTMLInputElement>;
    remove?.forEach( e => {
      if(e.value){
        if(e.value.length <= 14){
          SKILLS.skills.push(e.value);
          e.parentElement?.remove();
          this._profileService.saveInfo(this.id, SKILLS);
        } else {
          Notify.failure('Please enter a shorter word');
        }
      }else{
        Notify.failure('Please add a value')
      }
    })
  }

  setImages(pfp: string, banner: string){
    let img = document.querySelector('.profile__image')! as HTMLDivElement;
    let bg = document.querySelector('.banner')! as HTMLDivElement;
    img.style.backgroundImage = `url(${pfp})`;
    bg.style.backgroundImage = `url(${banner})`;
  }

  enableEditing() {
    this.isDisabled = !this.isDisabled;

    let btn = document.querySelector('.info__items-edit')! as HTMLButtonElement;

    if(this.isDisabled){
      this.setInfo();
      this.profileForm.get('name')?.disable();
      this.profileForm.get('email')?.disable();
      this.profileForm.get('work')?.disable();
      this.profileForm.get('website')?.disable();

      btn.innerHTML = '<i class="fa-solid fa-pen"></i>';
      btn.style.color = 'red';
    } else{
      this.profileForm.get('name')?.enable();
      this.profileForm.get('email')?.enable();
      this.profileForm.get('work')?.enable();
      this.profileForm.get('website')?.enable();

      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      btn.style.color = 'green';
    }
  }
}
