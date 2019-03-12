export class GuarderiasDto {
    name: string;
    photo: string;
    phone: string;
    address: string;
    city: string;
    description: string;
    location: string;

    constructor(na: string, phot: string, phon:string, ad: string, ci: string, des: string, lo: string) {
        this.name = na;
        this.photo = phot;
        this.phone = phon;
        this.address = ad;
        this.city = ci;
        this.description = des;
        this.location = lo;
    }
}