export interface IReport {
	id? : string;
	reporterUserId : string;
	activity : 'Comment' | 'Post';
	reportedUserId : string;
	reportDate : number;
	status : 'In Review' | 'Checked'
}
