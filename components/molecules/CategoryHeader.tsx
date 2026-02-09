import Link from 'next/link';

type CategoryHeaderProps = {
  categoryId: string;
  categoryName?: string | null;
  showLink?: boolean;
};

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categoryId,
  categoryName,
  showLink = true,
}) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-bold text-foreground">
        {categoryName ?? 'Category'}
      </h2>
      {showLink && (
        <Link
          href={`/category/${categoryId}`}
          className="text-sm text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
        >
          See All
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
        </Link>
      )}
    </div>
  );
};
