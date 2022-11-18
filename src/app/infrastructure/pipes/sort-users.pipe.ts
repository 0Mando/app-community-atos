import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/domain/models/user.model';

@Pipe({
	name: 'sortUsers',
})
export class SortUsersPipe implements PipeTransform {
	transform(
		users: User[],
		sortBy: 'ASC' | 'DESC',
		sortColumn: 'Name' | 'Email' | 'Title'
	): User[] {
		let isAsc = sortBy === 'ASC' ? true : false;
		users = users.sort((a, b) => {
			let elemA: string;
			let elemB: string;
			switch (sortColumn) {
				case 'Name':
					elemA = isAsc
						? a.firstName + a.lastName
						: b.firstName + b.lastName;
					elemB = !isAsc
						? a.firstName + a.lastName
						: b.firstName + b.lastName;
					break;
				case 'Email':
					elemA = isAsc ? a.email : b.email;
					elemB = !isAsc ? a.email : b.email;
					break;
				case 'Title':
					elemA = isAsc ? a.userType : b.userType;
					elemB = !isAsc ? a.userType : b.userType;
					break;
				default:
					const exhaustiveCheck: never = sortColumn;
					throw new Error(exhaustiveCheck);
			}
			return elemA > elemB ? 1 : elemB > elemA ? -1 : 0;
		});

		return users;
	}
}
