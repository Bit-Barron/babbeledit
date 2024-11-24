import { IconType } from "react-icons";

export interface TreeNode {
  label: string;
  type: "folder" | "translation";
  children: TreeNode[];
  content?: {
    de?: string;
    en?: string;
  };
}

export interface ProjectOption {
  title: string;
  Icon: IconType;
}

export type NodeType = "folder" | "translation";

export interface TranslationFile {
  name: string;
  content: Record<string, any>;
}

export interface LocationState {
  files: [
    {
      name: string;
    }
  ];
}
