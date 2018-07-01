export class Hero {
    id: string;
    name: string;
    owner?: string;
    upload_url?: string;
    created?: string;
}
export class HeroData {
    items: Hero[];
}
export class User {
    email: string;
    username: string;
    password: string;
}