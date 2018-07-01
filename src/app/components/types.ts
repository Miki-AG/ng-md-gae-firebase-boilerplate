export class Hero {
    id: string;
    name: string;
    owner?: string;
    blob_key?: string;
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