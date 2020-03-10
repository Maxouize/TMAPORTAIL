import { Component, OnInit } from '@angular/core';
import { MantisService } from 'src/app/service/mantis.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.scss']
})
export class ManagerViewComponent implements OnInit {

  public issueNotAffect: any[];
  public issueDelay: any[];
  public displayedColumns: string[];
  public displayedColumnsDelay: string[];

  constructor(private mantisService: MantisService) {
    this.issueNotAffect = [];
    this.issueDelay = [];
  }

  ngOnInit() {
    this.displayedColumns = ['idIssue', 'summary', 'severity', 'priority', 'project'];
    this.displayedColumnsDelay = ['idIssue', 'summary', 'handler', 'severity', 'priority', 'project'];
    this.mantisService.getAllIssue().subscribe(data => {
      const dataIssues = data as any;
      this.issueNotAffect = _.filter(dataIssues.issues, issue => !_.has(issue, 'handler'));
      this.issueDelay =  _.filter(dataIssues.issues, issue => new Date(issue.due_date) < new Date());
      console.log(this.issueNotAffect);
    });
  }

}
