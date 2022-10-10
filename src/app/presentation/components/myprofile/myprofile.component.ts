import { MyprofileService } from './../../services/myprofile.service';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

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
  id: string;

  totalLength: any;
  page: number = 1

  posts: {
    title: string,
    date: string,
    likes: number,
    comments: number,
    visulizations: number
  }[] = [
    {
      title: "CComplete Guide: Angular lifecycle hooks",
      date: "5 Jun",
      likes: 14,
      comments: 4,
      visulizations: 21
    },
    {
      title: "Las piedras rodando se encuentran",
      date: "28 Aug",
      likes: 23,
      comments: 8,
      visulizations: 34
    },
    {
      title: "La Casa de Cafe",
      date: "7 Sep",
      likes: 166,
      comments: 67,
      visulizations: 212
    },
    {
      title: "Historia entre tus dedos",
      date: "31 Jan",
      likes: 420,
      comments: 69,
      visulizations: 777
    },
    {
      title: "Gavilan o Paloma",
      date: "20 Oct",
      likes: 9999,
      comments: 9999,
      visulizations: 9999
    },
    {
      title: "Complete Guide: Angular lifecycle hooks",
      date: "5 Jun",
      likes: 14,
      comments: 4,
      visulizations: 21
    },
    {
      title: "Las piedras rodando se encuentran",
      date: "28 Aug",
      likes: 23,
      comments: 8,
      visulizations: 34
    },
    {
      title: "La Casa de Cafe",
      date: "7 Sep",
      likes: 166,
      comments: 67,
      visulizations: 212
    },
    {
      title: "Historia entre tus dedos",
      date: "31 Jan",
      likes: 420,
      comments: 69,
      visulizations: 777
    },
    {
      title: "Gavilan o Paloma",
      date: "20 Oct",
      likes: 9999,
      comments: 9999,
      visulizations: 9999
    }
  ];

  // postsNum: number;
  postsBool = false;
  

  constructor(private _profileService: MyprofileService) { }

  ngOnInit(): void {
    this.getInfo();
    this.totalLength = this.posts.length;
    
  }

  switchPosts(type: number){
    let buttons = document.querySelectorAll('.posts__header-button')!as NodeListOf<HTMLButtonElement>;
    
    buttons.forEach( element => {
      element.classList.remove('selected');
    });

    buttons[type].classList.add('selected');

    if(type === 0){
      this.posts = [
        {
          title: "Complete Guide: Angular lifecycle hooks",
          date: "5 Jun",
          likes: 14,
          comments: 4,
          visulizations: 21
        },
        {
          title: "Las piedras rodando se encuentran",
          date: "28 Aug",
          likes: 23,
          comments: 8,
          visulizations: 34
        },
        {
          title: "La Casa de Cafe",
          date: "7 Sep",
          likes: 166,
          comments: 67,
          visulizations: 212
        },
        {
          title: "Historia entre tus dedos",
          date: "31 Jan",
          likes: 420,
          comments: 69,
          visulizations: 777
        },
        {
          title: "Gavilan o Paloma",
          date: "20 Oct",
          likes: 9999,
          comments: 9999,
          visulizations: 9999
        },
        {
          title: "Complete Guide: Angular lifecycle hooks",
          date: "5 Jun",
          likes: 14,
          comments: 4,
          visulizations: 21
        },
        {
          title: "Las piedras rodando se encuentran",
          date: "28 Aug",
          likes: 23,
          comments: 8,
          visulizations: 34
        },
        {
          title: "La Casa de Cafe",
          date: "7 Sep",
          likes: 166,
          comments: 67,
          visulizations: 212
        },
        {
          title: "Historia entre tus dedos",
          date: "31 Jan",
          likes: 420,
          comments: 69,
          visulizations: 777
        },
        {
          title: "Gavilan o Paloma",
          date: "20 Oct",
          likes: 9999,
          comments: 9999,
          visulizations: 9999
        }]
    } else{
      this.posts = [];
    }

    this.page = 1;
  }

  getInfo(){
    this._profileService.getInfo().subscribe(data => {
      data.forEach((element: any) => {
        this.myProfile = {...element.payload.doc.data()};
        this.id = element.payload.doc.id;

        this.setImages(this.myProfile.pfp, this.myProfile.banner);
        
        this.profileForm = new FormGroup({
          'name': new FormControl({value: this.myProfile.name, disabled: this.isDisabled}),
          'email': new FormControl({value: this.myProfile.email, disabled: this.isDisabled}),
          'work': new FormControl({value: this.myProfile.work, disabled: this.isDisabled}),
          'website': new FormControl({value: this.myProfile.website, disabled: this.isDisabled})
        });
      });
    })
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

  addSkill(){
    let ul = document.querySelector('.resume__list-ul');
    let last = document.querySelector('.resume__list-add-li');
    let li = document.createElement("li");
    let input = this.createInput();

    li.appendChild(input)
    // li.setAttribute('class', 'resume__list-added')

    ul?.insertBefore(li, last);
    // ul?.appendChild(li);
    
  }

  createInput(){
    let input = document.createElement('input');
    input.setAttribute("type","text");
    input.setAttribute("class", "resume__list-added");
    input.setAttribute("placeholder", "Add Skill");
    input.setAttribute("style", `width: 80px; height: 23px; border-radius: 5px; border: 1px solid; margin-bottom: 5px;`);
    input.addEventListener('keyup', (e) => {
      if(e.key === 'Enter'){
        this.setSkills();
      }
      
    });
    
    return input;
  }

  setSkills(){
    const SKILLS = {
      skills: this.myProfile.skills
    }

    let remove = document.querySelectorAll('.resume__list-added')!as NodeListOf<HTMLInputElement>;
    remove?.forEach( e => {
      if(e.value){
        SKILLS.skills.push(e.value);
        e.parentElement?.remove();
        this._profileService.saveInfo(this.id, SKILLS);
      }else{
        alert('Please add a value')
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
