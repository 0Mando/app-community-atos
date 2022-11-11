import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/domain/models/user.model';

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

function validateSecondTitleName(
	input: string,
	userType: 'normal-user' | 'auth-user' | 'moderator' | 'admin'|'disabled'
): boolean {
	switch (userType) {
		case 'normal-user':
			return 'Regular user'.toLowerCase().includes(input.toLowerCase());
		case 'auth-user':
			return 'Authenticated user'
				.toLowerCase()
				.includes(input.toLowerCase());
		case 'moderator':
			return 'Moderator'.toLowerCase().includes(input.toLowerCase());
		case 'admin':
			return 'Administrator'.toLowerCase().includes(input.toLowerCase());
		case 'disabled':
			return 'Disabled'.toLowerCase().includes(input.toLowerCase());
		default:
			const exhaustiveCheck: never = userType;
			throw new Error(exhaustiveCheck);
	}
}
