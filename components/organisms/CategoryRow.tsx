'use client';

import { useRef } from 'react';
import { CategoryHeader } from '@/components/molecules/CategoryHeader';
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

type CategoryRowProps = {
  categoryId: string;
  categoryName?: string | null;
  videos?: Video[] | null;
  loading?: boolean;
};

export const CategoryRow: React.FC<CategoryRowProps> = ({
  categoryId,
  categoryName,
  videos,
  loading = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 540;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="mb-8">
      <CategoryHeader categoryId={categoryId} categoryName={categoryName} />
      <div className="relative group/row">
        {/* Left scroll button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-8 z-10 w-10 bg-gradient-to-r from-background/80 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <MovieCardSkeleton key={i} variant="horizontal" />
              ))
            : videos?.map((video) => (
                <MovieCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  thumbnailUrl={video.landscapeThumbnail}
                  duration={video.duration}
                  variant="horizontal"
                />
              ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-8 z-10 w-10 bg-gradient-to-l from-background/80 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </section>
  );
};
