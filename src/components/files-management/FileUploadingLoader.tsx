'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { selectStatusUploading } from '@/lib/store/features/files/state/filesSlice';
import { CloudUpload } from 'lucide-react';

export default function FileUploadingLoader() {
  const filesUploading = useAppSelector(selectStatusUploading);

  if (filesUploading)
    return (
      <div className="px-2 flex items-center gap-2 animate-pulse">
        <CloudUpload className="w-[30px] text-gray-500 " />
        <p className="text-gray-500">Subiendo archivos...</p>
      </div>
    );

  return null;
}
