import { User } from './user';

export class Position {
    public Id: string;
    public Title: string;
    public Users: User[];

    constructor(...parts: Partial<Position>[]) {
        Object.assign(this, ...parts);
        if (this.Users) {
            this.Users = this.Users.map(u => new User(u));
        }
    }
}