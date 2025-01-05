import React from "react";
import { PROJECT_CONFIGS } from "@/shared/configs/config";
import { MyDialog } from "@/components/ui/custom-dialog";
import { FileUpload } from "@/components/pages/create-project/create-project-file-upload";
import { LanguageDisplay } from "@/components/pages/create-project/create-project-language-list";
import { LanguageSelectDialog } from "@/components/pages/create-project/create-project-language-select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/shared/hooks/use-toast";
import { useFileUploadStore } from "@/store/file/file-upload.store";
import { Separator } from "@radix-ui/react-separator";
import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "@/store/language/language.store.ts";

interface CreateProjectProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  projectType: string;
}

export const CreateProject: React.FC<CreateProjectProps> = ({
  isOpen,
  setIsOpen,
  projectType,
}) => {
  const { toast } = useToast();
  const { selectedFiles, processFiles } = useFileUploadStore();
  const { isLanguageOpen, setIsLanguageOpen } = useLanguageStore();
  const navigate = useNavigate();

  const CONFIG =
    PROJECT_CONFIGS[projectType] || PROJECT_CONFIGS["Generic JSON"];

  return (
    <MyDialog
      title={CONFIG.title}
      description={CONFIG.description}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="space-y-4">
        <FileUpload
          maxSize={CONFIG.maxSize}
          acceptedTypes={CONFIG.acceptedTypes}
          onUpload={(files) =>
            useFileUploadStore.getState().setSelectedFiles(files)
          }
        />

        <div className="flex justify-between items-center">
          <Button onClick={() => setIsLanguageOpen(true)} variant="outline">
            Add Language
          </Button>
          <Button
            onClick={async () => {
              try {
                await processFiles();
                navigate("/translation-editor");

                toast({
                  type: "background",
                  variant: "default",
                  description: `Project created successfully`,
                });
              } catch (error) {
                toast({
                  type: "background",
                  variant: "destructive",
                  description: `Failed to create project: ${error}`,
                });
              }
            }}
            variant="default"
            disabled={selectedFiles.length === 0}
          >
            Create {projectType} Project
          </Button>
        </div>

        <Separator className="my-4" />
        <LanguageDisplay />
        <LanguageSelectDialog
          isOpen={isLanguageOpen}
          onClose={() => setIsLanguageOpen(false)}
        />
      </div>
    </MyDialog>
  );
};

export default CreateProject;
