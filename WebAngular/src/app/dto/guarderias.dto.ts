export class GuarderiasDto {
    name: string;
    photo: string;
    address: string;
    zipcode: string;
    city: string;
    province: string;
    description: string;
    location: string;

    constructor(na: string, ph: string, ad: string, zi: string, ci: string, pro: string, des: string, lo: string) {
        this.name = na;
        this.photo = ph;
        this.address = ad;
        this.zipcode = zi;
        this.city = ci;
        this.province = pro;
        this.description = des;
        this.location = lo;
    }
}