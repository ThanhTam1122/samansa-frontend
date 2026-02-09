'use client';

import { useQuery } from '@apollo/client';
import { GetHomeScreensDocument } from '@/lib/graphql/generated/graphql';
import { CategoryRow } from '@/components/organisms/CategoryRow';
import { Skeleton } from '@/components/atoms/Skeleton';

export const HomeTemplate: React.FC = () => {
  const { data, loading } = useQuery(GetHomeScreensDocument);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="mb-8">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="flex gap-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="w-[260px] flex-shrink-0">
                  <Skeleton className="aspect-video rounded-lg" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const homeScreens = data?.homeScreens ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Discover Movies
        </h1>
        <p className="text-muted text-base">
          Explore short films from around the world
        </p>
      </div>

      {/* Category Rows */}
      {homeScreens.map((screen) => (
        <CategoryRow
          key={screen.id}
          categoryId={screen.category?.id ?? screen.id}
          categoryName={screen.category?.name}
          videos={screen.videos}
        />
      ))}
    </div>
  );
};
