'use client';

import { useState, useRef } from 'react';
import { Button, Card, CardContent } from '@mui/material';
import { Upload, RefreshCw } from 'lucide-react';
import { isValidImageFile, convertFileToDataURL } from '@/lib/utils/image';

interface ImageUploadProps {
  onImageUpload: (imageData: string) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (file && isValidImageFile(file)) {
      try {
        const result = await convertFileToDataURL(file);
        setPreview(result);
        onImageUpload(result);
      } catch {
        alert('Failed to read the image file');
      }
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
      />

      {preview ? (
        <div className="space-y-6" data-testid="upload-success">
          <div
            className="text-center text-green-600 dark:text-green-400 font-source-sans-pro text-lg font-medium"
            role="status"
            aria-live="polite"
          >
            ✓ Image uploaded successfully
          </div>
          <Button
            variant="outlined"
            onClick={handleButtonClick}
            className="w-full font-source-sans-pro"
            startIcon={<RefreshCw className="h-4 w-4" />}
            size="large"
            data-testid="upload-different-button"
            aria-label="Upload a different image file"
          >
            Upload Different Image
          </Button>
        </div>
      ) : (
        <Card
          className={`border-2 border-dashed transition-colors shadow-sm ${
            isDragOver
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600'
          }`}
          data-testid="upload-area"
        >
          <CardContent
            className="p-12 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleButtonClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleButtonClick();
              }
            }}
            aria-label="Upload ingredient photo by clicking or dragging and dropping"
          >
            <div className="flex flex-col items-center">
              <Upload className="w-16 h-16 text-gray-400 mb-6" aria-hidden="true" />
              <p className="text-xl font-semibold mb-3 font-playfair" id="upload-instructions">
                UPLOAD INGREDIENT PHOTO
              </p>
              <p className="text-base text-gray-500 dark:text-gray-400 mb-6 font-source-sans-pro">
                Drag and drop or click to select
              </p>
              <Button
                color="primary"
                variant="outlined"
                className="font-source-sans-pro"
                startIcon={<Upload className="h-4 w-4" />}
                size="large"
                data-testid="choose-file-button"
                tabIndex={-1}
                aria-hidden="true"
              >
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
