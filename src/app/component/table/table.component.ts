import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/Table';
import { getFrenchPaginatorIntl } from './french-paginator-intl';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() }]
})
export class TableComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @Input() listData: any[];
  @Input() title: string;
  @Input() subTitle: string;
  @Input() displayedColumns: string[];

  private paginator: MatPaginator;
  private sort: MatSort;
  public dataSource: MatTableDataSource<any>;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    if (this.listData) {
      this.initTable(this.listData);
    }
  }

  /**
   * initialisation de la table
   */
  initTable(data: any[]) {
    this.dataSource = new MatTableDataSource<any>(data);
    if (this.paginator && this.sort) {
      this.setDataSourceAttributes();
      this.setDataSourcePaginatorLength(data.length);
    }
  }

  /**
   * Set the datasource paginator length
   * @param count the length
   */
  setDataSourcePaginatorLength(count: number) {
    this.dataSource.paginator.length = count;
  }

  /**
   * Clear dataSource
   */
  clearDataSource() {
    this.dataSource.paginator.firstPage();
    this.dataSource.data = [];
  }

  /**
   *
   */
  private setDataSourceAttributes(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (issue, property) => {
      switch (property) {
        case 'idIssue': return issue.id;
        case 'summary': return issue.summary;
        case 'severity': return issue.severity.name;
        case 'handler': return issue.handler.name;
        case 'priority': return issue.priority.name;
        case 'project': return issue.project.name;

        default: return issue[property];
      }
    };
  }
}
