'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { selectStatusUploading } from '@/lib/store/features/files/state/filesSlice';
import { CloudUpload, Trash2 } from 'lucide-react';

export default function FileUploadingLoader() {
  const { status, text, type } = useAppSelector(selectStatusUploading);

  if (status)
    return (
      <div className="px-2 flex items-center gap-2 animate-pulse">
        {type === 'UPLOAD' && <CloudUpload className="w-[30px] text-gray-500 " />}
        {type === 'REMOVE' && <Trash2 className="w-[30px] text-red-500 " />}
        <p className={`${type === 'REMOVE' ? 'text-red-500' : 'text-gray-500'}`}>{text}</p>
      </div>
    );

  return null;
}
