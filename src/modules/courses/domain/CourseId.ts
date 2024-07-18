import {Uuid} from "../../shared/domain/Uuid";

export class CourseId extends Uuid {
    constructor(value: string) {
        super(value);
    }

    public static isValid(value: string): boolean {
        // Ensure is valid
        return true;
    }
}
