import React, { useState } from "react";
import { FiUpload, FiFile, FiX } from "react-icons/fi";
import { useFileUploadStore } from "@/store/file/file-upload.store";
import { validateJSON } from "@/shared/utils/client-helper";
import { toast } from "@/shared/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  maxSize: number;
  acceptedTypes: string[];
  onUpload: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const { selectedFiles, setSelectedFiles } = useFileUploadStore();

  const handleFiles = async (files: FileList): Promise<void> => {
    const fileArray = Array.from(files);

    const validationResults = await Promise.all(
      fileArray.map(async (file) => {
        const isValid = await validateJSON(file);
        if (!isValid) {
          toast({
            title: "Invalid file format",
            description: `The file "${file.name}" is not valid JSON.`,
            variant: "destructive",
          });
          return null;
        }
        return file;
      })
    );

    const validFiles = validationResults.filter(Boolean) as File[];

    setSelectedFiles([...selectedFiles, ...validFiles]);
    onUpload([...selectedFiles, ...validFiles]);
  };

  const handleFileRemove = (index: number): void => {
    onUpload(selectedFiles.filter((_: File, i: number) => i !== index));
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div
        className="rounded-lg shadow-sm"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div
          className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
            dragActive ? " bg-blue-50" : "border-gray-300"
          }text-white `}
        >
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            multiple
          />

          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <FiUpload className="w-12 h-12 mb-3 text-gray-400" />
            <p className="text-sm text-gray-600 text-center">
              Drag and drop your JSON files here
              <br />
              <span className="text-gray-500">or click to browse</span>
            </p>
          </label>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file: File, index: number) => (
            <Button
              variant="secondary"
              key={index}
              className="flex w-full items-center justify-between p-2 rounded-lg"
            >
              <div className="flex items-center text-gray-300">
                <FiFile className="w-4 h-4 mr-2" />
                <span className="text-sm">{file.name}</span>
              </div>
              <span
                onClick={() => handleFileRemove(index)}
                className="text-gray-400 hover:text-gray-200"
              >
                <FiX className="w-4 h-4" />
              </span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
