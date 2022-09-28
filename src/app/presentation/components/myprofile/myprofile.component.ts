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
  profile = {
    pfp: "https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    banner: "https://images.pexels.com/photos/1022928/pexels-photo-1022928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    email: "someone@example.com",
    work: "Frontend",
    website: "kale.biz",
    age: 22,
    skills:  [
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
    ],
    posts: [
      {
        title: "Complete Guide: Angular lifecycle hooks",
        date: "5 Jun",
        likes: 14,
        comments: 4
      },
      {
        title: "Las piedras rodando se encuentran",
        date: "28 Aug",
        likes: 23,
        comments: 8
      },
      {
        title: "La Casa de Cafe",
        date: "7 Sep",
        likes: 166,
        comments: 67
      },
      {
        title: "Historia entre tus dedos",
        date: "31 Jan",
        likes: 420,
        comments: 69
      },
      {
        title: "Gavilan o Paloma",
        date: "20 Oct",
        likes: 9999,
        comments: 9999
      }
    ],
    archived: [
      {
        title: "Aeroplanos",
        date: "45 Jan",
        likes: 100,
        comments: 50
      },
      {
        title: "Los Felices",
        date: "69 Dec",
        likes: 200,
        comments: 100
      }
    ]
  }

  myProfile: any = {};
  profileForm: FormGroup = new FormGroup({
    'name': new FormControl(),
    'email': new FormControl(),
    'work': new FormControl(),
    'website': new FormControl()
  });
  isDisabled: boolean = true;
  id: string;

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
