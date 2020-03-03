import { Single, setSingleValue } from './../../model/Single';
import { Multi, setMultiValue } from './../../model/Multi';
import { MantisService } from './../../service/mantis.service';
import { Component, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { UtilService } from 'src/app/service/utils.service';
import * as _ from 'lodash';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit, OnDestroy {

  singleIssue: Single[];
  singleIssueStatus: Single[];
  multiIssueStatusPeriod: Multi[];
  view: number[];
  viewMobile: number[];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Statut';
  showYAxisLabel = true;
  yAxisLabel = 'Nombre de tickets';
  legendTitle = 'Mois';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showLabels = true;
  isDoughnut = false;

  legendPosition = 'below';
  mobileQuery: MediaQueryList;
  _mobileQueryListener: () => void;

  constructor(private mantisService: MantisService, public utilService: UtilService, private media: MediaMatcher,
              private changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 864px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.singleIssue = [];
   }

  ngOnInit() {
    this.mantisService.getAllIssue().subscribe(data => {
      this.view = [700, 400];
      this.viewMobile = [400, 200];
      const issues = data as any;
      const arrayIssueGroup: Single[] = [];
      const arrayIssueGroupStatus: Single[] = [];
      const arrayIssueStatusPeriod: Multi[] = [];

      // TODO FILTER BY ACTUAL YEAR
      let issuesGroupStatusPeriod = [];
      _.forEach(issues.issues, data => {
        const affectIssue = _.find(data.history, ['new_value.name', 'assigned']);
        _.assign(affectIssue, {severity: data.severity});
        issuesGroupStatusPeriod.push(affectIssue);
      });

      issuesGroupStatusPeriod = _.groupBy(issuesGroupStatusPeriod, 'created_at');
      Object.keys(issuesGroupStatusPeriod).forEach(key => {
        const month = this.utilService.getMonthByDate(new Date(key));
        const singleValue = setSingleValue(issuesGroupStatusPeriod[key][0].severity.name, issuesGroupStatusPeriod[key].length);
        const indexPeriod = _.findIndex(arrayIssueStatusPeriod, ['name', month]);

        if (indexPeriod !== -1) {
          const indexStatus = _.findIndex(arrayIssueStatusPeriod[indexPeriod].series, ['name', singleValue.name]);
          if (indexStatus !== -1) {
            ++arrayIssueStatusPeriod[indexPeriod].series[indexStatus].value;
          } else {
            arrayIssueStatusPeriod[indexPeriod].series = [...arrayIssueStatusPeriod[indexPeriod].series, singleValue];
          }
        } else {
          arrayIssueStatusPeriod.push(
            setMultiValue(month, [singleValue])
          );
        }
      });
      this.multiIssueStatusPeriod = _.sortBy(arrayIssueStatusPeriod, (issue: Single) => {
        return this.utilService.monthNames.indexOf(issue.name);
      });

      const issuesGroup = _.groupBy(issues.issues, 'severity.name');
      Object.keys(issuesGroup).forEach(key => {
        arrayIssueGroup.push(setSingleValue(key, issuesGroup[key].length));
      });
      this.singleIssue = arrayIssueGroup;

      const issuesGroupStatus = _.groupBy(issues.issues, 'status.name');
      Object.keys(issuesGroupStatus).forEach(key => {
        arrayIssueGroupStatus.push(setSingleValue(key, issuesGroupStatus[key].length));
      });
      this.singleIssueStatus = arrayIssueGroupStatus;
    });
  }
  ngOnDestroy() {
    this.changeDetectorRef.detach();
  }
}
