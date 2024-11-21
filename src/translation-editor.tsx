import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLocation } from "react-router-dom";
import { TranslationHeader } from "@/components/pages/translation-editor/translation-header";
import { LanguageHeader } from "@/components/pages/translation-editor/translation-language-header";
import { TreeNodeComponent } from "@/components/pages/translation-editor/translation-tree-node";
import useTranslationStore from "@/store/translation-store";

interface TranslationFile {
  name: string;
  content: Record<string, any>;
}

export const TranslationEditor = () => {
  const location = useLocation();
  const files = (location.state?.files || []) as TranslationFile[];
  const [translations, setTranslations] = useState<Record<string, string>>({});

  const {
    treeData,
    expandedNodes,
    selectedTranslation,
    handleNodeClick,
    moveNode,
    setJsonContent,
  } = useTranslationStore();

  useEffect(() => {
    if (files[0]?.content) {
      setJsonContent(files[0].content);
    }
  }, [files]);

  const getJsonContent = (file: TranslationFile): string => {
    if (!selectedTranslation) return "";

    try {
      const keys = selectedTranslation.split(".");
      let content = file.content;

      for (const key of keys) {
        if (content[key] === undefined) return "";
        content = content[key];
      }

      return typeof content === "string" ? content : "";
    } catch (error) {
      return "";
    }
  };

  useEffect(() => {
    if (!selectedTranslation) return;

    const newTranslations = files.reduce((acc, file) => {
      acc[file.name] = getJsonContent(file);
      return acc;
    }, {} as Record<string, string>);

    setTranslations(newTranslations);
  }, [selectedTranslation, files]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-black text-white">
        <TranslationHeader fileName={files[0]?.name} />
        <div className="flex">
          <div className="w-[300px] border-r border-gray-800">
            <div className="p-4 border-b border-gray-800 font-medium">
              Translation IDs
            </div>
            <div className="overflow-auto">
              {treeData.map((node) => (
                <TreeNodeComponent
                  key={node.label}
                  node={node}
                  path={node.label}
                  level={0}
                  isExpanded={expandedNodes.has(node.label)}
                  isSelected={selectedTranslation === node.label}
                  onNodeClick={handleNodeClick}
                  onMove={moveNode}
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <LanguageHeader />
            <section className="p-4">
              {selectedTranslation ? (
                <div className="space-y-4">
                  <div className="text-sm text-gray-300 mb-4">
                    Selected: {selectedTranslation}
                  </div>
                  {files.map((file) => (
                    <div key={file.name} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-200">
                        {file.name}
                      </label>
                      <textarea
                        value={translations[file.name] || ""}
                        onChange={(e) => {
                          setTranslations((prev) => ({
                            ...prev,
                            [file.name]: e.target.value,
                          }));
                        }}
                        className="w-full h-24 bg-gray-900 border border-gray-700 
                                 rounded-md p-2 text-sm focus:ring-2 
                                 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter translation..."
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center mt-8">
                  Select a translation key to edit
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default TranslationEditor;
