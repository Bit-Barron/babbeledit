
export interface TreeNode {
  label: string;
  type: "folder" | "translation";
  children: TreeNode[];
  content?: Record<string, string>;
}

export interface FileContent {
  name: string;
  content: string;
}

export interface LanguageProps {
  id: string;
  name: string;
}
