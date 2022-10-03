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
  skills: string[] = [
    "HTML",
    "SASS",
    "CSS",
    "GIT",
    "JS6",
    "Azure",
    "Angular",
    "React",
    "RxJS",
    "VUE",
    "FIREBASE",
    "Mongo"
  ]

  constructor(private _profileService: MyprofileService) { }

  ngOnInit(): void {
    this.getInfo();
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
