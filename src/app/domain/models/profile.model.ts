export class Profile {
    id?: string;
    age: number;
    banner: string;
    email: string;
    name: string;
    pfp: string;
    skills: string[];
    website: string;
    work: string;

    constructor(age: number, banner: string, email: string, pfp: string, skills: string[], website: string, work: string){
        this.age = age;
        this.banner = banner;
        this. email = email;
        this.pfp = pfp;
        this.skills = skills;
        this.website = website;
        this.work = work;
    }
}