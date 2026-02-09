import { MovieCard } from '@/components/molecules/MovieCard';
import { MovieCardSkeleton } from '@/components/molecules/MovieCardSkeleton';

type Video = {
  id: string;
  title?: string | null;
  landscapeThumbnail?: string | null;
  duration: {
    minutes?: number | null;
    seconds?: number | null;
  };
};

type MovieGridProps = {
  videos?: Video[] | null;
  loading?: boolean;
  skeletonCount?: number;
};

export const MovieGrid: React.FC<MovieGridProps> = ({
  videos,
  loading = false,
  skeletonCount = 8,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <MovieCardSkeleton key={i} variant="grid" />
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted">No videos found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <MovieCard
          key={video.id}
          id={video.id}
          title={video.title}
          thumbnailUrl={video.landscapeThumbnail}
          duration={video.duration}
          variant="grid"
        />
      ))}
    </div>
  );
};
