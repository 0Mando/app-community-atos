import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IReport } from 'src/app/domain/models/report.model';

@Injectable({
	providedIn: 'root'
})
export class ReportService {

	constructor(private afs : AngularFirestore) { }

	getReportList():Observable<any> {
		return this.afs.collection<IReport>('reports').valueChanges({ idField : 'id' });
	}

	createReport(report : IReport) {
		let existingReportBoolean = false;
		this.getReportList().subscribe((reports) => {
			reports.forEach((existingReport) => {
				if(existingReport.idItemReported == report.idItemReported){
					existingReportBoolean = true;
					return;
				}
			});
		})
		if(!existingReportBoolean){
			const newReport = this.afs.collection('reports');
			return newReport.doc(this.afs.createId()).set(report);
		}
	}
	
	updateReport(idReport : string, status : string) {
		return this.afs.collection('reports').doc(idReport).update({status : status});
	}

	deleteReport(idReport : string) {
		return this.afs.collection('reports').doc(idReport).delete();
	}
  
	readReportsByType<IReport>() {
		return this.afs.collection<IReport>('reports', ref => ref.orderBy("reportDate", 'desc')).snapshotChanges();
  }

	getReportById(idReport : string) {
		return this.afs.collection('reports').doc(idReport).valueChanges();
	}
}
