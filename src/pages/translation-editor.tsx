"use client";

import { TranslationContent } from "@/components/pages/translation-editor/translation-content";
import { TranslationHeader } from "@/components/pages/translation-editor/translation-header";
import { LanguageHeader } from "@/components/pages/translation-editor/translation-lang-header";
import { TreeNodeComponent } from "@/components/pages/translation-editor/translation-tree-node";
import { TranslationEditorService } from "@/services/translation-editor-service";
import { useFileUploadStore } from "@/store/file/file-upload.store";
import { useTranslationStore } from "@/store/translation/translation.store";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export const TranslationEditor = () => {
  const { processedFiles } = useFileUploadStore();
  const { selectedNode, setSelectedNode } = useTranslationStore();
  const { processObject } = TranslationEditorService;
  const baseContent = processedFiles[0].content as unknown as Record<
    string,
    string
  >;

  return (
    <div className="h-screen flex flex-col">
      <TranslationHeader
        fileName={processedFiles.map((i) => i.name).join(", ")}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[300px] border-r border-gray-800 flex flex-col">
          <div className="p-2 border-b border-gray-800 font-medium shrink-0">
            Translation IDs
          </div>
          <ScrollArea className="overflow-auto">
            <div className="h-full">
              <TreeNodeComponent
                content={processObject(baseContent, processedFiles)}
                onSelectTranslation={(node) => setSelectedNode(node)}
              />
            </div>
          </ScrollArea>
        </div>
        <div className="flex-1 flex flex-col">
          <LanguageHeader />
          <ScrollArea className="flex-1 overflow-auto">
            <div className="p-4">
              <TranslationContent content={selectedNode} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

