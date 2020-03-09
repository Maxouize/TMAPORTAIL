import { Component, OnInit } from '@angular/core';
import { MantisService } from 'src/app/service/mantis.service';
import * as _ from 'lodash';
import { NestedTreeControl, FlatTreeControl } from '@angular/cdk/tree';
import { ArrayDataSource } from '@angular/cdk/collections';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf } from 'rxjs';
import { TreeNode, FileNode } from 'src/app/model/TreeNode';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-dev-view',
  templateUrl: './dev-view.component.html',
  styleUrls: ['./dev-view.component.scss'],
  animations: [
    trigger('simpleFade', [
      transition('*=>1', [
        style({ opacity: 0}),
        animate(550)
      ])])]
})
export class DevViewComponent implements OnInit {

  public nodeTreeIssue: FileNode[];
  public nodeTreeIssuePriority: FileNode[];

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<TreeNode>;
  treeControlPriority: FlatTreeControl<TreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, TreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, TreeNode>;
  dataSourcePriority: MatTreeFlatDataSource<FileNode, TreeNode>;

  constructor(private mantisService: MantisService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl<TreeNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.treeControlPriority = new FlatTreeControl<TreeNode>(this.getLevel, this.isExpandable);
    this.dataSourcePriority = new MatTreeFlatDataSource(this.treeControlPriority, this.treeFlattener);
    this.nodeTreeIssue = [];
    this.nodeTreeIssuePriority = [];
  }

  ngOnInit() {
    this.mantisService.getAllIssue().subscribe(data => {
      const objectIssues = data as any;
      const groupByUser = _.groupBy(_.filter(objectIssues.issues, ['resolution.name', 'open']), 'handler.real_name');
      Object.keys(groupByUser).forEach((key, index) => {
        this.nodeTreeIssue.push({name: key, type: 'person', children: []});
        let libNode: string;
        let linkIssue: string;
        groupByUser[key].forEach(issue => {
          libNode = issue.id + '. ' + issue.severity.name + ' | ' + issue.summary;
          linkIssue = 'https://epsi-tma.mantishub.io/view.php?id='.concat(issue.id);
          this.nodeTreeIssue[index].children.push({name: libNode, link: linkIssue, type: null});
        });
      });

      const priorityIssue = _.groupBy(_.orderBy(_.filter(objectIssues.issues, ['resolution.name', 'open']), issue => {
        return [ issue.priority.id ];
      }, ['desc']), 'priority.name');
      Object.keys(priorityIssue).forEach((key, index) => {
        const type = key === 'immediate' ? 'warning' : '';
        this.nodeTreeIssuePriority.push({name: key, type, children: []});
        let libNode: string;
        let linkIssue: string;
        priorityIssue[key].forEach(issue => {
          libNode = issue.id + '. ' + issue.severity.name + ' | ' + issue.summary;
          linkIssue = 'https://epsi-tma.mantishub.io/view.php?id='.concat(issue.id);
          this.nodeTreeIssuePriority[index].children.push({name: libNode, link: linkIssue, type: null});
        });
      });
      this.dataSource.data = this.nodeTreeIssue;
      this.dataSourcePriority.data = this.nodeTreeIssuePriority;
      console.log(this.dataSource.data);
      console.log(this.dataSourcePriority.data);
    });
  }

  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number) {
    return {
      name: node.name,
      type: node.type,
      level: level,
      expandable: !!node.children
    };
  }

 /** Get the level of the node */
  getLevel(node: TreeNode) {
    return node.level;
  }

  /** Return whether the node is expanded or not. */
  isExpandable(node: TreeNode) {
    return node.expandable;
  };

  /** Get the children for the node. */
  getChildren(node: FileNode) {
    return observableOf(node.children);
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: TreeNode){
    return node.expandable;
  }

}
