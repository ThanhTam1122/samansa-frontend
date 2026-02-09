type SkeletonProps = {
  className?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-white/10 rounded ${className}`}
      aria-hidden="true"
    />
  );
};
