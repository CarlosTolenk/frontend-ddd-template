export class CourseImageUrl {

	public static isValid(value: string): boolean {
		const regexExp = /^(?:https?:\/\/)?(?:[\w]+\.)(?:\.?[\w]{2,})(\/[\w]*)*(\.[\w]+)*/;
		return regexExp.test(value);
	}

	public static invalidMessage(value: string): string {
		return `The image url [${value}] is not valid`;
	}
}
