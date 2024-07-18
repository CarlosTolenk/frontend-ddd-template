export class CourseTitle {
	static readonly MAX_COURSE_LENGTH = 40;
	static readonly MIN_COURSE_LENGTH = 5;

	constructor(readonly value: string) {
		if (!CourseTitle.isValid(value)) {
			throw new Error(CourseTitle.invalidMessage(value));
		}
	}

	public static isValid(value: string): boolean {
		return value.length > CourseTitle.MIN_COURSE_LENGTH && value.length < CourseTitle.MAX_COURSE_LENGTH;
	}

	public static invalidMessage(value: string): string {
		return `The title [${value}] is too long. ${CourseTitle.MAX_COURSE_LENGTH} chars is the max allowed`;
	}
}
