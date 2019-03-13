export class CangurosDto {
    name: string;
    photo: string;
    phone: string;
    age: string;
    address: string;
    city: string;
    studies: string;
    location: string;

    constructor(na: string, phot: string, phon:string, ag:string, ad: string, ci: string, st: string, lo: string) {
        this.name = na;
        this.photo = phot;
        this.phone = phon
        this.age = ag;
        this.address = ad;
        this.city = ci;
        this.studies = st;
        this.location = lo;
    }
}