import { cn } from '@/lib/utils';

interface LoadingStateProps {
  columns: number;
  className?: string;
}

export function LoadingState({ columns, className }: LoadingStateProps) {
  return (
    <div className={cn('grid gap-4 sm:gap-6 lg:gap-8', className)}>
      {Array.from({ length: columns }).map((_, index) => (
        <div
          key={index}
          className="h-[200px] md:h-[300px] rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent shimmer" />
        </div>
      ))}
    </div>
  );
}
