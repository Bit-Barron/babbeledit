import React from "react";
import { Button } from "@/components/ui/button";
import { FaSave, FaFolderOpen } from "react-icons/fa";
import { TranslationEditorService } from "@/services/translation-editor-service";
import { useNodeContentStore } from "@/store/node-store";

interface HeaderProps {
  fileName: string;
}

export const TranslationHeader: React.FC<HeaderProps> = ({ fileName }) => {
  const { selectedNode } = useNodeContentStore();

  return (
    <header className="flex items-center justify-between border-b border-gray-800 p-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-medium">Translation Editor - {fileName}</h1>
      </div>
      <section className="flex space-x-4">
        <Button
          onClick={() =>
            TranslationEditorService.saveProject(
              [["en", "English"]],
              [{ id: "es", name: "Spanish" }],
              selectedNode
            )
          }
          variant="outline"
        >
          <FaSave className="mr-2 h-4 w-4" />
          Save Project
        </Button>
        <Button variant="outline" className="">
          <FaFolderOpen className="mr-2 h-4 w-4" />
          Open Project
        </Button>
      </section>
    </header>
  );
};
