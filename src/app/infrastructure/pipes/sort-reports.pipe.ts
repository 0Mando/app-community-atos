import { Pipe, PipeTransform } from '@angular/core';
import { IReport } from 'src/app/domain/models/report.model';

@Pipe({
	name: 'sortReports',
})
export class SortReportsPipe implements PipeTransform {
	transform(
		reports: IReport[],
		sortBy: 'ASC' | 'DESC',
		sortColumn: 'Activity' | 'Date'
	): IReport[] {
    let isAsc = sortBy === 'ASC' ? true : false;
		reports = reports.sort((a, b) => {
			let elemA: string;
			let elemB: string;
			switch (sortColumn) {
				case 'Activity':
					elemA = isAsc
						? a.activity
						: b.activity;
					elemB = !isAsc
						? a.activity
						: b.activity;
					break;
				case 'Date':
					elemA = (isAsc ? a.reportDate : b.reportDate).toString();
					elemB = (!isAsc ? a.reportDate : b.reportDate).toString();
					break;
				default:
					const exhaustiveCheck: never = sortColumn;
					throw new Error(exhaustiveCheck);
			}
			return elemA > elemB ? 1 : elemB > elemA ? -1 : 0;
		});

		return reports;





  }
}
