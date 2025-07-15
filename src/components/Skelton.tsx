import { cn } from '@/lib/Utils';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'Skelton animate-pulse rounded-md bg-muted',
        className
      )}
    />
  );
}
