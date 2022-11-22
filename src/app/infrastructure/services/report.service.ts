import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IReport } from 'src/app/domain/models/report.model';

@Injectable({
	providedIn: 'root'
})
export class ReportService {

	constructor(private afs : AngularFirestore) { }

	createReport(report : IReport) {
		console.log('Creating report');
		const newReport = this.afs.collection('reports');
		return newReport.doc(this.afs.createId()).set(report);
	}

	readReports<IReport>() {
		const collection = this.afs.collection<IReport>('reports');
		return collection.valueChanges({idField : 'id'});
	}

	updateReport(idReport : string, status : string) {
		return this.afs.collection('reports').doc(idReport).update({status : status});
	}

	deleteComment(idReport : string) {
		return this.afs.collection('reports').doc(idReport).delete();
	}
}
