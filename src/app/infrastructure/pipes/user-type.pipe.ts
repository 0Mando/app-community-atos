import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'userType',
})
export class UserTypePipe implements PipeTransform {
	transform(
		type: 'normal-user' | 'auth-user' | 'moderator' | 'admin'
	): string {
		switch (type) {
			case 'normal-user':
				return 'Regular user';
			case 'auth-user':
				return 'Authenticated user';
			case 'moderator':
				return 'Moderator';
			case 'admin':
				return 'Administrator';
			default:
				const exhaustiveCheck: never = type;
				throw new Error(exhaustiveCheck);
		}
	}
}
