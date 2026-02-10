'use client';

import React, { forwardRef } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
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

type VirtualizedMovieGridProps = {
  videos?: Video[] | null;
  loading?: boolean;
  skeletonCount?: number;
};

const gridClassName =
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';

const ListContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...props} className={gridClassName}>
    {children}
  </div>
));
ListContainer.displayName = 'ListContainer';

const ItemContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div {...props}>
    {children}
  </div>
);

export const VirtualizedMovieGrid: React.FC<VirtualizedMovieGridProps> = ({
  videos,
  loading = false,
  skeletonCount = 8,
}) => {
  if (loading) {
    return (
      <div className={gridClassName}>
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
    <VirtuosoGrid
      useWindowScroll
      totalCount={videos.length}
      overscan={200}
      components={{
        List: ListContainer,
        Item: ItemContainer,
      }}
      itemContent={(index) => {
        const video = videos[index];
        return (
          <MovieCard
            id={video.id}
            title={video.title}
            thumbnailUrl={video.landscapeThumbnail}
            duration={video.duration}
            variant="grid"
          />
        );
      }}
    />
  );
};
