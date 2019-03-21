export class GuarderiasDto {
    name: string;
    phone: string;
    address: string;
    city: string;
    description: string;
    location: string;

    constructor(na: string, phon:string, ad: string, ci: string, des: string, lo: string) {
        this.name = na;
        this.phone = phon;
        this.address = ad;
        this.city = ci;
        this.description = des;
        this.location = lo;
    }
}