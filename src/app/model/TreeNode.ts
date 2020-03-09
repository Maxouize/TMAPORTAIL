/** File node data with nested structure. */
export interface FileNode {
    name: string;
    type: string;
    link?: string;
    children?: FileNode[];
  }

/** Flat node with expandable and level information */
export interface TreeNode {
    name: string;
    type: string;
    level: number;
    expandable: boolean;
}
