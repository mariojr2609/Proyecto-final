export class UserDto {
    email: string;
    password: string;
    name: string;
    role: string;
    picture: string;

    constructor(em: string, pa: string, na: string, ro: string, pic: string) {
        this.email = em;
        this.password = pa;
        this.name = na;
        this.role = ro;
        this.picture = pic;
    }
}