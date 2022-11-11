import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/domain/models/user.model';
import { UserTypePipe } from './user-type.pipe';

@Pipe({
	name: 'filterUsers',
})
export class FilterUsersPipe implements PipeTransform {
	transform(
		users: User[],
		filterType: 'Name' | 'Email' | 'Title' | 'None',
		input: string
	): User[] {
		if (input == '' || filterType == 'None') {
			return users;
		}

		switch (filterType) {
			case 'Name':
				users = users.filter((user) => {
					return (
						user.firstName
							.toLowerCase()
							.includes(input.toLowerCase()) ||
						user.lastName
							.toLowerCase()
							.includes(input.toLowerCase())
					);
				});
				break;
			case 'Email':
				users = users.filter((user) => {
					return user.email
						.toLowerCase()
						.includes(input.toLowerCase());
				});
				break;
			case 'Title':
				users = users.filter((user) => {
					return (
						user.userType
							.toLowerCase()
							.includes(input.toLowerCase()) ||
						validateSecondTitleName(input, user.userType)
					);
				});
				break;
			default:
				const exhaustiveCheck: never = filterType;
				throw new Error(exhaustiveCheck);
		}
		return users;
	}
}

function validateSecondTitleName(input:string, userType:'normal-user' | 'auth-user' | 'moderator' | 'admin'): boolean {
	if (
		userType == 'normal-user' &&
		'Regular user'.toLowerCase().includes(input.toLowerCase())
	) {
		return true;
	} else if (
		userType == 'auth-user' &&
		'Authenticated user'.toLowerCase().includes(input.toLowerCase())
	) {
		return true;
	} else if (
		userType == 'moderator' &&
		'Moderator'.toLowerCase().includes(input.toLowerCase())
	) {
		return true;
	} else if (
		userType == 'admin' &&
		'Administrator'.toLowerCase().includes(input.toLowerCase())
	) {
		return true;
	}
	return false;
}
