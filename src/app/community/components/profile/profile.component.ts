import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
    "Mongo",
    // "HTML",
    // "SASS",
    // "CSS",
    // "GIT",
    // "JS6",
    // "Azure",
    // "Angular",
    // "React",
    // "RxJS",
    // "VUE",
    // "FIREBASE",
    // "Mongo"
  ]

  posts = [
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
  ]

  name: string = "Lesly McLOVIN";

  following: boolean = true;
  verified: boolean = false;

  pfp: string = 
  "url('https://pbs.twimg.com/media/E8-10W9UcAsUr2d.jpg:large')";
  bg: string = 
  "url('https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";

  constructor() { }

  ngOnInit(): void {
    let btn = document.querySelector('.follow__btn')! as HTMLButtonElement;
    let img = document.querySelector('.profile__image')! as HTMLDivElement;
    let check = document.querySelector('.profile__image-check')! as HTMLSpanElement;
    let verify = document.querySelector('.profile__actions-verify')! as HTMLButtonElement;
    let bg = document.querySelector('.banner')! as HTMLDivElement;

    img.style.backgroundImage = this.pfp;
    bg.style.backgroundImage = this.bg;

    if(this.following){
      btn.classList.add('following');
      btn.textContent = 'Following';
    } else{
      btn.classList.remove('following');
      btn.textContent = 'Follow';
    }

    if(this.verified){
      img.classList.add('verified');
      check.style.background = '#55be75';
      verify.style.display = "none";
    }
  }

  follow():void {
    let btn = document.querySelector('.follow__btn')! as HTMLButtonElement;
    btn.classList.toggle('following');

    if (this.following){
      btn.textContent = "Follow";
    } else {
      btn.textContent = "Following";
    }

    this.following = !this.following;
  }

}
