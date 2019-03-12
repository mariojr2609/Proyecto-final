export class CangurosDto {
    name: string;
    photo: string;
    age: string;
    address: string;
    zipcode: string;
    city: string;
    province: string;
    description: string;
    studies: string;
    location: string;

    constructor(na: string, ph: string, ag:string, ad: string, zi: string, ci: string, pro: string, st: string, des: string, lo: string) {
        this.name = na;
        this.photo = ph;
        this.age = ag;
        this.address = ad;
        this.zipcode = zi;
        this.city = ci;
        this.province = pro;
        this.description = des;
        this.studies = st;
        this.location = lo;
    }
}