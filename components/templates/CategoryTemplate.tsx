'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GetCategoryDocument } from '@/lib/graphql/generated/graphql';
import { VirtualizedMovieGrid } from '@/components/organisms/VirtualizedMovieGrid';
import { Skeleton } from '@/components/atoms/Skeleton';

type CategoryTemplateProps = {
  categoryId: string;
};

export const CategoryTemplate: React.FC<CategoryTemplateProps> = ({
  categoryId,
}) => {
  const { data, loading } = useQuery(GetCategoryDocument, {
    variables: { id: categoryId },
  });

  const category = data?.category;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
        {loading ? (
          <Skeleton className="h-4 w-24" />
        ) : (
          <span className="text-foreground">{category?.name ?? 'Category'}</span>
        )}
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        {loading ? (
          <Skeleton className="h-9 w-60" />
        ) : (
          <h1 className="text-3xl font-bold text-foreground">
            {category?.name ?? 'Category'}
          </h1>
        )}
        {!loading && category?.videos && (
          <p className="text-muted text-sm mt-2">
            {category.videos.length} videos
          </p>
        )}
      </div>

      {/* Movie Grid */}
      <VirtualizedMovieGrid videos={category?.videos} loading={loading} />
    </div>
  );
};
