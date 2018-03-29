import { Position } from './position';
import { Department } from './department';
import { Gender } from './gender';

export class User {
    public Id: string;
    public FirstName: string;
    public LastName: string;
    public MiddleName: string;
    public Gender: Gender;
    public Image: string;

    public PositionId: string;
    public DepartmentId: string;

    public Position: Position;
    public Department: Department;

    constructor(...parts: Partial<User>[]) {
        Object.assign(this, ...parts);

        if (this.Department) {
            this.Department = new Department(this.Department);
        }
        if (this.Position) {
            this.Position = new Position(this.Position);
        }
    }
}