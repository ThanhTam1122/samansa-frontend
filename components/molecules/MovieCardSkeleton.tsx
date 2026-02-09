import { Skeleton } from '@/components/atoms/Skeleton';

type MovieCardSkeletonProps = {
  variant?: 'horizontal' | 'grid';
};

export const MovieCardSkeleton: React.FC<MovieCardSkeletonProps> = ({
  variant = 'horizontal',
}) => {
  const widthClass = variant === 'horizontal' ? 'w-[260px] flex-shrink-0' : 'w-full';

  return (
    <div className={widthClass}>
      <Skeleton className="aspect-video rounded-lg" />
      <Skeleton className="mt-2 h-4 w-3/4 rounded" />
    </div>
  );
};
